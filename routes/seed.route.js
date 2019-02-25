import express from 'express';
import controller from '../controllers/seed.controller';
let router = express.Router()
router.get('/node/clean',(req, res) => {
    controller.clean(req,res);
})
router.get('/node/seed',(req,res)=>{
    controller.seed(req,res);
})

export default router;