const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.jwt;

function assignToken(data) {
  return jwt.sign(data, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

const checkToken = {
  confirmToken: (req) => {
    const decrypted = decryptHeader(req);
  },
};

function decryptHeader(req) {
  const autho = req.headers.authorization || '';
  const token = getToken(autho);
  const decrypted = verifyToken(token);

  req.user = decrypted;
  return decrypted;
}

function getToken(auth) {
  if (!auth) {
    throw new Error('Token not existent');
  }

  if (auth.indexOf('Bearer') === -1) {
    throw new Error('Invalid Format');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

module.exports = {
  assignToken,
  checkToken,
};
