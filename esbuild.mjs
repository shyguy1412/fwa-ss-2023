import { context } from "esbuild";

const WATCH = process.argv.includes('--watch');

const backendContext = await context({
  entryPoints: ['./src/backend/main.ts'],
  outfile: './dist/server.js',
  minify: !WATCH,
  bundle: true,
  format: 'cjs',
  platform: 'node',
  define: WATCH ? undefined : {
    'process.env.NODE_ENV': "'production'",
  },
  external: ['express'],
  tsconfig: 'src/backend/tsconfig.json',
  logLevel: 'info'
});

await backendContext.rebuild();

if (WATCH) backendContext.watch();
else backendContext.dispose();