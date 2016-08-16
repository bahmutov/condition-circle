# condition-circle

> Checks CircleCI environment before publishing successful build using semantic-release

Inspired by [condition-travis](https://github.com/semantic-release/condition-travis)

[![NPM][npm-icon] ][npm-url]

[![Circle CI][ci-badge] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)

[npm-icon]: https://nodei.co/npm/condition-circle.svg?downloads=true
[npm-url]: https://npmjs.org/package/condition-circle
[ci-badge]: https://circleci.com/gh/bahmutov/condition-circle.svg?style=svg
[ci-url]: https://circleci.com/gh/bahmutov/condition-circle
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

You can read the [step by step guide](HOW.md) guide to setting up semantic-release with
CircleCI (not just configuring this plugin).

## Install and configure

    npm install --save-dev condition-circle

Add the following to the `package.json`

```json
"release": {
  "verifyConditions": "condition-circle"
}
```

This tells [semantic-release plugins](https://github.com/semantic-release/semantic-release#plugins)
to use this package to verify the environment to make sure we are running on
[CircleCI](https://circleci.com).

Create `circle.yml` file and add post test command. Make sure to ignore its output -
if there is no new release to be published, the build is still ok.

```yaml
machine:
  node:
    version: "0.12"
test:
  override:
    - npm test
  post:
    - npm run semantic-release || true
```

## Advanced

If you want to see the log messages from this plugin when it verifies the environment,
use the following command.

```yaml
post:
  - DEBUG=condition npm run semantic-release || true
```

If you want to see all messages from the semantic-release module as it runs,
set the environment variable `npm_config_loglevel=verbose` because semantic release
uses NPM logger module.

## Advanced debug

To try running this module from the command line without releasing anything

1. Edit `package.json`, set `release.debug` flag to `true`
2. Execute command

```sh
CIRCLECI=true CIRCLE_BRANCH=master DEBUG=condition \
  npm_config_loglevel=verbose npm run semantic-release
```

## Related

* [condition-node-version](https://github.com/bahmutov/condition-node-version) is my
  plugin for only releasing to NPM from specific Node version.

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/condition-circle/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
