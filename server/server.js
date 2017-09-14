import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import compression from 'compression';
import mongoose from "mongoose";
import passport from "passport";
import initPassport from "./passport";
import config from './config';
import path from "path";
import 'babel-polyfill';


initPassport();
const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());

// enable server cors mode
const cors = require('./middleware/cors');
app.use(cors);

app.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') {
    //use logger
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, config.db.options).then(connection => {
    const port = process.env.PORT || config.server.port;
    app.listen(port, () => {
        console.log('Express server listening on %d, in %s mode', port, app.get('env'));
    });
}).catch(error => {
    console.log('ERROR:', error);
});
// mongoose.set('debug', true);

const auth = require('./routes/auth');
app.use('/auth', auth);


import user from './routes/user';
import department from './routes/department';
import employee from './routes/employee';

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);
app.use('/api/user', user);
app.use('/api/department', department);
app.use('/api/employee', employee);
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(path.resolve('static/index.html'));
});
