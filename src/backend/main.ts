import express from 'express';
import { config as loadConfigFile } from 'dotenv';
import ShopAPI from './modules/ShopAPI';

loadConfigFile();

const app = express();
const router = express.Router();
const port = process.env.EXPRESS_PORT || 3000;
const api_path = `/${process.env.API_PREFIX || 'api'}/${process.env.API_VERSION || 'v0'}`;

app.use('/', express.static('dist/public'));
app.use(api_path, router);

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});

ShopAPI(router);