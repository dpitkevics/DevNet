var http = require('http');
var server = http.createServer().listen(8002);
var io = require('socket.io').listen(server);
var cookie_reader = require('cookie');
var querystring = require('querystring');
var redis = require('redis');

io.use(function (socket, next) {
    if (socket.handshake.headers.cookie) {
        socket.handshake.cookie = cookie_reader.parse(socket.handshake.headers.cookie);
    }

    next();
});

io.sockets.on('connection', function (socket) {
    // Create redis client
    client = redis.createClient();

    // Subscribe to the Redis events channel
    client.subscribe('notifications.' + socket.handshake.cookie['sessionid']);

    // Subscribe to the Redis project feed channel
    client.psubscribe('projects.*');

    // Grab message from Redis and send to client
    client.on('message', function (channel, message) {
        socket.send(message);
    });

    // Unsubscribe after a disconnect event
    socket.on('disconnect', function () {
        client.unsubscribe('notifications.' + socket.handshake.cookie['sessionid']);
    });
});