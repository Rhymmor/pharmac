#!/bin/sh -e
set -e

export BABEL_ENV=production
alias babel='./node_modules/.bin/babel'
alias uglifyjs='./node_modules/.bin/uglifyjs'
prefix=./browser-bundle

echo "recompiling $prefix to ES5 and minifying"

process() {
    file=$prefix/$1.js
    echo "processing $file"
    cp $file $file.orig
    babel $file | uglifyjs > $file.compiled
    mv $file.compiled $file
    rm $file.map || true
}

process app
process vendor

