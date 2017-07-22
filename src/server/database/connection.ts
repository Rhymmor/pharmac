import * as Sequelize from 'sequelize';

const storage = process.env['DATABASE'] || 'pharmac-database.sqlite';

export const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false,

    storage
});
