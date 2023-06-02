import { sequelize } from "@/modules/sequalize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";


export class Product extends Model<InferAttributes<Product>,InferCreationAttributes<Product>>{
    declare id:CreationOptional<number>;
    declare product_slug:string;
    declare product_name:string;
    declare price:number;
    declare image_url:string;
    declare description:string;


}

if (Product != sequelize.models.Product) {
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_slug: {
            type: DataTypes.STRING,
            unique: true
        },
        product_name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
        image_url: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        
    }, {
        sequelize,
        tableName: 'products',
        timestamps: false
    });
}
