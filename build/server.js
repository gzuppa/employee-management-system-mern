'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('babel-polyfill');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _department = require('./routes/department');

var _department2 = _interopRequireDefault(_department);

var _employee = require('./routes/employee');

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use((0, _morgan2.default)('dev'));
if (process.env.NODE_ENV === 'development') {
    //use logger
    app.use((0, _morgan2.default)('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use((0, _compression2.default)());
}

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.db.uri, _config2.default.db.options).then(connection => {
    const port = process.env.PORT || _config2.default.server.port;
    app.listen(port, () => {
        console.log('Express server listening on %d, in %s mode', port, app.get('env'));
    });
}).catch(error => {
    console.log('ERROR:', error);
});;

const MongoStore = require('connect-mongo')(_expressSession2.default);
app.use((0, _expressSession2.default)({
    saveUninitialized: true,
    resave: true,
    secret: _config2.default.sessionSecret,
    store: new MongoStore({
        mongooseConnection: _mongoose2.default.connection
    })
}));

//add routes


// It has to be placed at the end of all routes
app.get('/', _index2.default);
app.use('/api/user', _user2.default);
app.use('/api/department', _department2.default);
app.use('/api/employee', _employee2.default);
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(_path2.default.resolve('static/index.html'));
});
//# sourceMappingURL=server.js.map