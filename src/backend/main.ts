import express from '@/modules/express';
import { config as loadConfigFile } from 'dotenv';
import { User } from '@/modules/models/User';

loadConfigFile();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});

(async function (){ 
const jane = await User.create({
  name: 'Homer',
  password: '',
  postcode: '',
  city: '',
  street: ''
});

const users = await User.findAll();
console.log(users);

})();
