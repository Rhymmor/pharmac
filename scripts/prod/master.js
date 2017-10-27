"use strict";
const cluster = require('cluster');
const {cpus} = require('os');

function run_master() {
    if (!cluster.isMaster) { return; }
    for (let i = 0; i < cpus().length; i++) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });
}

module.exports = run_master;