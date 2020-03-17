import chalk from 'chalk';
import { Model, DataTypes } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';

import { database } from 'config/database';

export interface UserInterface {
  nickname: string;
  password: string;
  role: string;
  secret: string;
}

export class User extends Model {
  public id!: number;
  public nickname!: string;
  public password!: string;
  public role!: string;

  hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return compareSync(unencryptedPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: database,
    indexes: [
      {
        unique: true,
        fields: ['nickname'],
      },
    ],
  },
);

if (process.env.DROP_TABLES === 'true') {
  User.sync({ force: true }).then(() =>
    console.log(chalk.green('[DB] User table loaded ') + chalk.white('(w/ DROP TABLES IF EXISTS)')),
  );
} else {
  User.sync({ force: false }).then(() => console.log(chalk.green('[DB] User table loaded')));
}
