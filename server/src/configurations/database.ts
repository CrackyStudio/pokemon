import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE, DB_USER, DB_PASS, DB_LOGGING } = process.env;

export const database = new Sequelize({
  database: DATABASE,
  username: DB_USER,
  password: DB_PASS,
  dialect: 'postgres',
  logging: DB_LOGGING === 'true' ? true : false,
});
