var log = require('debug')('conditions');

module.exports = function conditionsCircle(pluginConfig, weather, cb) {
  var env = weather.env,
    options = weather.options;
  log('verifying conditions on circle');
  log(options);

  function success() {
    log('success');
    return cb(null);
  }

  function failure(message) {
    log('failure', message);
    return cb(new Error(message));
  }

  return success();
};
