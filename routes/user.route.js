import express from 'express';
import controller from '../controllers/user.controller';
import ResourcesRoutes from './Routes/resourcesRoutes';

let router = express.Router();

/**! New router path put over here **/

/**! New router path put over here **/
router = ResourcesRoutes(router, controller);
export default router;
