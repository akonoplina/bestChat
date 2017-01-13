const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const express = require('express');
const fs = require('fs');

const wss = new WebSocketServer({server});
const app = express();
const port = 5000;

const MongoClient = require('mongodb').MongoClient;

let userDB, chatDB;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, db) => {
    if (err) { throw err; }

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

        let userMessage = '';
        let userAvatar = '';
        let userName = '';
        let userAge = '';
        let userAboutMe = '';
        let userObj = {};
        let fileName = '';
        let fileType = '';
        let base64Data = '';

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
                        userAvatar = message.userAvatar;

                        fileName = userAvatar.substr(0, userAvatar.search(':'));
                        userAvatar = userAvatar.slice(fileName.length + 1, userAvatar.length);
                        userAvatar = userAvatar.toString();

                        fileType = fileName.substr(fileName.search(/\./) + 1, fileName.length);
                        console.log('fileType', fileType);

                        switch (fileType) {
                            case 'svg': {
                                base64Data = userAvatar.replace('data:image/svg+xml;base64,', '');
                                break;
                            }
                            case 'png': {
                                console.log(userAvatar);

                                base64Data = userAvatar.replace('data:image/png;base64,', '');
                                break;
                            }
                            case 'jpg': {
                                base64Data = userAvatar.replace('data:image/jpg;base64,', '');
                                break;
                            }
                            case 'jpeg': {
                                base64Data = userAvatar.replace('data:image/jpeg;base64,', '');
                                break;
                            }
                            default: {
                                break;
                            }
                        }

                        const buffer = Buffer.from(base64Data, 'base64');

                        fs.writeFileSync(`src/pics/${fileName}`, buffer);
                    }
                    if (message.userAboutMe) {
                        userAboutMe = message.userAboutMe;
                    }
                    const writeRes = userDB.insert({userLogin: message.userLogin, userPass: message.userPass, userName, userAge, fileName, userAboutMe });
                    if (writeRes.nInserted === 1) {
                        // success
                        userObj = {userName, userAge, fileName, userAboutMe};
                        ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: message.authType}));
                    } else {
                        ws.send(JSON.stringify({errorText: 'User wasn\'t  created!!!'})); // send error message
                    }
                    break;
                }
                case 'signUp': {
                    userObj = userDB.find({userLogin: message.userLogin, userPass: message.userPass});
                    if (Object.keys(userObj).length > 0) {
                        ws.send(JSON.stringify({user: userObj, connectionType: 'auth', authType: message.authType}));
                    } else {
                        ws.send(JSON.stringify({errorText: 'User not found!!!'})); // send error message
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
