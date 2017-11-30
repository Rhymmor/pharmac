"use strict";
const cluster = require('cluster');

const workersNum = process.env.WORKERS_NUM || 1;

function run_master() {
    if (!cluster.isMaster) { return; }
    for (let i = 0; i < workersNum; i++) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });
}

module.exports = run_master;