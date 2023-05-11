import express from 'express';
import ShopAPI from '@/modules/ShopAPI';
import path from 'path';

export default function () {
  const app = express();
  const router = express.Router();
  const api_path = `/${process.env.API_PREFIX || 'api'}/${process.env.API_VERSION || 'v0'}`;

  app.use(api_path, router);
  
  app.use('/', express.static('dist/public'));
  app.use('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  })

  ShopAPI(router);

  return app;
};
