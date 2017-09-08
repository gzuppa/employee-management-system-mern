'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/', (req, res) => {
  console.log('route to no where');
  res.sendFile(path.resolve('static/index.html'));
});

module.exports = router;
//# sourceMappingURL=index.js.map