'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverPath = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _appLogger = require('./core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('./core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _connect = require('./db/connect');

var _connect2 = _interopRequireDefault(_connect);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socketIo = require('./services/socketIo');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _passport3 = require('./services/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _combineRoutes = require('./routes/combineRoutes');

var _combineRoutes2 = _interopRequireDefault(_combineRoutes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors3 = require('./services/cors.service');

var _expressStaticGzip = require('express-static-gzip');

var _expressStaticGzip2 = _interopRequireDefault(_expressStaticGzip);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
_dotenv2.default.load();
console.log(process.env.domainName);
//? generatro a path which always pooint to corrent root directoriy
var serverPath = exports.serverPath = function serverPath() {
    return __dirname.indexOf('/dist') > 0 ? __dirname.slice(0, __dirname.indexOf('/dist')) : __dirname;
};
var jwtSecrect = 'lasfu';
//* passport setup
var port = _config2.default.PORT;
_appLogger2.default.stream = {
    write: function write(message, encoding) {
        // console.log(encoding);
        _appLogger2.default.info(message);
    }
};
(0, _connect2.default)();
var app = (0, _express2.default)();
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev', { stream: _appLogger2.default.stream }));
app.use((0, _cookieSession2.default)({
    //! d    hh    mm  ss
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: jwtSecrect
}));

(0, _passport4.default)();
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _cors2.default)(_cors3.corsOptionsDelegate));
app.options('*', (0, _cors2.default)(_cors3.corsOptionsDelegate));

(0, _combineRoutes2.default)(app);

var serverPathUrl = serverPath();

app.use('/', _express2.default.static(_path2.default.resolve(serverPathUrl, 'client', 'build'), { maxAge: oneYear }));

app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(serverPathUrl, 'client', 'build', 'index.html'));
});
// app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
var sslOptions = {
    key: _fs2.default.readFileSync('./cert/server.key'),
    cert: _fs2.default.readFileSync('./cert/server.cer')
};

// const server = https.createServer(sslOptions, app);

var server = _http2.default.createServer(app);
server.listen(port, function () {
    _appLogger2.default.info('server started - ', port);
});