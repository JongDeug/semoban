const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = "쓰레기 값";
    console.log(`authHeader : ${authHeader}`);
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    const url = req.url;
    if (url.split('/')[1] === 'api') {
        jwt.verify(
            token, // accessToken
            process.env.ACCESS_TOKEN_SECRET, // .env 파일, accessToken 확인을 위해 맨처음 만든 암호 코드
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({ 'message': 'invalid token' });
                }
                // decoded 해서 req에 원하는 값 넣어서 나중에 사용 가능.
                req.userId = decoded.UserInfo.userId;
                req.roles = decoded.UserInfo.roles;
                next();
            }
        )
    } else {
        next();
    }
}

module.exports = verifyJWT;