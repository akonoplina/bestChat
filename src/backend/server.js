const PORT = 8008;

let options = {
//    'log level': 0
};

let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io').listen(server, options);
server.listen(PORT);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
//подписываемся на событие соединения нового клиента
io.sockets.on('connection', function (client) {
    //подписываемся на событие message от клиента
    client.on('message', function (message) {
        try {
            //посылаем сообщение себе
            client.emit('message', message);
            //посылаем сообщение всем клиентам, кроме себя
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});