# Quasar App

> A Quasar project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint

```
## Mobile

``` bash
# in folder
$ cd cordova

# install oAuth autenthication for mobile
$ cordova plugin add https://github.com/oauth-io/oauth-phonegap

# add android platform
$ cordova platform add android

# build project
$ quasar build

# run project in android device
$ cordova run
