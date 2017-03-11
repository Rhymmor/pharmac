trex-web
========

Management web application for TRex

### Quickstart

    npm install

    echo "compiling web"
    ./node_modules/.bin/webpack

    echo "compiling server"
    ./node_modules/.bin/tsc

    # running server
    ./bin/trex-web

    # open http://localhost:3000

### Development
development mode uses webpack-dev-server.

    # runs server on port http://localhost:8080
    npm run-script dev
    # open http://localhost:8080/webpack-dev-server/

### Tests

    npm test

### Production build

    ./node_modules/.bin/tsc
    ./node_modules/.bin/webpack --config webpack.config.production.js
    echo "remove dev dependencies not used in the final build"
    npm prune --production
    echo "ready to bundle"

### Webpack analyzer

    webpack --env production --profile --json | grep -v 'ts-loader: Using typescript' | jq '.children[0]' > stats.json
    echo "running analyzer web app"
    webpack-bundle-analyzer stats.json
    echo "alternative analyzer:"
    echo "http://webpack.github.io/analyse/"

