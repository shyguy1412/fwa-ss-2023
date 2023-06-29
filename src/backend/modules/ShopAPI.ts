import { Request, Response, Router, NextFunction } from "express";
import { readdir } from "fs/promises";
import { join } from "path";
import { pathToFileURL, parse } from 'url';

async function getFragmentsFromPath(dir: string) {
  try {
    return (await readdir(dir, { withFileTypes: true }))
      .map(dirent => dirent.name.replace('.js', ''));
  } catch (e) { return []; }
}

async function resolveRequestURLToModulePath(url: string) {
  const basePath = './dist/routes';
  const pathFragments = url.substring(1).split('/');
  const moduleFragments: string[] = [];
  const queryParams: { [key: string]: string; } = {};

  for (const [index, fragment] of pathFragments.entries()) {
    const possibleModuleFragments = await getFragmentsFromPath(join(basePath, moduleFragments.join('/')));

    if (possibleModuleFragments.includes(fragment)) {
      moduleFragments.push(fragment);
      continue;
    }

    const dynamicFragment = possibleModuleFragments.filter(string => /.*\{.*\}.*/.test(string))[0];
    if (dynamicFragment) {
      const paramRegex = new RegExp(dynamicFragment.replace(/{.*?}/, '(.*)'));
      const paramKey = dynamicFragment.replace(/.*{(.*?)}.*/, '$1');
      const param = fragment.replace(paramRegex, '$1');

      if (!param) continue;
      moduleFragments.push(dynamicFragment);
      queryParams[paramKey] = param;
      continue;
    }

    if (index == 0 && !fragment) break;

    return {
      modulePath: null,
      queryParams
    };
  }

  if ((await getFragmentsFromPath(join(basePath, moduleFragments.join('/')))).includes('index'))
    moduleFragments.push('index');

  return {
    modulePath: join(basePath, moduleFragments.join('/') + '.js'),
    queryParams
  };
}

export default function () {

  const api_prefix = /^\/api\/v0/

  return async function (req: Request, res: Response, next: NextFunction) {

    const { modulePath, queryParams } = await resolveRequestURLToModulePath(parse(req.url.replace(api_prefix, '')).pathname ?? '');

    if (!modulePath) return next();

    Object.assign(req.params, queryParams);

    const { default: { default: handler } } = await import(pathToFileURL(modulePath).toString()) as {
      default: { default: (req: Request, res: Response) => void | Promise<void>; },
    };

    handler(req, res);
  };
}