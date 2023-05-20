const devJwtSecretKey = '4OfuzUfusPlPoswuTr5fRemIcroduKi3';

function jwtSecretKey() {
  const { JWT_SECRET = devJwtSecretKey } = process.env;
  return JWT_SECRET;
}

module.exports = { jwtSecretKey };
