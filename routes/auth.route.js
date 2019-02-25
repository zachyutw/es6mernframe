//routes/auth.js
import express from 'express';
import _ from 'lodash';
import controller from '../controllers/auth.controller';
import authorize from '../services/authorize';
import RESTPlugins from '../services/RESTPlugins';
import ResourcesRoutes from './Routes/resourcesRoutes';
let router = express.Router();
router = ResourcesRoutes(router, controller);
router.put('/password', authorize.authorized, (req, res) => {
	controller.updatePassword(req, res);
});
router.post('/signIn', authorize.passportCustom, (req, res) => {
	controller.signIn(req, res);
});
router.post('/email/verify', (req, res) => {
	controller.sendEmailVerifyCode(req, res);
});
router.get('/email/verify', (req, res) => {
	controller.decodedEmailToken(req, res);
});
router.post('/signUp/email', (req, res) => {
	controller.emailSignUp(req, res);
});

router.post('/signUp', (req, res) => {
	controller.setItem(req, res);
});

export default router;
