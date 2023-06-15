import { sequelize } from "../sequalize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{
    declare id:CreationOptional<number>;
    declare first_name:string;
    declare last_name:string;
    declare password:string;
    declare city:string;
    declare postcode:string;
    declare street:string;
    declare email:string;
    declare phone:string;
}

if (User != sequelize.models.User) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
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
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique:true
        },
        
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    
}
