'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (router, controller) {
	router.put('/list/ids', function (req, res) {
		controller.getIds(req, res);
	});
	router.post('/list', function (req, res) {
		controller.addMany(req, res);
	});
	router.get('/list', function (req, res) {
		controller.getList(req, res);
	});
	router.delete('/list', function (req, res) {
		controller.dropAll(req, res);
	});
	router.put('/list', function (req, res) {
		controller.updateList(req, res);
	});
	router.post('/item', function (req, res) {
		controller.setItem(req, res);
	});
	router.get('/item/schema', function (req, res) {
		controller.getSchema(req, res);
	});
	router.get('/item/:id?', function (req, res) {
		controller.getItem(req, res);
	});
	router.delete('/item/:id?', function (req, res) {
		controller.delete(req, res);
	});
	router.put('/item/:id?', function (req, res) {
		controller.update(req, res);
	});

	return router;
};