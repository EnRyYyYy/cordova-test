const chalk = require('chalk')

const fmtHookLimiter = chalk.bgBlue.white;
const fmtTaskStarted = (fnName) => (`Running task ${chalk.yellow(fnName)}...`);
const fmtTaskCompleted = (fnName) => (`Task ${chalk.yellow(fnName)} ${chalk.green("COMPLETED SUCCESSFULLY")}.\n`);
const fmtTaskFailed = (fnName) => (`Task ${chalk.yellow(fnName)} ${chalk.red("FAILED")}.\n`);

module.exports = {
    fmtHookLimiter,
    fmtTaskStarted,
    fmtTaskCompleted,
    fmtTaskFailed
}