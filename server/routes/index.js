import express from 'express';
const router = express.Router();
var passport = require('passport');

var user = require('../controllers/user');

router.get('/', (req, res) => {
  console.log('route to no where');
  res.sendFile(path.resolve('static/index.html'));
});


router.route('/signup').post(user.signup);

// Set up the 'signin' routes
router.route('/signin').post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));

// Set up the 'signout' route
router.get('/signout', user.signout);
module.exports = router;
