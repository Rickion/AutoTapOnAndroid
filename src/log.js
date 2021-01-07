/* eslint-disable no-console */
const chalk = require('chalk');

const lg = console.log;

const lgCyan = (...args) => {
  lg(chalk.cyan(...args));
};

const lgYellow = (...args) => {
  lg(chalk.yellow(...args));
};

const lgGreen = (...args) => {
  lg(chalk.green(...args));
};

const lgRed = (...args) => {
  lg(chalk.bgRed(...args));
};

module.exports = {
  lgInfo: lgCyan,
  lgWarn: lgYellow,
  lgSucc: lgGreen,
  lgFail: lgRed,
};
