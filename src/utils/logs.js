
const fs = require('fs')
const LOGS_PATH = __dirname + '/logs.csv'

export const LOGS_TYPES = {
    REPORT: 'REPORT',
    START_PROCESS: 'START_PROCESS',
    SET_DATA: 'SET_DATA',
    UPDATE_DATA: 'UPDATE_DATA'
}

export const createLog = (logData) => {
    if(!fs.existsSync(LOGS_PATH)) {
        fs.writeFileSync(LOGS_PATH, '')
    }
    
    const logs = fs.readFileSync(LOGS_PATH,'utf8');
    const { type, data } = logData
    const date = new Date()

    const toSave = date + "||" + type + " || " + JSON.stringify(data) + '\n'
    console.log(toSave)

    fs.appendFileSync(LOGS_PATH, toSave)

}