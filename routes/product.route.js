import express from 'express';
import controller from '../controllers/product.controller';
import ResourcesRoutes from './Routes/resourcesRoutes';

let router = express.Router();
router = ResourcesRoutes(router, controller);
export default router;
