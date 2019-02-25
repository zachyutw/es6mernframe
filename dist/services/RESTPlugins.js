'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.selectPlugin = selectPlugin;
exports.populatePlugin = populatePlugin;
exports.populatePathPlugin = populatePathPlugin;
exports.allFunctionsPlugin = allFunctionsPlugin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectPlugin(req, res, next) {
    var allSources = (0, _extends4.default)({}, req.params, req.body, req.query);
    var _allSources$select = allSources.select,
        select = _allSources$select === undefined ? "" : _allSources$select;

    if (!_lodash2.default.isEmpty(select)) {
        req.selects = select.split(',');
    }
    next();
}

function populatePlugin(req, res, next) {
    var allSources = (0, _extends4.default)({}, req.params, req.body, req.query);
    var _allSources$populate = allSources.populate,
        populate = _allSources$populate === undefined ? "" : _allSources$populate;

    if (!_lodash2.default.isEmpty(populate)) {
        req.populates = populate.split(',');
    }
    next();
}
function populatePathPlugin(req, res, next) {
    var allSources = (0, _extends4.default)({}, req.params, req.body, req.query);
    var _allSources$populateP = allSources.populatePath,
        populatePath = _allSources$populateP === undefined ? "" : _allSources$populateP,
        _allSources$populateM = allSources.populateModel,
        populateModel = _allSources$populateM === undefined ? "" : _allSources$populateM;

    var populatePaths = !_lodash2.default.isEmpty(populatePath) ? populatePath.split(',') : [];
    var populateModels = !_lodash2.default.isEmpty(populateModel) ? populateModel.split(',') : [];
    if (populatePaths.length != populateModels.length) {
        res.status(400).send({ error: true, errorMessage: "popualte key model pairs not correct" });
    } else if (!_lodash2.default.isEmpty(populatePaths)) {
        req.pathModelPopulates = _lodash2.default.map(populatePaths, function (path, index) {
            return { path: path, model: _lodash2.default.capitalize(populateModels[index]) };
        });
    }
    next();
}
function allFunctionsPlugin(req, res, next) {
    var allSources = (0, _extends4.default)({}, req.params, req.body, req.query);
    var _allSources$populate2 = allSources.populate,
        populate = _allSources$populate2 === undefined ? "" : _allSources$populate2,
        _allSources$select2 = allSources.select,
        select = _allSources$select2 === undefined ? "" : _allSources$select2,
        sort = allSources.sort,
        page = allSources.page,
        limit = allSources.limit,
        maxScan = allSources.maxScan,
        restSources = (0, _objectWithoutProperties3.default)(allSources, ['populate', 'select', 'sort', 'page', 'limit', 'maxScan']);

    var controllQuery = {};
    var deepSelects = {};
    var usedKeys = ['select', 'populate', 'sort', 'page', 'limit', 'ids'];
    _lodash2.default.keys(allSources).map(function (key) {
        if (_lodash2.default.indexOf(key, '$') == 0) {
            usedKeys.push(key);
            var newKey = _lodash2.default.trim(key, '$');
            deepSelects = (0, _extends4.default)({}, deepSelects, (0, _defineProperty3.default)({}, newKey, allSources[key]));
        }
    });
    controllQuery.sort = sort;
    controllQuery.page = page;
    controllQuery.limit = limit;
    controllQuery.whereQueries = _lodash2.default.omit(req.query, usedKeys);
    controllQuery.deepSelects = deepSelects;

    if (!_lodash2.default.isEmpty(populate)) {
        controllQuery.populate = populate;
    }
    if (!_lodash2.default.isEmpty(select)) {
        controllQuery.select = select;
    }
    req.controllQuery = controllQuery;
    next();
}

var RESTPlugins = {
    selectPlugin: selectPlugin,
    populatePlugin: populatePlugin,
    populatePathPlugin: populatePathPlugin,
    allFunctionsPlugin: allFunctionsPlugin
};
exports.default = RESTPlugins;