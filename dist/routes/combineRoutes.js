'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

var _seed = require('./seed.route');

var _seed2 = _interopRequireDefault(_seed);

var _publicFiles = require('./publicFiles.route');

var _publicFiles2 = _interopRequireDefault(_publicFiles);

var _googleMap = require('./googleMap.route');

var _googleMap2 = _interopRequireDefault(_googleMap);

var _asset = require('./asset.route');

var _asset2 = _interopRequireDefault(_asset);

var _chatroom = require('./chatroom.route');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _account = require('./account.route');

var _account2 = _interopRequireDefault(_account);

var _product = require('./product.route');

var _product2 = _interopRequireDefault(_product);

var _RESTPlugins = require('../services/RESTPlugins');

var _RESTPlugins2 = _interopRequireDefault(_RESTPlugins);

var _authorize = require('../services/authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _inboxEmail = require('./inboxEmail.route');

var _inboxEmail2 = _interopRequireDefault(_inboxEmail);

var _resoruceContorller = require('../controllers/Controller/resoruceContorller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiVersion = '';
/**
 *
 *
 * @param {*} app express
 */
var combineRoutes = function combineRoutes(app) {
	app.use('/api' + apiVersion + '/chatroom', _RESTPlugins2.default.allFunctionsPlugin, _chatroom2.default);
	app.use('/api' + apiVersion + '/auth', _RESTPlugins2.default.allFunctionsPlugin, _auth2.default);
	app.use('/api' + apiVersion + '/user', _RESTPlugins2.default.allFunctionsPlugin, _user2.default);
	app.use('/api' + apiVersion + '/product', _RESTPlugins2.default.allFunctionsPlugin, _product2.default);
	app.use('/api' + apiVersion + '/account', _RESTPlugins2.default.allFunctionsPlugin, _authorize2.default.authorized, _account2.default);
	app.use('/api' + apiVersion + '/inboxEmail', _inboxEmail2.default);
	app.use('/api' + apiVersion + '/seed', _seed2.default);
	app.use('/api' + apiVersion + '/public', _publicFiles2.default);
	app.use('/api' + apiVersion + '/googleMap', _googleMap2.default);
	app.use('/api' + apiVersion + '/asset', _asset2.default);
	app.use('/api' + apiVersion + '/*', function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		(0, _resoruceContorller.errorRes)(res, 404, 'Not Found');
		next(err);
	});
};

exports.default = combineRoutes;