'use strict'

const log = require('debug')('condition')
const spawn = require('cross-spawn')
const join = require('path').join
const safeEnv = require('safe-env')
const SemanticReleaseError = require('@semantic-release/error')

const isToken = (key) => {
  return key.toLowerCase().indexOf('token') !== -1
}

async function conditionCircle (pluginConfig, args) {
  const options = args.options
  const branch = options.branch

  log('verifying conditions on circle')
  log('need environment variables CIRCLECI and CIRCLE_BRANCH')
  log(safeEnv(isToken, options))

  const script = join(__dirname, '../refs.sh')
  spawn.sync(script, [], { stdio: 'inherit' })

  if (process.env.CIRCLECI !== 'true') {
    throw new SemanticReleaseError('Not running on Circle CI')
  }

  const envBranch = process.env.CIRCLE_BRANCH
  if (branch !== envBranch) {
    throw new SemanticReleaseError(
      `CircleCI using '${envBranch}' not configured publish branch (${branch})`
    )
  }
}

module.exports = conditionCircle
