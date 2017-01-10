const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const express = require('express');

const wss = new WebSocketServer({server});
const app = express();
const port = 5000;

app.use((req, res) => {
    res.send({ msg: 'hello' });
});

wss.on('connection', function connection(ws) {
    const clientID = ws._socket._handle.fd;

    ws.on('message', (message) => {
        message = JSON.parse(message);

        console.log('received', message);

        let userMessage = '';
        let userAvatar = '';
        let userName = '';
        let userObj = {};

        if (clientID % 2 === 1) {
            userObj = {userName: 'Helen', userAge: '16', userAvatar: 'avatarGirl', userAboutMe: 'Awesome girl...'};
        } else {
            userObj = {userName: 'Robert', userAge: '20', userAvatar: 'avatarBoy', userAboutMe: 'Tough guy!'};
        }
        if (typeof message.userLogin !== 'undefined' && typeof message.userPass !== 'undefined' &&
            typeof message.authType !== 'undefined') {

            ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: message.authType}));
        } else if (typeof message.userMessage !== 'undefined') {
            userMessage = message.userMessage;
            userName = message.userName;
            userAvatar = message.userAvatar;
            wss.clients.forEach((client) => {
                if (client !== ws) {
                    client.send(JSON.stringify({connectionType: 'message', userMessage, userName, userAvatar}));
                }
            });
        } else {
            ws.send(JSON.stringify({error: 'Error occurred. userLogin, userPass, authType and message are empty!'}));
        }

    });
    wss.on('close', () => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    wss.on('error', () => {
        ws.send(JSON.stringify({error: 'Something unknown has happened((('}));
    });
});

server.on('request', app);
server.listen(port, () => { console.log(`Listening on ${server.address().port}`); });
