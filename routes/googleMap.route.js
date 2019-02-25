import express from 'express';

import ResourcesRoutes from './Routes/resourcesRoutes';
import _ from 'lodash';
import {googleMapGeocode,convertPostAddress} from '../services/googleMap';

let router = express.Router()
router.post('/node/searchGeoInfo', async (req, res) => { 
    console.log(req.body)
    const {description=""} = req.body;   
    const results  = await googleMapGeocode(description);
    const post = convertPostAddress(results);
    if(!_.isEmpty(post)){
        res.send({message:"test Success",post});
    }
    else{
        res.status(200).send({message:"no data avaiable",post:{}});
    }
    
});
export default router;