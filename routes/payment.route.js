import express from 'express';
import faker from 'faker';
import _ from 'lodash';
let router = express.Router();
router.use(RESTPlugins.allFunctionsPlugin);
router.get('/node/serialId',(req, res) => {
    res.send({serialId:faker.finance.bitcoinAddress()});
});
router.get('/node/gst',(req, res) => {
    res.send({gst:0.05});
});
router.get('/node/pst',(req, res) => {
    res.send({pst:0.02});
});
export default router;