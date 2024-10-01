exports.success = function (req, res, status = 200, message = 'Success') {
  res.status(status).json({
    error: false,
    status,
    body: message,
  });
};

exports.error = function (req, res, status = 500, message = 'Internal Error') {
  res.status(status).json({
    error: true,
    status,
    body: message,
  });
};
