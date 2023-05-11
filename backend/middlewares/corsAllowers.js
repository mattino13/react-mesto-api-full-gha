const { CORS_ALLOWED_METHODS } = require('../utils/consts');

function allowSimpleCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  next();
}

function allowPreflightCors(req, res, next) {
  const requestHeaders = req.headers['access-control-request-headers'];

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', CORS_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
}

module.exports = { allowSimpleCors, allowPreflightCors };
