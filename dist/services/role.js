'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write'],
        inherits: ['guest']
    },
    guest: {
        can: ['read']
    }
};

var RBAC = function () {
    function RBAC(roles) {
        (0, _classCallCheck3.default)(this, RBAC);

        if ((typeof roles === 'undefined' ? 'undefined' : (0, _typeof3.default)(roles)) !== 'object') {
            throw new TypeError('Expected an object as input');
        }
        this.roles = roles;
    }

    (0, _createClass3.default)(RBAC, [{
        key: 'can',
        value: function can(role, operation) {
            var _this = this;

            // Check if role exists
            if (!this.roles[role]) {
                return false;
            }
            var $role = this.roles[role];
            // Check if this role has access
            if ($role.can.indexOf(operation) !== -1) {
                return true;
            }
            // Check if there are any parents
            if (!$role.inherits || $role.inherits.length < 1) {
                return false;
            }
            // Check child roles until one returns true or all return false
            return $role.inherits.some(function (childRole) {
                return _this.can(childRole, operation);
            });
        }
    }]);
    return RBAC;
}();

exports.default = RBAC;