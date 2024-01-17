const { errLogger } = require('./logEvents');

/**
 * 의문 : 왜 errorHandler는 next()를 호출하지 않아도 다른 커스텀 미들웨어 처럼 요청을 계속 받고 있지 않을까?  
 * 
 * 해결 : 다른 미들 웨어와 다르게 (err, req, res, next)에 err가 매개변수로 있다면 그 자체로 특수한 error-handling function임.
 * 그래서 next()를 호출하지 않아도 응답 대기를 하지않고 넘어감. 
 * 그러다해도 에러 핸들러에서 next()를 호출하지 않으면, response(res)라도 해야 불이익이 생기지 않음.
 * 
 * (express document)
 * Notice that when not calling “next” in an error-handling function, you are responsible for writing (and ending) the response. 
 * Otherwise those requests will “hang” and will not be eligible for garbage collection.
 */

const errorHandler = (err, req, res, next) => {
    const message = `${err.name}: ${err.message}`;
    errLogger(message, 'errLog.txt');
    console.log(err);

    // 방법 1. next 호출하지 않고 response
    res.status(500).send({
        message: 'Server Error',
        error: `${err}`
    });

    // 방법 2. next(err), next()에 err를 인자로 주면 the default error handler 발동.
    // next(err);

    // 방법 3. next() 호출, error는 났는데 무슨 에러인지 알지 못함. (비추)
    // next(); 

}

module.exports = errorHandler;