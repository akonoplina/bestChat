const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const wss = new WebSocketServer({server});
const app = express();
const port = 5000;

const MongoClient = require('mongodb').MongoClient;

const chatDB = 'chatDB';
let usersCollection, messagesCollection;

MongoClient.connect(`mongodb://127.0.0.1:27017/${chatDB}`, (err, db) => {
    if (err) {
        throw err;
    }
    usersCollection = db.collection('users');
    messagesCollection = db.collection('messages');
});

wss.on('connection', function connection(ws) {
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
                case 'signUp': {
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

                        switch (fileType) {
                            case 'svg': {
                                base64Data = userAvatar.replace('data:image/svg+xml;base64,', '');
                                break;
                            }
                            case 'png': {
                                base64Data = userAvatar.replace('data:image/png;base64,', '');
                                break;
                            }
                            case 'jpg': {
                                base64Data = userAvatar.replace('data:image/jpeg;base64,', '');
                                break;
                            }
                            case 'jpeg': {
                                base64Data = userAvatar.replace('data:image/jpeg;base64,', '');
                                break;
                            }
                            case 'gif': {
                                base64Data = userAvatar.replace('data:image/gif;base64,', '');
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
                    usersCollection.insert({userLogin: message.userLogin,
                        userPass: message.userPass,
                        userName,
                        userAge,
                        userAvatar: fileName,
                        userAboutMe }, {w: 1}, (err) => {
                            if (err) {
                                ws.send(JSON.stringify({errorText: 'User wasn\'t  created!!!', connectionType: 'auth', authType: message.authType}));
                            }
                            userObj = {userName, userAge, userAvatar: fileName, userAboutMe};

                            const token = jwt.sign({ userObj}, 'shhhhh');

                            ws.send(JSON.stringify({token, connectionType: 'auth', authType: message.authType}));
                        });
                    break;
                }
                case 'signIn': {
                    usersCollection.find({userLogin: message.userLogin, userPass: message.userPass}).toArray((error, list) => {
                        if (list[0] && Object.keys(list[0]).length > 0) {
                            userObj = {userName: list[0].userName, userAboutMe: list[0].userAboutMe, userAvatar: list[0].userAvatar, userAge: list[0].userAge};

                            const token = jwt.sign({ userObj}, 'shhhhh');

                            ws.send(JSON.stringify({token, connectionType: 'auth', authType: message.authType}));
                        } else {
                            ws.send(JSON.stringify({errorText: 'User not found!!!', connectionType: 'auth', authType: message.authType}));
                        }
                    });
                    break;
                }
            }
        } else if (typeof message.userMessage !== 'undefined') {
            userMessage = message.userMessage;
            userName = message.userName;
            userAvatar = message.userAvatar;
            messagesCollection.insert({userName, userAvatar, userMessage}, {w: 1}, (err) => {
                if (err) {
                    ws.send(JSON.stringify({errorText: 'message wasn\'t saved', connectionType: 'message', authType: message.authType}));
                }
                wss.clients.forEach((client) => {
                    if (client !== ws) {
                        client.send(JSON.stringify({connectionType: 'message', userMessage, userName, userAvatar}));
                    }
                });
            });
        } else {
            ws.send(JSON.stringify({errorText: 'Error occurred. userLogin, userPass, authType and message are empty!', connectionType: 'message', authType: message.authType}));
        }
    });
    wss.on('close', () => {
        console.log(`${new Date()} Peer  ${connection.remoteAddress} disconnected.`);
    });
    wss.on('error', () => {
        ws.send(JSON.stringify({errorText: 'Something unknown has happened((('}));
    });
});

server.on('request', app);
server.listen(port, () => { console.log(`Listening on ${server.address().port}`); });
