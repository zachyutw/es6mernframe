import axios from 'axios';
import config from '../core/config/config.dev';

const proxyTo = axios.create({baseURL:config.javaBaseUrl,timeout:1000});
export default proxyTo;