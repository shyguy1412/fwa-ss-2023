import { sequelize } from "../sequalize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{
    declare id:CreationOptional<number>;
    declare name:string;
    declare password:string;
    declare city:string;
    declare postcode:string;
    declare street:string;


}

if (User != sequelize.models.User) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        postcode: {
            type: DataTypes.STRING
        },
        street: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    
}
