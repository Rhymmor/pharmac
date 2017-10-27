#!/bin/sh -e

./node_modules/.bin/tsc
./node_modules/.bin/webpack --config webpack.config.production.js