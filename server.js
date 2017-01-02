let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config');

let socket = require('./src/routes/socket.js');

let app = new (require('express'))();
let port = 3000;

let compiler = webpack(config);

let http = require('http');

let server = http.createServer(app);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});

// let io = require('socket.io').listen(server);
// io.sockets.on('connection', socket);
