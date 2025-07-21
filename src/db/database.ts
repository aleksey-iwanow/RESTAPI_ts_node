import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { User } from '../models/user.model';

export default class Database {
  private sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../../database.sqlite'),
      models: [User],
      logging: console.log
    });
  }

   async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
