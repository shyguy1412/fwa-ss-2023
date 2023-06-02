import { sequelize } from "@/modules/sequalize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Product_Order extends Model<InferAttributes<Product_Order>,InferCreationAttributes<Product_Order>>{
    declare amount:number;
}

if (Product_Order != sequelize.models.Product_Order) {
    Product_Order.init({
        amount: {
            type: DataTypes.INTEGER,
        },
        
    }, {
        sequelize,
        tableName: 'product_orders',
        timestamps: false
    });

}
