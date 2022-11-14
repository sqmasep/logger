import chalk from "chalk";

type LogMessage = any[];

const log = (...msg: LogMessage) => console.log(...msg);

log.info = (...msg: LogMessage) =>
  console.info(chalk.blueBright(chalk.bold.bgBlueBright("[i]"), ...msg));

log.error = (...msg: LogMessage) =>
  console.error(chalk.redBright(chalk.bold.bgRedBright("[‼]"), ...msg));

log.success = (...msg: LogMessage) =>
  console.log(chalk.greenBright(chalk.bold.bgGreenBright("[✓]"), ...msg));

log.init = (...msg: LogMessage) =>
  console.log(chalk.bold.cyan(chalk.bgCyanBright("[*]"), chalk.italic(...msg)));

log.red = (...msg: LogMessage) => chalk.red(...msg);
log.green = (...msg: LogMessage) => chalk.green(...msg);
log.bold = (...msg: LogMessage) => chalk.bold(...msg);

export default log;
