import express from './config/express';
// import mongoose from './config/mongoose';
import mongoose from "mongoose";
import config from './config';
import 'babel-polyfill';


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options).then(connection => {
    app.listen(config.server.port || 80, () => {
        // console.log('App started on port ' + config.server.port);
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}).catch(error => {
    console.log('ERROR:', error);
});;
