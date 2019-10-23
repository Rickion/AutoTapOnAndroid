let { lgInfo } = require('./log');

let count = 0;

/**
 * Emit a function every N seconds
 * @param {Function} method A function to loop
 * @param {Number} sec Loop gap
 */
let loop = (method, sec = 1) => {
  let timeout = sec * 1000;
  setTimeout(_ => {
    lgInfo(`loop method, count ${++count}`);
    method();
    loop(method, sec);
  }, timeout);
}

let randomLoop = (method) => {
  let timeout = Math.round(Math.random() * 5 + 3) * 1000;
  setTimeout(_ => {
    lgInfo(`randomLoop method, ${timeout}, count ${++count}`);
    method();
    randomLoop(method, timeout);
  }, timeout);
}

module.exports = randomLoop;
