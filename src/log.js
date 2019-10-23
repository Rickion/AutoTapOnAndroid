let chalk = require('chalk')

let lg = console.log;

let lgCyan = (...args) => {
  lg(chalk.cyan(...args));
};

let lgYellow = (...args) => {
  lg(chalk.yellow(...args));
};

let lgGreen = (...args) => {
  lg(chalk.green(...args));
};

let lgRed = (...args) => {
  lg(chalk.bgRed(...args));
};

module.exports = {
  lgInfo: lgCyan,
  lgWarn: lgYellow,
  lgSucc: lgGreen,
  lgFail: lgRed,
}
