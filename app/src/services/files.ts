import { existsSync } from 'fs';
import { isEmpty } from 'lodash';

export const isExists = (file: string): boolean => {
  if (existsSync(file)) {
    return true;
  }
  return false;
};

export const isFullFilled = (array: string[]): boolean => {
  const missingValues = array.filter((v: string): boolean => !process.env[`REACT_APP_${v}`]);
  if (isEmpty(missingValues)) {
    return true;
  }
  return false;
};
