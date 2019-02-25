import axios from 'axios';
import config from '../core/config/config.dev';
export const springAdminServer = axios.create({ baseURL: config.javaAdminBaseUrl, timeout: 10000 });
const instances = { springServer, authServer, client: { basicClient, longTermTokenControl } };
export default instances;
