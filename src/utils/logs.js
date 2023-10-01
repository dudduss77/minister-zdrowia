const fs = require('fs');

export const LOGS_TYPES = {
  REPORT: 'REPORT',
  START_PROCESS: 'START_PROCESS',
  SET_DATA: 'SET_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
};

export const createLog = (logData, userDataPath) => {
  let logsPath = __dirname + '/logs.csv';
  if (fs.existsSync(userDataPath + '/userConfig.json')) {
    const path = fs.readFileSync(userDataPath + '/userConfig.json', 'utf8');
    if (path) {
      const newPath = JSON.parse(path);
      logsPath = newPath.userPath + '/logs.csv';
    }
  }

  if (!fs.existsSync(logsPath)) {
    fs.writeFileSync(logsPath, '');
  }

  if (fs.existsSync(logsPath)) {
    const logs = fs.readFileSync(logsPath, 'utf8');
    const { type, data } = logData;
    const date = new Date();

    const toSave = date + '||' + type + ' || ' + JSON.stringify(data) + '\n';
    console.log(toSave);

    fs.appendFileSync(logsPath, toSave);
  }
};
