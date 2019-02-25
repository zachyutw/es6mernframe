import express from 'express';
import ResourcesRoutes from './Routes/resourcesRoutes';
import controller from '../controllers/asset.controller';
import { ImagesUpload, fileUpload } from '../services/multer';
import RESTPlugins from '../services/RESTPlugins';
import _ from 'lodash';
let router = express.Router();
router = ResourcesRoutes(router, controller);
router.post('/files', fileUpload.array('files'), (req, res) => {
	controller.uploadFiles(req, res);
});
router.post('/images', ImagesUpload.array('images'), (req, res) => {
	controller.uploadImages(req, res);
});
router.delete('/images', (req, res) => {
	controller.deleteImages(req, res);
});

export default router;
