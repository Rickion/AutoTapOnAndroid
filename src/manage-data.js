let fs = require('fs-extra');
let { lgInfo, lgWarn } = require('./log');

function getLocalData(file) {
  lgInfo(`Reading file: ${ file }`);
  return fs.readFile(file, 'utf8');
}

function writeToLocal(file, data) {
  lgWarn(`Writing file: ${ file }`);
  return fs.writeFile(file, data);
}

function writeToLocalAppend(file, data) {
  lgWarn(`Writing file: ${ file }`);
  return fs.appendFile(file, data);
}

module.exports = {
  getLocalData,
  writeToLocal,
  writeToLocalAppend,
}
