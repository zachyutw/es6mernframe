import express from 'express';
import path from 'path';
import _ from 'lodash';
import {serverPath } from '../server';

let router = express.Router()
router.get('*',(req, res) => {
    const newDirname = serverPath();
    res.sendFile(path.resolve(`${newDirname}/public${req.url}`));
})



export default router;