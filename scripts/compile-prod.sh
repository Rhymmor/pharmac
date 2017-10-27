#!/bin/sh -e

./node_modules/.bin/tsc
./node_modules/.bin/webpack -p --config webpack.config.production.js