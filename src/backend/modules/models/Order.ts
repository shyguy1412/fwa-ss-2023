import { sequelize } from "../sequalize";
import { CreationOptional, DataTypes, HasMany, InferAttributes, InferCreationAttributes, Model } from "sequelize";


export class Order extends Model<InferAttributes<Order>,InferCreationAttributes<Order>>{
    declare id:CreationOptional<number>;
    declare shipping_method:string;
    declare payment_method:string;
    


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
        
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: false
    });
}
