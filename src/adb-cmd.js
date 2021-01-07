const { execFileSync, spawn } = require('child_process');
const { lgInfo, lgWarn, lgSucc, lgFail } = require('./log');
const { file } = require('./config');
const { writeToLocal, writeToLocalAppend } = require('./manage-data');

let record = () => {
  try {
    lgWarn(`Recording...`);

    const process = spawn('adb', [
      'exec-out',
      'getevent',
      '-t',
    ]);
    lgSucc('Ctrl + C to EXIT');
    
    writeToLocal(file.record, '');
    process.stdout.on('data', chunk => {
      writeToLocalAppend(file.record, chunk);
    })
    process.stderr.on('data', (e) => {
      lgFail(e);
    });
    
  } catch (e) {
    lgFail(`Record failed.\n ${e}`);
  }
}

let replay = () => {
  try {
    lgWarn(`Replaying...`);

    execFileSync('adb', [
      'shell',
      'sh',
      `/sdcard/autoRun/${file.replay}`,
    ]);

    lgSucc('Replay complete');
  } catch (e) {
    lgFail(`Replay failed.\n ${e}`);
  }
}
let tapXY = (x = 500, y = 500) => {
  try {
    lgWarn(`Taping ➜ ${x}:${y}`);

    execFileSync('adb', [
      'shell',
      'input',
      'tap',
      x,
      y,
    ]);

    lgSucc('Replay complete');
  } catch (e) {
    lgFail(`Replay failed.\n ${e}`);
  }
}
let showWMSize =  () => {
  try {
    let size = execFileSync('adb', [
      'shell',
      'wm',
      'size',
    ]);

    lgSucc(size);
  } catch (e) {
    lgFail(`Get display size failed.\n ${e}`);
  }
}

let pushReplayFile = () => {
  try {
    let result = execFileSync('adb', [
      'push',
      `${file.replay}`,
      '/sdcard/autoRun',
    ]);

    lgInfo(`Push file ${result}`);
  } catch (e) {
    lgFail(`Push file failed.\n ${e}`);
  }
}

module.exports = {
  record,
  replay,
  tapXY,
  pushReplayFile,
}
