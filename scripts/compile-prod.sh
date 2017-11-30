#!/bin/sh -e

./node_modules/.bin/tsc
export BABEL_ENV=production
./node_modules/.bin/webpack --config webpack.config.production.js