'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _issue = require('../routes/issue');

var _issue2 = _interopRequireDefault(_issue);

var _index = require('../routes/index');

var _index2 = _interopRequireDefault(_index);

var _department = require('../routes/department');

var _department2 = _interopRequireDefault(_department);

var _employee = require('../routes/employee');

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

module.exports = function (db) {
    const app = (0, _express2.default)();
    app.use(_express2.default.static('static'));
    app.use(_bodyParser2.default.json());

    //use logger
    app.use((0, _morgan2.default)("dev"));

    //add routes
    // It has to be placed at the end of all routes
    app.get('/', _index2.default);
    app.use('/api/issue', _issue2.default);
    app.use('/api/department', _department2.default);
    app.use('/api/employee', _employee2.default);

    if (process.env.NODE_ENV !== 'production') {
        // import only support top level
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');

        const config = require('../../webpack.config');
        config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());

        const compiler = webpack(config);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true
        }));
        app.use(webpackHotMiddleware(compiler, {
            log: console.log
        }));

        // console.log('Enable webpackDevMiddleware and webpackHotMiddleware');
    }

    return app;
};
//# sourceMappingURL=express.js.map