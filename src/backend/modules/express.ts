import express from 'express';
import ShopAPI from './ShopAPI';
import path from 'path';

export default function () {
  const app = express();
  
  app.use('/', express.static('dist/public'));

  app.use(ShopAPI());
  
  app.use('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  })

  // app.use((req, res) => res.status(404));
  return app;
};
