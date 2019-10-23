const { argv: { loop, sec: loopTime } } = require('yargs');
const { file, touchEvent: event } = require('./src/config');
const { pushReplayFile, replay } = require('./src/adb-cmd');
const { getLocalData, writeToLocal } = require('./src/manage-data');
const loopMethod = require('./src/do-loop');
const { lgSucc } = require('./src/log');

const Precision = 1000000;
const Speed = 1;

getLocalData(file.record).then(data => {
  let lines = data.split('\n');
  let time = '';
  let result = lines.map(line => {
    if (!line || !line.startsWith('[')) {
      return '';
    }

    let items = line.split(' ');
    let currentTime = items[2].replace(']', '');
    let lack = '';

    if (currentTime !== time) {
      time && (lack = (Number(currentTime)*Precision - Number(time)*Precision)%Speed/Precision);
      time = currentTime;
    }

    items[4] = parseInt(items[4], 16);
    items[5] = parseInt(items[5], 16);
    items[6] = items[6] === 'ffffffff' ? '-1' : parseInt(items[6], 16);

    let newLine = ['sendevent', event, items[4], items[5], items[6]].join(' ');
    if (lack) {
      newLine = [newLine, `sendevent ${event} 0 0 0`,`sleep ${lack};`].join('\n');
    }

    return newLine;
  }).filter(v => v);

  return result.join('\n').concat('\n');
}).then(formattedData => {
  return writeToLocal(file.replay, formattedData);
}).then(_ => {
  lgSucc('Done\n');

  pushReplayFile();
  replay();

  loop && loopMethod(replay, loopTime);
});
