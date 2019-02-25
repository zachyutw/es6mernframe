import auth from './auth.route';
import user from './user.route';
import seed from './seed.route';
import publicFiles from './publicFiles.route';
import googleMap from './googleMap.route';
import asset from './asset.route';
import chatroom from './chatroom.route';
import account from './account.route';
import product from './product.route';
import RESTPlugins from '../services/RESTPlugins';
import authorize from '../services/authorize';
import inboxEmail from './inboxEmail.route';
import { errorRes } from '../controllers/Controller/resoruceContorller';

const apiVersion = '';
/**
 *
 *
 * @param {*} app express
 */
const combineRoutes = (app) => {
	app.use(`/api${apiVersion}/chatroom`, RESTPlugins.allFunctionsPlugin, chatroom);
	app.use(`/api${apiVersion}/auth`, RESTPlugins.allFunctionsPlugin, auth);
	app.use(`/api${apiVersion}/user`, RESTPlugins.allFunctionsPlugin, user);
	app.use(`/api${apiVersion}/product`, RESTPlugins.allFunctionsPlugin, product);
	app.use(`/api${apiVersion}/account`, RESTPlugins.allFunctionsPlugin, authorize.authorized, account);
	app.use(`/api${apiVersion}/inboxEmail`, inboxEmail);
	app.use(`/api${apiVersion}/seed`, seed);
	app.use(`/api${apiVersion}/public`, publicFiles);
	app.use(`/api${apiVersion}/googleMap`, googleMap);
	app.use(`/api${apiVersion}/asset`, asset);
	app.use(`/api${apiVersion}/*`, function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		errorRes(res, 404, 'Not Found');
		next(err);
	});
};

export default combineRoutes;
