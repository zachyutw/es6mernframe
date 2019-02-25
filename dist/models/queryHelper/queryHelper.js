'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mediaTypesConvert = exports.parseNumber = exports.limitPass = exports.skipPass = exports.orderByPass = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PAGINATE_MAX = 100;
var orderByPass = exports.orderByPass = function orderByPass() {
	var orderBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'price';
	var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DESC';

	var _direction = {
		DESC: '',
		ASC: '-'
	};
	var direct = _direction['' + direction] || '';
	var _orderBy = {
		id: direct + 'createdAt',
		price: direct + 'price',
		distance: direct + 'availableDay'
	};
	var order = '';
	if (orderBy) {
		order = _orderBy['' + orderBy];
	}
	// console.log(order);
	return order;
};
var skipPass = exports.skipPass = function skipPass(pageLocationId) {
	var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PAGINATE_MAX;

	var skip = 0;
	if (pageLocationId) {
		skip = pageLocationId * limit;
	}
	return skip;
};
var limitPass = exports.limitPass = function limitPass(limit) {
	var locallimit = PAGINATE_MAX;
	if (limit) {
		locallimit = limit;
	}
	return locallimit;
};

var parseNumber = exports.parseNumber = function parseNumber(num) {
	return _lodash2.default.isNumber(num) ? num : _lodash2.default.toNumber(num);
};
var mediaTypesConvert = exports.mediaTypesConvert = function mediaTypesConvert(hasVR, hasVideo) {
	var mediaTypes = 0;
	if (hasVR && hasVideo) {
		mediaTypes = 3;
	} else if (!hasVR && hasVideo) {
		mediaTypes = 2;
	} else if (hasVR && !hasVideo) {
		mediaTypes = 1;
	} else {
		mediaTypes = 0;
	}
	return mediaTypes;
};
var queryHelper = { orderByPass: orderByPass, skipPass: skipPass, limitPass: limitPass, parseNumber: parseNumber, mediaTypesConvert: mediaTypesConvert };
exports.default = queryHelper;