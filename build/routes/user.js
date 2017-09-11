'use strict';

var express = require('express');
var fs = require("fs");
var path = require('path');
var userController = require('../controllers/user');
var passport = require('passport');
var router = express.Router();

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
});
router.put('/:userId', function (req, res) {
  userController.update(req, res);
  //res.send("read");
});
router.delete('/:userId', function (req, res) {
  userController.delete(req, res);
  //  res.send("delete");
});

// try to get the user details from the User model and attach it to the request object
router.param('userId', userController.userByID);

module.exports = router;
//# sourceMappingURL=user.js.map