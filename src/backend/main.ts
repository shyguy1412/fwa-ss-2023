import express from '@/modules/express';
import { config as loadConfigFile } from 'dotenv';
import { createSocket } from 'dgram';

loadConfigFile();

const app = express();
const port = Number.parseInt(process.env.EXPRESS_PORT ?? '') || 3000;

//bind to local UPD socket for ipc
const ipcSocket = createSocket("udp4");

// Catching the message event
ipcSocket.on("message", function (msg) {

  if (msg.toString('utf-8') == 'exit')
    process.exit();

});

// Binding server with port
ipcSocket.bind(port + 1, 'localhost');

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
  ipcSocket.send('started', port - 1, 'localhost');
  console.log('Sent started message over IPC socket');
  
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
