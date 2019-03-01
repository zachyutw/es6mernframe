'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var server = _http2.default.createServer(app);
    var io = (0, _socket2.default)(server);
    var users = [];
    io.on('connection', function (socket) {
        var isNewUser = true;
        socket.on('chat', function (data) {
            socket.join(data.room);
            users.map(function (user) {
                if (user.id === data.id) {
                    // console.log("not new user",data.id,data.value) ;
                    isNewUser = false;
                }
            });
            if (isNewUser) {
                users.push({ id: data.id });
                socket.emit('loginSuccess', data);
                io.to(data.room).emit('add', data);
                _appLogger2.default.info('room ' + data.room + ' user ' + data.id + ' connected ');
            } else {
                socket.emit('loginFail', '');
            }
            // console.log(`${users.length} users connect`);
        });
        socket.on('sendMessage', function (data) {
            // console.log(data);
            io.to(data.room).emit('receiveMessage', data);
        });
        socket.on('leaveRoom', function (data) {
            socket.leave(data.room);
            _appLogger2.default.info('room ' + data.room + ' user ' + data.id + ' leaved room ');
        });

        socket.on('subscribeToTimer', function (interval) {
            // console.log('client is subscribing to timer with interval ', interval);
            setInterval(function () {
                socket.emit('timer', new Date());
            }, interval);
        });
    });
    return server;
};