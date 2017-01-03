let server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 5000;

app.use(function (req, res) {
    res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {

        message = JSON.parse(message);

        console.log(message.userLogin);
        console.log(message.userPass);
        console.log(message.authType);

        let userLogin, userPass, authType, userMessage = '';

        let userObj = {userName: 'Stacy', userAge: '80', userAvatar: 'fghfghffghf', userAboutMe: 'Cool woman'};
        if(message.userLogin.length > 0 && message.userPass.length > 0 && message.authType.length > 0){

            userLogin = message.userLogin;
            userPass = message.userPass;
            authType = message.authType;

            ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: authType}));

        }
        else if(message.userMessage.length > 0){
            userMessage = message.userMessage;
            ws.send({connectionType: 'message', userMessage: userMessage});

        }
        else{

            ws.send({error: 'Error occurred. userLogin, userPass and authType are empty!'});
        }

    });
    wss.on('close', function() {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    wss.on('error', function () {

        ws.send({error: 'Something unknown has happened((('});

    });


});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });