'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (query) {
	var controllQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var _controllQuery$select = controllQuery.select,
	    select = _controllQuery$select === undefined ? '' : _controllQuery$select,
	    _controllQuery$popula = controllQuery.populate,
	    populate = _controllQuery$popula === undefined ? '' : _controllQuery$popula,
	    sort = controllQuery.sort,
	    page = controllQuery.page,
	    limit = controllQuery.limit,
	    _controllQuery$whereQ = controllQuery.whereQueries,
	    whereQueries = _controllQuery$whereQ === undefined ? {} : _controllQuery$whereQ,
	    _controllQuery$deepSe = controllQuery.deepSelects,
	    deepSelects = _controllQuery$deepSe === undefined ? {} : _controllQuery$deepSe;

	if (!_lodash2.default.isEmpty(sort)) {
		query.sort(sort);
	}
	if (page && limit) {
		query.skip(_lodash2.default.parseInt(limit) * _lodash2.default.parseInt(page));
	} else if (page) {
		query.skip(_lodash2.default.parseInt(page));
	}
	if (limit) {
		query.limit(_lodash2.default.parseInt(limit));
	}
	if (!_lodash2.default.isEmpty(select)) {
		query.select(select.split(','));
	}
	if (!_lodash2.default.isEmpty(populate)) {
		_lodash2.default.split(populate, ',').map(function (path) {
			var queryPopulate = {
				path: path,
				model: _lodash2.default.chain(path).startCase().split(' ').last().capitalize().thru(function (str) {
					return _lodash2.default.endsWith(str, 's') ? str.slice(0, -1) : str;
				}).value()
			};
			if (!_lodash2.default.isEmpty(deepSelects[path])) {
				queryPopulate.select = deepSelects[path].split(',');
			}
			query.populate(queryPopulate);
		});
	}
	if (!_lodash2.default.isEmpty(whereQueries)) {
		_lodash2.default.keys(whereQueries).map(function (key) {
			var range = _lodash2.default.split(whereQueries[key], '~');
			if (range.length == 2) {
				if (_lodash2.default.isEmpty(range[0])) {
					query.where(key).lte(range[1]);
				} else if (_lodash2.default.isEmpty(range[1])) {
					query.where(key).gte(range[0]);
				} else {
					query.where(key).gte(range[0]).lte(range[1]);
				}
			} else {
				query.where(key, whereQueries[key]);
			}
		});
	}

	return query;
};