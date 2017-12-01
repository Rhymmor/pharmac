#!/bin/sh -e

export BABEL_ENV=production
./node_modules/.bin/webpack --config webpack.config.production.js