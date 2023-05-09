const jwt = require('jsonwebtoken');

module.exports.encode = async function encode(payload) {
  return new Promise(resolve => {
    jwt.sign(payload, process.env.JWT_TOKEN, (err, data) => {
      resolve(err ? null : data);
    });
  });
}

module.exports.decode = async function decode(payload) {
  return new Promise(resolve => {
    jwt.verify(payload, process.env.JWT_TOKEN, (err, data) => {
      resolve(err ? null : data);
    });
  });
}