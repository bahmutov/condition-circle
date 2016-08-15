'use strict';

var log = require('debug')('condition');
var spawn = require('cross-spawn');
var join = require('path').join;

module.exports = function conditionCircle(pluginConfig, weather, cb) {
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

  var script = join(__dirname, '../refs.sh');
  spawn.sync(script, [], { stdio: 'inherit' });

  if (env.CIRCLECI !== 'true') {
    return failure('Missing env.CIRCLECI');
  }

  if (options.branch !== env.CIRCLE_BRANCH) {
    return failure('CircleCi built branch ' + env.CIRCLE_BRANCH +
      ' and not the configured branch ' + options.branch);
  }
  return success();
};
