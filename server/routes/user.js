var express = require('express');
var fs = require("fs");
var path = require('path');
var userController = require('../controllers/user');
var passport = require('passport');
var router = express.Router();


router.post('/signup', userController.signup);
// Set up the 'signin' routes
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/successjson',
  failureRedirect: '/failurejson'
}));
// Set up the 'signout' route
router.get('/signout', userController.signout);
router.get('/successjson', function(req, res) {
  res.sendfile('public/index.htm');
});

router.get('/failurejson', function(req, res) {
  res.json({ message: 'hello' });
});

/* GET userController listing. */
router.get('/', function (req, res, next) {
  userController.list(req, res, next);
  //res.end(userController.list);
});
router.post('/', function (req, res, next) {
  userController.create(req, res, next);
});


// Set up the 'userController' parameterized routes
router.get('/:userId', function (req, res) {
  userController.read(req, res);
  //res.send("update");
})
router.put('/:userId', function (req, res) {
  userController.update(req, res);
  //res.send("read");
})
router.delete('/:userId', function (req, res) {
  userController.delete(req, res);
  //  res.send("delete");
})

// try to get the user details from the User model and attach it to the request object
router.param('userId', userController.userByID);


module.exports = router;
