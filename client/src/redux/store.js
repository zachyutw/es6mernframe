import { createStore, applyMiddleware } from 'redux';
import axiosInstanceMiddleware from './middlewares/axiosInstance.middleware';
import reduxActionToolMiddleware from './middlewares/reduxActionTool.middleware';
import epicMiddleware from './middlewares/epic.middleware';
import thunkMiddleware from './middlewares/thunk.middleware';
import loggerMiddleware from './middlewares/logger.middleware';
import reducers from './reducers.js';
import epics from './epics';

export default function configureStore (){
    const store = createStore(
        reducers,
        applyMiddleware(
            axiosInstanceMiddleware,
            reduxActionToolMiddleware,
            thunkMiddleware,
            epicMiddleware
            // loggerMiddleware
        )
    );
    epicMiddleware.run(epics);
    return store;
}
