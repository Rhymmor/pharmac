"use strict";
const cluster = require('cluster');
const run_master = require('./master');
const run_fork = require('./master');

process.env.NODE_ENV = 'production';

if (cluster.isMaster) {
  run_master();
} else {
  run_fork();
}