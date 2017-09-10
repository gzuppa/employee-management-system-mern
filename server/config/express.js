import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import compression from 'compression';
import path from 'path';


import index from '../routes/index';
import user from '../routes/user';
import department from '../routes/department';
import employee from '../routes/employee';

module.exports = function (db) {
    const app = express();
    app.use(express.static('static'));
    app.use(bodyParser.json());

    console.log('process.env.NODE_ENV',process.env.NODE_ENV );
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

    return app;
}
