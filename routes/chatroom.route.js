import express from 'express';
import controller from '../controllers/chatroom.controller';
import ResourcesRoutes from './Routes/resourcesRoutes';
import RESTPlugins from '../services/RESTPlugins';
import authorize from '../services/authorize';
let router = express.Router();

router.post('/item', authorize.authorized, (req, res) => {
	controller.createChatroom(req, res);
});
router.delete('/item/:id?', authorize.authorized, (req, res) => {
	controller.removeChatroom(req, res);
});
router.get('/list/my', authorize.authorized, (req, res) => {
	controller.getMyChatroom(req, res);
});
//! New router sould be above resourcesRoutes
//* The request will go to the top route first
router = ResourcesRoutes(router, controller);
export default router;
