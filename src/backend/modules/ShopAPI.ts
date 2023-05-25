import { Request, Response, Router, NextFunction } from "express";
import { readdir } from "fs/promises";
import { glob } from 'glob';
import { join } from "path";
import { pathToFileURL } from 'url';

// type Route = {
//   path: string,
//   handlers: {
//     get: (req: Request, res: Response) => void,
//     post: (req: Request, res: Response) => void,
//     put: (req: Request, res: Response) => void,
//     delete: (req: Request, res: Response) => void,
//   }
// }

// type RouteHandler = keyof Route['handlers'];

async function getFragmentsFromPath(dir: string) {
  try {
    return (await readdir(dir, { withFileTypes: true }))
      .map(dirent => dirent.name.replace('.mjs', ''));
  } catch (e) { return []; }
}

async function resolveRequestURLToModulePath(url: string) {
  const pathFragments = url.substring(1).split('/');
  const moduleFragments: string[] = [];
  const queryParams: { [key: string]: string; } = {};

  for (const [index, fragment] of pathFragments.entries()) {
    const possibleModuleFragments = await getFragmentsFromPath(join('./dist/api_routes', moduleFragments.join('/')));
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
      modulePath: '',
      queryParams
    };
  }

  if ((await getFragmentsFromPath(join('./build/pages', moduleFragments.join('/')))).includes('index'))
    moduleFragments.push('index');

  return {
    modulePath: './build/pages/' + moduleFragments.join('/') + '.mjs',
    queryParams
  };
}


// async function loadRoutes(): Promise<Route[]> {
//   const import_paths = await glob('./dist/api_routes/**/*.js');

//   const routes: Route[] = [];

//   for (const import_path of import_paths.map(path => pathToFileURL(path).toString())) {
//     try {
//       const route = await import(import_path);

//       routes.push({
//         path: import_path.split('dist/api_routes', 2)[1].replace(/\/?(index)?.js/, ''),
//         handlers: {
//           get: route.get ?? methodNotAllowed,
//           put: route.put ?? methodNotAllowed,
//           post: route.post ?? methodNotAllowed,
//           delete: route.delete ?? methodNotAllowed
//         }
//       });
//     } catch (_) { }
//   }

//   return routes;
// }

export default function () {

//   for (const route of await loadRoutes()) {
//     Object.entries(route.handlers).forEach(
//       ([method, handler]) => router[method as RouteHandler](route.path, handler)
//     );
//   }

//   router.all('*', (_req, res) => {
//     res.status(404).json({ status: 404, error: 'no such api route' });
  //})
  return async function (req: Request, res: Response, next: NextFunction) {
    const { modulePath, queryParams } = await resolveRequestURLToModulePath(req.originalUrl);

    if (!modulePath) return next();

    console.log(modulePath);
    req.params = queryParams;
    const {default: handler} = await import(pathToFileURL(modulePath).toString()) as {
      default: (req: Request, res: Response) => void | Promise<void>,
    }
    handler(req, res);
  }
}