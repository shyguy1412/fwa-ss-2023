import {Sequelize} from 'sequelize'
export const sequelize = new Sequelize('fwa_ss23', 'myuser', 'mypassword', {
    host: 'localhost',
    dialect: 'mysql'
});