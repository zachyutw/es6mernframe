import logger from '../core/logger/app-logger';
import _ from 'lodash';
import User from '../models/user.model';

import combineSeed from '../db/seed/combineSeeds';
//inheritance resourceController with Basic CRUD
// class FortuneClass extends ResourcesClass{}
// const controller = new FortuneClass(Fortune);

let controller = {};
const ModelName = "seed function";

controller.clean = async (req,res)=>{
    const name = "clean";
    try{
        User.collection.drop();
        const user = await User.find({});
        // console.log(newDatas)
        logger.info(`clean all Modals posts num:${posts.length} users num:${user.length}...`);
        res.send({message:"clean success"});
    }
    catch(err){
        logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
        res.send(`Got error in ${ModelName} ${name}`);
    }
}
controller.seed = async (req,res)=>{
    const name="seed";
    try{
        combineSeed();
        const user = await User.find({});
        // console.log(newDatas)
        logger.info(`get all Modals posts num:${posts.length} users num:${user.length}...`);
        res.send({message:"seed success"});
    }
    catch(err){
        logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
        res.send(`Got error in ${ModelName} ${name}`);
    }
}


export default controller;


