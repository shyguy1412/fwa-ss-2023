import { Request, Response, Router } from "express";
import { glob } from 'glob';
import { pathToFileURL } from 'url';

type Route = {
  path: string,
  handlers: {
    get: (req: Request, res: Response) => void,
    post: (req: Request, res: Response) => void,
    put: (req: Request, res: Response) => void,
    delete: (req: Request, res: Response) => void,
  }
}

type RouteHandler = keyof Route['handlers'];

function methodNotAllowed(req: Request, res: Response) {
  res.status(405).json({
    status: 405,
    error: `${req.method} is not allowed for this route`
  })
}

async function loadRoutes(): Promise<Route[]> {
  const import_paths = await glob('./dist/api_routes/**/*.js');

  const routes: Route[] = [];

  for (const import_path of import_paths.map(path => pathToFileURL(path).toString())) {
    try {
      const route = await import(import_path);

      routes.push({
        path: import_path.split('dist/api_routes', 2)[1].replace(/\/?(index)?.js/, ''),
        handlers: {
          get: route.get ?? methodNotAllowed,
          put: route.put ?? methodNotAllowed,
          post: route.post ?? methodNotAllowed,
          delete: route.delete ?? methodNotAllowed
        }
      });
    } catch (_) { }
  }

  console.log(routes);

  return routes;
}

export default async function (router: Router) {

  for (const route of await loadRoutes()) {
    Object.entries(route.handlers).forEach(
      ([method, handler]) => router[method as RouteHandler](route.path, handler)
    );
  }

  router.all('*', (_req, res) => {
    res.status(404).json({ status: 404, error: 'no such api route' });
  })
}