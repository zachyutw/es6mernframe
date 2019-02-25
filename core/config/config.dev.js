import path from 'path';

const PORT = 5000;
let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'mernFrame1';
config.serverPort = process.env.serverPort || PORT;
config.twilio = process.env.twilio || '6f6b83fb780e60152882e4b3fecb11a0';
config.domainName = process.env.domainName || `http://localhost:${PORT}/api/`;
export default config;