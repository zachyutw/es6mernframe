import Asset from '../models/asset.model';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';
import _ from 'lodash';
import resourcesController from './Controller/resoruceContorller';
import fs from 'fs';
const ModelName = 'asset';
// inheritance resourceController with Basic CRUD class FortuneClass extends
// ResourcesClass{} const controller = new FortuneClass(Fortune);
const Model = Asset;
let controller = resourcesController(Model, Model.collection.name);

controller.uploadFiles = async (req, res) => {
	const name = 'uploadFiles';
	try {
		res.send({ message: 'success upload' });
	} catch (err) {
		res.status(414).send({ message: 'something is wrong' });
	}
};
controller.uploadImages = async (req, res) => {
	const name = 'uploadImages';
	try {
		let images = [];
		let tagsList = [];
		try {
			if (!_.isArray(req.body.tagsList)) {
				tagsList = [ req.body.tagsList ];
			} else {
				tagsList = req.body.tagsList;
			}
			if (tagsList.length != req.files.length) {
				res.status(400).send({ message: 'tagsList not mach images files' });
			} else {
				let assets = await Promise.all(
					_.map(req.files, async (file, index) => {
						const asset = Asset({
							...file,
							domainName: config.domainName,
							url: config.domainName + file.path,
							status: 1
						});
						const saved = await Asset.add(asset);
						images.push({
							imageUrl: saved.domainName + saved.path,
							thumbnail: saved.domainName + saved.path,
							tags: tagsList[index]
						});
						return saved;
					})
				);
			}
		} catch (err) {
			console.log(err);
			return res.status(400).send({ message: 'tagsList go wrong', error: err });
		}
		res.send({ message: 'success upload', images });
	} catch (err) {
		console.log(err);
		res.status(414).send({ message: 'something is wrong' });
	}
};

controller.deleteImages = async (req, res) => {
	try {
		const { images, ids } = req.body;
		let assets = [];
		if (ids) {
			assets = await Promise.all(
				_.map(ids, async (id) => {
					const asset = await Asset.findById(id);
					if (asset) {
						fs.stat(asset.path, function (err, stats) {
							console.log(stats); //here we got all information of file in stats variable
							if (err) {
								return console.error(err);
							}
							fs.unlink(asset.path, function (err) {
								if (err) return console.log(err);
								console.log('file deleted successfully');
							});
						});
					}
					const deleted = await Asset.findByIdAndRemove(id);
					return asset;
				})
			);
		} else if (images) {
			assets = await Promise.all(
				_.map(images, async (image) => {
					const asset = await Asset.findOne({ url: image.imageUrl });
					if (asset) {
						fs.stat(asset.path, function (err, stats) {
							console.log(stats); //here we got all information of file in stats variable
							if (err) {
								return console.error(err);
							}
							fs.unlink(asset.path, function (err) {
								if (err) return console.log(err);
								console.log('file deleted successfully');
							});
						});
						const deleted = await Asset.findByIdAndRemove(asset.id);
					}
					return asset;
				})
			);
		} else {
			res.status(400).send({ message: 'Faulty operation' });
		}

		assets = _.map(assets, (asset) => _.pick(asset, [ 'id', 'url' ]));
		assets = _.filter(assets, (asset) => {
			return !_.isEmpty(asset);
		});
		if (_.isEmpty(assets)) {
			res.status(400).send({ error: true, errorMessage: 'assets not found' });
		}
		res.send({ message: 'deleted', assets });
	} catch (err) {
		console.log(err);
		res.status(414).send({ message: 'something is wrong' });
	}
};

export default controller;
