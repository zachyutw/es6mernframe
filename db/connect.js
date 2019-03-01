import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';

Mongoose.Promise = global.Promise;
Mongoose.set('useFindAndModify', false);
const connectToDb = async () => {
    let mongoDBConnection = config.mongoDBConnection;
    try {
        await Mongoose.connect(mongoDBConnection, { useCreateIndex: true, useNewUrlParser: true });
        logger.info('Connected to mongo!!!');
        // combineSeeds();
    } catch (err) {
        logger.error('Could not connect to MongoDB');
    }
};

export default connectToDb;
