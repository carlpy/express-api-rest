const responses = require('./responses');

function errors(err, req, res, next) {
  console.error('[error: ', err);

  const msg = err.message || 'Internal server error';
  const status = err.statusCode || 500;

  responses.error(req, res, status, msg);
}

module.exports = errors;
