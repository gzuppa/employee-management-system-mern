import express from './config/express';
import mongoose from "mongoose";
import config from './config';
import 'babel-polyfill';


const port = process.env.PORT || config.server.port;
const server = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options).then(connection => {
    server.listen(port, () => {
        console.log('Express server listening on %d, in %s mode', port, server.get('env'));
    });
}).catch(error => {
    console.log('ERROR:', error);
});;

