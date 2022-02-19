const user = require('./userController');

// 문자인증(SENS를 통한) 전송 API
app.post('/app/send', user.send);

// 문자인증(SENS를 통한) 검증 API
app.post('/app/verify', user.verify);
