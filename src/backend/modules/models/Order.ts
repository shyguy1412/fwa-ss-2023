import { sequelize } from "../sequalize";
import { CreationOptional, DataTypes, HasMany, InferAttributes, InferCreationAttributes, Model } from "sequelize";


export class Order extends Model<InferAttributes<Order>,InferCreationAttributes<Order>>{
    declare id:CreationOptional<number>;
    declare shipping_method:string;
    declare payment_method:string;
    declare user_id:number;
    declare order_date:CreationOptional<string>;

}

if (Order != sequelize.models.Order) {
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shipping_method: {
            type: DataTypes.STRING,
            unique: true
        },
        payment_method: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        order_date: {
            type: DataTypes.DATE
        }
        
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: false
    });
}
