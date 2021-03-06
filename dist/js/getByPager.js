'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (model) {
    var pageSize = 5; //一页多少条
    var currentPage = 1; //当前第几页
    var sort = { 'logindate': -1 }; //排序（按登录时间倒序）
    var condition = {}; //条件
    var skipnum = (currentPage - 1) * pageSize; //跳过数

    model.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log('Error:' + err);
        } else {
            console.log('Res:' + res);
        }
    });
};