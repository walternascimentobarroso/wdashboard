const { isDeepStrictEqual } = require('node:util');

function isEqual(a, b) {
  return isDeepStrictEqual(a, b);
}

module.exports = isEqual;
module.exports.default = isEqual;
