import express from '@/modules/express';
import { config as loadConfigFile } from 'dotenv';
import { createSocket } from 'dgram';
import { Order } from './modules/models/Order';
import { Product } from './modules/models/Product';
import { Product_Order } from './modules/models/Product_Order';
import { User } from './modules/models/User';

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
});

Order.belongsTo(User, {foreignKey:"user_id"});
Order.hasMany(Product, {foreignKey:"product_id"});
User.hasMany(Order, {foreignKey:"user_id"});
Product.belongsToMany(Order, {through:Product_Order, foreignKey:"order_id"});

(async function () {
  const order = await Order.findOne({
    where:{
      id:1
    }
  })
  console.log(order);
  
})();
