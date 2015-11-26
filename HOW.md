# How to setup semantic release on Circle CI
> How to use CircleCI to publish new versions of your NPM modules.

There [are problems](https://github.com/semantic-release/cli/issues/69)
currently with Travis CI due to DDoS attacks, and my favorite new process while working with NodeJS is
[not working](https://github.com/semantic-release/semantic-release/issues/134).
I would like to be able to use [CircleCI](https://circleci.com);
a very fast and intuitive continuous integration service, to unit
test and publish new versions of my modules automatically using
[semantic-release](https://github.com/semantic-release/semantic-release) service.

Here is step by step guide how to do this

## Semantic-release setup

You need to install the command line tool first

    npm install -g semantic-release-cli

Now from your project, run it in setup mode. Answer questions, like
NPM username, GitHub authentication, etc. At the last question "What CI are you using?"
pick option "Other (print tokens)". You will see something like this

    $ semantic-release-cli setup
    ? Is the GitHub repository private? No
    ? What is your npm registry? http://registry.npmjs.org/
    ? What is your npm username? bahmutov
    ? What is your npm email? gleb.bahmutov@gmail.com
    ? What is your GitHub username? bahmutov
    ? What is your GitHub two-factor authentication code? 739958
    ? What CI are you using? Other (prints tokens)

    ----------------------------------------------
    GH_TOKEN=84b15...
    NPM_TOKEN=457d4b8...
    ----------------------------------------------

Note: the setup step *removes the version property from your package.json*. To avoid constant
NPM warnings, I follow Kent C. Dodds' [advice](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-automating-releases-with-semantic-release)
and add back a placeholder property in your `package.json` file

```json
{
  "version": "0.0.0-semantic-release"
}
```

## CircleCI setup

* Add your project to CircleCI (typical series of steps, just like any other CI).
  Then open the "Project Settings" and select tab "Environment variables". Usually
  the direct url for this tab is something like
  `https://circleci.com/gh/<username>/<project name>/edit#env-vars`

* Add 2 new environment variables - the tokens you got in the previous step.

* Add `circle.yml` file to your project with `post test` command to run the
  `semantic-release` NPM script. See directions in the next step.

## Tell semantic-release to use condition-circle plugin

By default, semantic-release uses [condition-travis](https://github.com/semantic-release/condition-travis)
module to verify that it is running on Travis CI before publishing to NPM.
We need to use a different `verifyConditions`
[plugin](https://github.com/semantic-release/semantic-release#plugins) to check CircleCI
environment instead. Luckily, I wrote `condition-circle` you can use ;)

It is very simple to setup, just follow the directions in
[condition-circle](https://github.com/bahmutov/condition-circle#install-and-configure)

## Finally

Don't forget to add the [semantic-release badge](https://github.com/semantic-release/semantic-release#badge)
to your README; let everyone know there is some system to the
[semver madness](https://www.youtube.com/watch?v=tc2UgG5L7WM&index=6&list=PLFZ5NyC0xHDaaTy6tY9p0C0jd_rRRl5Zm)!
