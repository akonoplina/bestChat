const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const express = require('express');
const fs = require('fs');
const querystring = require('querystring');

const wss = new WebSocketServer({server});
const app = express();
const port = 5000;

const MongoClient = require('mongodb').MongoClient;

let userDB, chatDB;

// подсоединяемся к БД
MongoClient.connect('mongodb://127.0.0.1:27017', (err, db) => {
    if (err) { throw err; }

    // записываем ссылки на таблицы (коллекции) в глобальные переменные
    userDB = db.collection('users');
    chatDB = db.collection('chat');
});


app.use((req, res) => {
    res.send({ msg: 'hello' });
});

wss.on('connection', function connection(ws) {
    // const clientID = ws._socket._handle.fd;

    ws.on('message', (message) => {
        message = JSON.parse(message);

        console.log('received', message);

        let userMessage = '';
        let userAvatar = '';
        let userName = '';
        let userAge = '';
        let userAboutMe = '';
        let userObj = {};

        if (typeof message.userLogin !== 'undefined' && typeof message.userPass !== 'undefined' &&
            typeof message.authType !== 'undefined') {
            switch (message.authType) {
                case 'signIn': {
                    if (message.userName) {
                        userName = message.userName;
                    } else {
                        userName = message.userLogin;
                    }
                    if (message.userAge) {
                        userAge = message.userAge;
                    }
                    if (message.userAvatar) {
                        userAvatar = message.userAvatar; // file text data
                        fs.createWriteStream('./pics');
                        console.log(userAvatar);
                    }
                    if (message.userAboutMe) {
                        userAboutMe = message.userAboutMe;
                    }
                    const writeRes = userDB.insert({userLogin: message.userLogin, userPass: message.userPass, userName, userAge, userAvatar, userAboutMe });
                    if (writeRes.nInserted === 1) {
                        // success
                        userObj = {userName, userAge, userAvatar, userAboutMe};
                        ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: message.authType}));
                    } else {
                        ws.send({errorText: 'User wasn\'t  created!!!'}); // send error message
                    }
                    break;
                }
                case 'signUp': {
                    userObj = userDB.find({userLogin: message.userLogin, userPass: message.userPass});
                    if (Object.keys(userObj).length > 0) {
                        ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: message.authType}));
                    } else {
                        ws.send({errorText: 'User not found!!!'}); // send error message
                    }
                    break;
                }
            }
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
