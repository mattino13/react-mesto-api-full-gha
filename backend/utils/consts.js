const OK_HTTP_STATUS = 200;
const CREATED_HTTP_STATUS = 201;
const BAD_REQUEST_HTTP_STATUS = 400;
const UNAUTHORIZED_HTTP_STATUS = 401;
const FORBIDDEN_HTTP_STATUS = 403;
const NOT_FOUND_HTTP_STATUS = 404;
const CONFLICT_HTTP_STATUS = 409;
const COMMON_SERVER_ERROR_STATUS = 500;
const CORS_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const urlRegex = /^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/i;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://mattino13.nomoredomains.monster', 'http://mattino13.nomoredomains.monster'],
  credentials: true,
};

module.exports = {
  OK_HTTP_STATUS,
  CREATED_HTTP_STATUS,
  BAD_REQUEST_HTTP_STATUS,
  UNAUTHORIZED_HTTP_STATUS,
  FORBIDDEN_HTTP_STATUS,
  NOT_FOUND_HTTP_STATUS,
  CONFLICT_HTTP_STATUS,
  COMMON_SERVER_ERROR_STATUS,
  CORS_ALLOWED_METHODS,
  urlRegex,
  corsOptions,
};
