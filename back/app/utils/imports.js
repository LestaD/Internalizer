var path = require('path');

module.exports = function(root) {
  global.imports = function(package) {
    return require(path.join(root, 'app', package));
  };

  global.root = function(package) {
    return require(path.join(root, package));
  }
};