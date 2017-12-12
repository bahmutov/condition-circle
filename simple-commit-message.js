const { promisify } = require('util');
const simpleCommitMessage = require('simple-commit-message');

module.exports = promisify(simpleCommitMessage);

