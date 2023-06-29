import { build, context } from "esbuild";
import { glob } from "glob";
import fs from 'fs';

const WATCH = process.argv.includes('--watch');

// async function buildRoutes() {
//   return build({
//     entryPoints: await glob('src/backend/routes/**/*.ts'),
//     outdir: './dist/api_routes',
//     minify: !WATCH,
//     format: 'cjs',
//     platform: 'node',
//     define: WATCH ? undefined : {
//       'process.env.NODE_ENV': "'production'",
//     },
//     // external: ['sequelize'],
//     tsconfig: 'src/backend/tsconfig.json',
//     logLevel: 'info'
//   });
// }


const serverContext = await context({
  entryPoints: await glob('src/backend/**/*.ts'),
  outdir: './dist',
  minify: !WATCH,
  // bundle: true,
  format: 'cjs',
  platform: 'node',
  define: WATCH ? undefined : {
    'process.env.NODE_ENV': "'production'",
  },
  // external: ['express', 'pg-hstore'],
  tsconfig: 'src/backend/tsconfig.json',
  logLevel: 'info'
});

serverContext.rebuild();
// buildRoutes();

if (WATCH) {
  // const fsWatcher = fs.watch('src/backend', { recursive: true });
  // fsWatcher.addListener('change', async () => {
  //   // buildRoutes();
  // });
  serverContext.watch();
}
else serverContext.dispose();
