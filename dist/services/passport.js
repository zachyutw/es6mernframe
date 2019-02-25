'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportCustom = require('passport-custom');

var _passportCustom2 = _interopRequireDefault(_passportCustom);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../models/auth.model');

var _auth2 = _interopRequireDefault(_auth);

var _authorize = require('./authorize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Passport = function Passport() {
	var JWTStrategy = _passportJwt2.default.Strategy;
	var ExtractJWT = _passportJwt2.default.ExtractJwt;
	_passport2.default.use(new _passportLocal2.default({
		usernameField: 'username',
		passwordField: 'password'
	}, function (username, password, cb) {
		return _auth2.default.findOne({ username: username }).then(function (auth) {
			return !auth || !(password === auth.password) ? cb(null, false, {
				message: 'Incorrect email or password.'
			}) : cb(null, auth.toObject(), {
				message: 'Logged In Successfully'
			});
		}).catch(function (err) {
			return cb(err);
		});
	}));
	_passport2.default.use('openId-strategy', new _passportCustom2.default(function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, done) {
			var source, openId, auth, user;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							source = (0, _extends3.default)({}, req.query, req.body);
							openId = source.openId;
							auth = void 0;
							user = void 0;

							if (auth) {
								_context.next = 7;
								break;
							}

							return _context.abrupt('return', done(null, false, {
								error: true,
								errorMessage: 'not correct format'
							}));

						case 7:
							return _context.abrupt('return', done(null, {}, {
								message: 'Sign In Success'
							}));

						case 10:
							_context.prev = 10;
							_context.t0 = _context['catch'](0);
							return _context.abrupt('return', done(_context.t0));

						case 13:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 10]]);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}()));
	_passport2.default.use('custom-strategy', new _passportCustom2.default(function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, done) {
			var _req$body, username, email, phoneNumber, password, auth, user;

			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_req$body = req.body, username = _req$body.username, email = _req$body.email, phoneNumber = _req$body.phoneNumber, password = _req$body.password;
							auth = void 0;
							user = void 0;

							if (!username) {
								_context2.next = 10;
								break;
							}

							_context2.next = 7;
							return _auth2.default.findOne({
								username: username
							});

						case 7:
							auth = _context2.sent;
							_context2.next = 26;
							break;

						case 10:
							if (!email) {
								_context2.next = 19;
								break;
							}

							_context2.next = 13;
							return _user2.default.findOne({
								email: email
							});

						case 13:
							user = _context2.sent;
							_context2.next = 16;
							return _auth2.default.findOne({
								user: user._id
							});

						case 16:
							auth = _context2.sent;
							_context2.next = 26;
							break;

						case 19:
							if (!phoneNumber) {
								_context2.next = 26;
								break;
							}

							_context2.next = 22;
							return _user2.default.findOne({
								phone: phoneNumber
							});

						case 22:
							user = _context2.sent;
							_context2.next = 25;
							return _auth2.default.findOne({
								user: user_id
							});

						case 25:
							auth = _context2.sent;

						case 26:
							if (auth) {
								_context2.next = 30;
								break;
							}

							return _context2.abrupt('return', done(null, false, {
								error: true,
								errorMessage: 'not correct format'
							}));

						case 30:
							if (password === auth.password) {
								_context2.next = 32;
								break;
							}

							return _context2.abrupt('return', cb(null, false, {
								message: 'Incorrect email or password.'
							}));

						case 32:
							return _context2.abrupt('return', done(null, auth.toObject(), {
								message: 'Sign In Success'
							}));

						case 35:
							_context2.prev = 35;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', done(_context2.t0));

						case 38:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 35]]);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}()));

	_passport2.default.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: _authorize.jwtSecrect
	}, function (token, done) {
		return done(null, token);
	}));

	_passport2.default.serializeUser(function (user, done) {
		// console.log(user,"serializeUser")
		done(null, user.id);
	});

	_passport2.default.deserializeUser(function (id, done) {
		console.log(id);
	});
};

exports.default = Passport;