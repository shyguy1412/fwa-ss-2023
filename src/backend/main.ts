import express from '@/modules/express';
import { config as loadConfigFile } from 'dotenv';
import { createSocket } from 'dgram';

loadConfigFile();

const app = express();
const port = Number.parseInt(process.env.EXPRESS_PORT ?? '') || 3000;

//bind to local UPD socket for ipc
const ipcServer = createSocket("udp4");

// Catching the message event
ipcServer.on("message", function (msg) {

  if (msg.toString('utf-8') == 'exit')
    process.exit();

});

// Binding server with port
ipcServer.bind(port + 1, 'localhost');

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
  ipcServer.send('started', port - 1, 'localhost');
});
// (async function () {
//   const jane = await User.create({
//     name: 'Homer',
//     password: '',
//     postcode: '',
//     city: '',
//     street: ''
//   });

//   const users = await User.findAll();
//   console.log(users);

// })();
