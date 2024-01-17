const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

/**
 * 참고 자료
 * date-fns document : https://date-fns.org/v2.29.2/docs/format 
 * nodejs fileSystem : https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fspromisesappendfilepath-data-options
 */

const logEvent = async (message, filename) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/d\tHH:mm:ss')}`;
    const logMessage = `${dateTime}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', filename), logMessage);
    } catch (err) {
        console.error(err.message); // error과 log의 차이점 : error는 진짜 error 난 것 처럼 표현해줌.
        console.error(err.stack);
    }
}

const reqLogger = (req, res, next) => {
    const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
    logEvent(message, 'reqLog.txt');
    next();
}

// errorHandler에서 사용
const errLogger = (message, filename) => {
    logEvent(message, filename);
}

module.exports = { reqLogger, errLogger }