import axios from 'axios';
import config from '../core/config/config.dev';

const proxyToAuth = axios.create({baseURL:config.authBaseUrl,timeout:1000} );
export const basicClient = {"Authorization":"Basic YWNtZTphY21lc2VjcmV0"}
export default proxyToAuth;