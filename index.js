const { argv: { loop, sec: loopTime } } = require('yargs');
const { file, touchEvent: event } = require('./src/config');
const { pushReplayFile, replay } = require('./src/adb-cmd');
const { getLocalData, writeToLocal } = require('./src/manage-data');
const loopMethod = require('./src/do-loop');
const { lgSucc, lgInfo } = require('./src/log');
const { parseInt16 }  = require('./src/util');
const Precision = 1000000;
const Speed = 1;

lgInfo(`http://adbcommand.com/articles/adb shell：getevent and sendevent/`)
lgInfo(`Use the -l option to display textual labels for all event codes.`)
lgInfo(`adb shell -- getevent -lt`)

getLocalData(file.record).then(data => {
  let lines = data.split('\n');
  let time = '';
  let result = lines.map((line, lineIndex) => {
    if (!line || !line.startsWith('[')) {
      return '';
    }

    let items = line.split(' ').filter(i => i);
    let [_, currentTime, eventIndex, x, y, endNum] = items;
    currentTime = currentTime.replace(']', '');
    eventIndex = eventIndex.replace(':', '');
    x = parseInt16(x);
    y = parseInt16(y);
    endNum = parseInt16(endNum);
    
    let lack = '';

    if (currentTime !== time) {
      time && (lack = (Number(currentTime)*Precision - Number(time)*Precision)/Speed/Precision);
      time = currentTime;
    }

    let newLine = ['sendevent', eventIndex, x, y, endNum].join(' ');
    if (lack && lines[lineIndex - 4].endsWith('ffffffff')) {
      newLine = [`sleep ${lack};`, newLine].join('\n');
    }

    return newLine;
  }).filter(v => v);

  return result.join('\n');
}).then(formattedData => {
  return writeToLocal(file.replay, formattedData);
}).then(_ => {
  lgSucc('Done\n');

  pushReplayFile();
  replay();

  loop && loopMethod(replay, loopTime);
});
