const { argv: { loop, sec: loopTime } } = require('yargs');
const { file } = require('./src/config');
const { pushReplayFile, replay } = require('./src/adb-cmd');
const { getLocalData, writeToLocal } = require('./src/manage-data');
const loopMethod = require('./src/do-loop').loop;
const { lgSucc } = require('./src/log');
const { parseInt16 } = require('./src/util');

const Precision = 1000000;
const Speed = 1;

getLocalData(file.record).then((data) => {
  const lines = data.split('\n');
  let time = '';
  const result = lines.map((line, lineIndex) => {
    if (!line || !line.startsWith('[')) {
      return '';
    }

    const items = line.split(' ').filter((i) => i);
    let [, currentTime, eventIndex, x, y, endNum] = items;
    currentTime = currentTime.replace(']', '');
    eventIndex = eventIndex.replace(':', '');
    x = parseInt16(x);
    y = parseInt16(y);
    endNum = parseInt16(endNum);

    let lack = '';

    if (currentTime !== time) {
      if (time) {
        lack = (Number(currentTime) * Precision - Number(time) * Precision) / Speed / Precision;
      }
      time = currentTime;
    }

    let newLine = ['sendevent', eventIndex, x, y, endNum].join(' ');
    if (lack && lines[lineIndex - 4].endsWith('ffffffff')) {
      newLine = [`sleep ${lack};`, newLine].join('\n');
    }

    return newLine;
  }).filter((v) => v);

  return result.join('\n');
}).then((formattedData) => writeToLocal(file.replay, formattedData)).then(() => {
  lgSucc('Done\n');

  pushReplayFile();
  replay();

  if (loop) {
    loopMethod(replay, loopTime);
  }
});
