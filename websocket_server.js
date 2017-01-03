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

    console.log('new user connected');

    ws.on('message', function incoming(message) {

        message = JSON.parse(message);

        console.log('received', message);

        let userLogin, userPass, authType, userMessage = '';

        let userObj = {userName: 'Stacy', userAge: '80', userAvatar: 'fghfghffghf', userAboutMe: 'Cool woman'};

        if(typeof message.userLogin !== 'undefined' && typeof message.userPass !== 'undefined' &&
            typeof message.authType !== 'undefined') {

            userLogin = message.userLogin;
            userPass = message.userPass;
            authType = message.authType;

            ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: authType}));

        }
        else if(typeof message.userMessage !== 'undefined'){
            userMessage = message.userMessage;
            wss.clients.forEach(function each(client) {
                if (client !== ws) client.send(JSON.stringify({connectionType: 'message', userMessage: userMessage}));
            });

        }
        else{
            ws.send(JSON.stringify({error: 'Error occurred. userLogin, userPass, authType and message are empty!'}));
        }

    });
    wss.on('close', function() {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    wss.on('error', function () {

        ws.send(JSON.stringify({error: 'Something unknown has happened((('}));

    });


});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });