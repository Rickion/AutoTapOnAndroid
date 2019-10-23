const { execFileSync } = require('child_process');
const { lgInfo, lgWarn, lgSucc, lgFail } = require('./log');
const { file } = require('./config');

let record = () => {
  try {
    lgWarn(`Recording...`);

    execFileSync('adb', [
      'exec-out',
      `getevent -t > ${file.record}`,
    ]);

    lgSucc('Record complete');
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
  pushReplayFile,
}
