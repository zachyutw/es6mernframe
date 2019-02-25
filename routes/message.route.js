import express from 'express';
import controller from '../controllers/user.controller';
import ResourcesRoutes from './Routes/resourcesRoutes';
import RESTPlugins from '../services/RESTPlugins';

let router = express.Router()
router.use(RESTPlugins.allFunctionsPlugin);
router = ResourcesRoutes(router, controller);
export default router;