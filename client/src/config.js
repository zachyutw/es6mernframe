import enJson from './locales/en.locale.json';
import zhJson from './locales/zh.locale.json';
import routePaths from './router/routePaths';
const config = {};
export const baseUrl = 'http://localhost:5000/api';

export const i18next = {
    lng: 'zh',
    debug: true,
    fallbackLng: [ 'en', 'zh' ],
    resources: {
        en: enJson,
        zh: zhJson
    }
};
config.i18next = i18next;
config.routePaths = routePaths;
export default config;
