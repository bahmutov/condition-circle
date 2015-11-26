var log = require('debug')('conditions');

module.exports = function conditionsCircle(pluginConfig, weather, cb) {
  var env = weather.env,
    options = weather.options;
  log('verifying conditions on circle');
  log(options);

  function success() {
    return cb(null;)
  }

  function failure(message) {
    return cb(new Error(message));
  }

  return success();
};
