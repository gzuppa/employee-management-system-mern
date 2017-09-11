'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();
var passport = require('passport');

var user = require('../controllers/user');

router.post('/signup', user.signup);
// Set up the 'signin' routes
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));
// Set up the 'signout' route
router.get('/signout', user.signout);

module.exports = router;
//# sourceMappingURL=index.js.map