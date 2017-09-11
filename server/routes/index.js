import express from 'express';
const router = express.Router();
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
