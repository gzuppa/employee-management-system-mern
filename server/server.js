import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import compression from 'compression';
import mongoose from "mongoose";
import config from './config';
import 'babel-polyfill';


import index from './routes/index';
import user from './routes/user';
import department from './routes/department';
import employee from './routes/employee';


const port = process.env.PORT || config.server.port;
// const server = express();

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    //use logger
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

//add routes
// It has to be placed at the end of all routes
app.get('/', index);
app.use('/api/user', user);
app.use('/api/department', department);
app.use('/api/employee', employee);


mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options).then(connection => {
    app.listen(port, () => {
        console.log('Express server listening on %d, in %s mode', port, app.get('env'));
    });
}).catch(error => {
    console.log('ERROR:', error);
});;

