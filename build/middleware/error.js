'use strict';

exports.logErrors = function (err, req, res, next) {
  console.error(err.stack);
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
  next(err);
};

exports.clientErrorHandler = function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: 'Something failed!'
    });
  } else {
    next(err);
  }
};
//# sourceMappingURL=error.js.map