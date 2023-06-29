import { sequelize } from "../sequalize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Order } from "./Order";
import { Product } from "./Product";

export class Product_Order extends Model<InferAttributes<Product_Order>, InferCreationAttributes<Product_Order>>{
  declare amount: number;
  declare order_id: number;
  declare product_id: number;
}

if (Product_Order != sequelize.models.Product_Order) {
  Product_Order.init({
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    tableName: 'product_orders',
    timestamps: false
  });

}
