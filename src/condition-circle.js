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
  const { branches } = options

  log('verifying conditions on circle')
  log('need environment variables CIRCLECI and CIRCLE_BRANCH')
  log(safeEnv(isToken, options))

  const script = join(__dirname, '../refs.sh')
  spawn.sync(script, [], { stdio: 'inherit' })

  if (!process.env.CIRCLECI) {
    throw new SemanticReleaseError('Not running on Circle CI')
  }

  const envBranch = process.env.CIRCLE_BRANCH

  const isValidReleaseBranch = branches.some(({ name }) => name === envBranch)

  if (!isValidReleaseBranch) {
    throw new SemanticReleaseError(
      `CircleCI cannot publish branch "${envBranch}". Valid branches are: "${branches
        .map(({ name }) => name)
        .join('"')}"`
    )
  }
}

module.exports = conditionCircle
