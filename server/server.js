import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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
});;


const MongoStore = require('connect-mongo')(session);
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

//add routes
import index from './routes/index';
import user from './routes/user';
import department from './routes/department';
import employee from './routes/employee';

// It has to be placed at the end of all routes
app.get('/', index);
app.use('/api/user', user);
app.use('/api/department', department);
app.use('/api/employee', employee);
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(path.resolve('static/index.html'));
});
