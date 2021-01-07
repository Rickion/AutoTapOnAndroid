const { lgInfo } = require('./log');

let count = 0;

/**
 * Emit a function every N seconds
 * @param {Function} method A function to loop
 * @param {Number} sec Loop gap
 */
const loop = (method, sec = 1) => {
  const timeout = sec * 1000;
  setTimeout(() => {
    count += 1;
    lgInfo(`loop method, count ${count}`);
    method();
    loop(method, sec);
  }, timeout);
};

const randomLoop = (method) => {
  const timeout = Math.round(Math.random() * 5 + 3) * 1000;
  setTimeout(() => {
    count += 1;
    lgInfo(`randomLoop method, ${timeout}, count ${count}`);
    method();
    randomLoop(method, timeout);
  }, timeout);
};

module.exports = { loop, randomLoop };
