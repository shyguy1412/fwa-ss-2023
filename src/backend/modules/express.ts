import express from 'express';
import ShopAPI from './ShopAPI';
import path from 'path';
import bodyParser from 'body-parser';
import { parse } from 'url';

export default function () {
  const app = express();

  app.use((req, res, next) => {
    const allow = req.hostname == 'localhost';
    if (allow) res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use('/', express.static('dist/public'));
  app.use(bodyParser.json());
  app.use(ShopAPI());

  app.use('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  })

  // app.use((req, res) => res.status(404));
  return app;
};
