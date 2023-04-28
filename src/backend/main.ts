import express from '@/modules/express';
import { config as loadConfigFile } from 'dotenv';

loadConfigFile();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});
