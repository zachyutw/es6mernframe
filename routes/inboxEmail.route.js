import express from 'express';
import controller from '../controllers/inboxEmail.controller';
import ResourcesRoutes from './Routes/resourcesRoutes';

let router = express.Router();
router.post('/send', (req, res) => {
	controller.send(req, res);
});
router.get('/verify', (req, res) => {
	console.log(req.query);
	controller.verify(req, res);
	// res.redirect('/');
});
export default router;
