//routes/auth.js
import express from 'express';
import _ from 'lodash';
import controller from '../controllers/user.controller';

let router = express.Router();
router.get('/profile', (req, res) => {
	controller.getProfile(req, res);
});
router.put('/profile', (req, res) => {
	controller.updateProfile(req, res);
});

export default router;
