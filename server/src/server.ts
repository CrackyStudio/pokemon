import chalk from 'chalk';

import app from 'config/app';
import { loadEnvironment } from 'config/environment';
import { handleErrors } from 'config/errorHandler';

console.clear();
console.log(chalk.bgWhite.black('   * * * [ POKEMON SERVER] * * *   \n'));
handleErrors();
loadEnvironment();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is ready: ${chalk.italic.blue(`http://localhost:${PORT}/\n`)}`));
});
