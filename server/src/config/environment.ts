import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';
import { existsSync } from 'fs';
import { isEmpty } from 'lodash';

const envPathName = path.join(process.cwd(), '.env');
const neededValues = ['PORT', 'DROP_TABLES', 'JWT_SECRET', 'DATABASE', 'DB_USER', 'DB_PASS', 'DB_LOGGING'];
let missingValues: string[];

export function loadEnvironment(): void {
  if (isExists(envPathName)) {
    dotenv.config();

    if (isFullFilled(neededValues)) {
      console.log(chalk.green(`Environment file loaded successfully`));
    } else {
      console.log(chalk.red.bold(`Sorry some value(s) are missing in your .env file:\n ${missingValues.join(' \n ')}`));
      process.exit(1);
    }
  } else {
    console.log(chalk.red.bold('Sorry an .env file is required'));
    process.exit(1);
  }
}

const isExists = (file: string): boolean => {
  if (existsSync(file)) {
    return true;
  }
  return false;
};

const isFullFilled = (array: string[]): boolean => {
  missingValues = array.filter((v: string): boolean => !process.env[v]);
  if (isEmpty(missingValues)) {
    return true;
  }
  return false;
};
