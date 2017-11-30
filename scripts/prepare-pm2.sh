#!/bin/sh -e

DIR="node_modules/pm2/node_modules/ts-node"

if [ ! -d ${DIR} ]; then
    ./node_modules/.bin/pm2 install typescript
fi