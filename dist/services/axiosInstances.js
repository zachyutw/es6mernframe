'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.springAdminServer = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var springAdminServer = exports.springAdminServer = _axios2.default.create({ baseURL: _config2.default.javaAdminBaseUrl, timeout: 10000 });
var instances = { springServer: springServer, authServer: authServer, client: { basicClient: basicClient, longTermTokenControl: longTermTokenControl } };
exports.default = instances;