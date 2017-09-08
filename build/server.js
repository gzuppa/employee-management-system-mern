'use strict';

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
// import mongoose from './config/mongoose';


_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.db.uri, _config2.default.db.options).then(connection => {
    app.listen(_config2.default.server.port, () => {
        // console.log('App started on port ' + config.server.port);
    });
}).catch(error => {
    console.log('ERROR:', error);
});;
//# sourceMappingURL=server.js.map