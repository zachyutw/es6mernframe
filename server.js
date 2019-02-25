import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import logger from './core/logger/app-logger';
import morgan from 'morgan';
import config from './core/config/config.dev';
import connectToDb from './db/connect';
import path from 'path';
import socketIo from './services/socketIo';
import Passport from './services/passport';
import combineRoutes from './routes/combineRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptionsDelegate } from './services/cors.service';
import expressStaticGzip from 'express-static-gzip';
import compression from 'compression';
let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
dotenv.load();
console.log(process.env.domainName);
//? generatro a path which always pooint to corrent root directoriy
export const serverPath = () =>
    __dirname.indexOf('/dist') > 0 ? __dirname.slice(0, __dirname.indexOf('/dist')) : __dirname;
const jwtSecrect = 'lasfu';
//* passport setup
const port = config.serverPort;
logger.stream = {
    write: function (message, encoding){
        // console.log(encoding);
        logger.info(message);
    }
};
// connectToDb();
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));
app.use(
    cookieSession({
        //! d    hh    mm  ss
        maxAge: 1 * 24 * 60 * 60 * 1000,
        keys: jwtSecrect
    })
);

Passport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));

combineRoutes(app);

const serverPathUrl = serverPath();

app.use('/', express.static(path.resolve(serverPathUrl, 'client', 'build'), { maxAge: oneYear }));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(serverPathUrl, 'client', 'build', 'index.html'));
});
// app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
const sslOptions = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cer')
};
// const server = https.createServer(sslOptions, app);

const server = http.createServer(app);
server.listen(port, () => {
    logger.info('server started - ', port);
});
