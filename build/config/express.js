'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _issue = require('../routes/issue');

var _issue2 = _interopRequireDefault(_issue);

var _index = require('../routes/index');

var _index2 = _interopRequireDefault(_index);

var _department = require('../routes/department');

var _department2 = _interopRequireDefault(_department);

var _employee = require('../routes/employee');

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (db) {
    const app = (0, _express2.default)();
    app.use(_express2.default.static('static'));
    app.use(_bodyParser2.default.json());

    if (process.env.NODE_ENV === 'development') {
        //use logger
        app.use((0, _morgan2.default)('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    //add routes
    // It has to be placed at the end of all routes
    app.get('/', _index2.default);
    app.use('/api/issue', _issue2.default);
    app.use('/api/department', _department2.default);
    app.use('/api/employee', _employee2.default);

    return app;
};
//# sourceMappingURL=express.js.map