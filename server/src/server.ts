import chalk from 'chalk';

import app from 'configurations/app';
import { loadEnvironment } from 'configurations/environment';
import { handleErrors } from 'configurations/errorHandler';

console.clear();
console.log(chalk.bgWhite.black('   * * * [ POKEMON SERVER] * * *   \n'));
handleErrors();
loadEnvironment();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is ready: ${chalk.italic.blue(`http://localhost:${PORT}/\n`)}`));
});
