"use strict";
const lodash_1 = require("lodash");
function getTimelineSummary(clients, servers) {
    let res = {
        clients: [],
        servers: []
    };
    const num_clients = clients.length;
    const num_servers = servers.length;
    res.clients = lodash_1.map(clients, (timeline_obj) => {
        let summary = {
            cpu_load_max: 0,
            if_load_rx_max: 0,
            if_load_tx_max: 0,
            requests_total: 0,
            connections_total: 0,
            responses_total: {
                resp_1xx: 0,
                resp_2xx: 0,
                resp_3xx: 0,
                resp_4xx: 0,
                resp_5xx: 0
            },
            errors_total: 0,
            cycles_per_sec_avg: 0,
            requests_per_sec_max: 0,
            requests_per_sec_avg: 0,
            connections_per_sec_max: 0,
            connections_per_sec_avg: 0,
            delay_avg: 0,
            total_rx_bytes: 0,
            total_rx_packets: 0,
            total_tx_bytes: 0,
            total_tx_packets: 0,
            current_virtual_clients: 0,
            max_seen_virtual_clients: 0,
            max_virtual_clients: 0,
            nstat_total: {},
        };
        const timeline = timeline_obj.data;
        const llen = timeline.length;
        if (llen > 0) {
            const timeline_protocol = timeline[0].interval.http ? 'http' : 'https';
            const max_requests = lodash_1.maxBy(timeline, (o) => { return o.interval[timeline_protocol].requests; });
            const req_per_sec_sum = lodash_1.sumBy(timeline, (o) => { return o.interval[timeline_protocol].requests; });
            const req_per_sec_time = lodash_1.sumBy(timeline, (o) => { return o.interval.delta_time; });
            const max_connections = lodash_1.maxBy(timeline, (o) => { return o.interval[timeline_protocol].connections; });
            const conn_per_sec_sum = lodash_1.sumBy(timeline, (o) => { return o.interval[timeline_protocol].connections; });
            const conn_per_sec_time = lodash_1.sumBy(timeline, (o) => { return o.interval.delta_time; });
            summary.cpu_load_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.cpu.load_total; }).sysinfo.cpu.load_total);
            summary.if_load_rx_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.network.stats.rx_sec; }).sysinfo.network.stats.rx_sec * 8 / 1024 / 1024);
            summary.if_load_tx_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.network.stats.tx_sec; }).sysinfo.network.stats.tx_sec * 8 / 1024 / 1024);
            summary.requests_total = timeline[llen - 1].total[timeline_protocol].requests;
            summary.connections_total = timeline[llen - 1].total[timeline_protocol].connections;
            summary.responses_total.resp_1xx = timeline[llen - 1].total[timeline_protocol].resp_1xx;
            summary.responses_total.resp_2xx = timeline[llen - 1].total[timeline_protocol].resp_2xx;
            summary.responses_total.resp_3xx = timeline[llen - 1].total[timeline_protocol].resp_3xx;
            summary.responses_total.resp_4xx = timeline[llen - 1].total[timeline_protocol].resp_4xx;
            summary.responses_total.resp_5xx = timeline[llen - 1].total[timeline_protocol].resp_5xx;
            summary.errors_total = timeline[llen - 1].total[timeline_protocol].other_errors;
            summary.cycles_per_sec_avg = timeline[llen - 1].total.caps;
            summary.requests_per_sec_max = lodash_1.round(max_requests.interval.delta_time === 0 ? max_requests.interval[timeline_protocol].requests : max_requests.interval[timeline_protocol].requests * 1000 / max_requests.interval.delta_time);
            summary.requests_per_sec_avg = req_per_sec_time === 0 ? req_per_sec_sum : lodash_1.round(req_per_sec_sum * 1000 / req_per_sec_time);
            summary.connections_per_sec_max = lodash_1.round(max_connections.interval.delta_time === 0 ? max_connections.interval[timeline_protocol].connections : max_connections.interval[timeline_protocol].connections * 1000 / max_connections.interval.delta_time);
            summary.connections_per_sec_avg = conn_per_sec_time === 0 ? conn_per_sec_sum : lodash_1.round(conn_per_sec_sum * 1000 / conn_per_sec_time);
            summary.delay_avg = timeline[llen - 1].total[timeline_protocol].delay;
            summary.total_rx_bytes = timeline[llen - 1].sysinfo.network.stats.rx_diff;
            summary.total_rx_packets = timeline[llen - 1].sysinfo.network.stats.rx_packets_diff;
            summary.total_tx_bytes = timeline[llen - 1].sysinfo.network.stats.tx_diff;
            summary.total_tx_packets = timeline[llen - 1].sysinfo.network.stats.tx_packets_diff;
            summary.current_virtual_clients = timeline[llen - 1].total.current_clients;
            summary.max_seen_virtual_clients = lodash_1.maxBy(timeline, (o) => { return o.total.current_clients; }).total.current_clients;
            summary.max_virtual_clients = timeline[llen - 1].total.max_clients;
            summary.nstat_total = timeline[llen - 1].sysinfo.network.stats.nstat_diff;
        }
        ;
        return summary;
    });
    res.servers = lodash_1.map(servers, (timeline_obj) => {
        let summary = {
            cpu_load_max: 0,
            if_load_rx_max: 0,
            if_load_tx_max: 0,
            total_rx_bytes: 0,
            total_rx_packets: 0,
            total_tx_bytes: 0,
            total_tx_packets: 0,
            nstat_total: {}
        };
        const timeline = timeline_obj.data;
        const rlen = timeline.length;
        if (rlen > 0) {
            summary.cpu_load_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.cpu.load_total; }).sysinfo.cpu.load_total);
            summary.if_load_rx_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.network.stats.rx_sec; }).sysinfo.network.stats.rx_sec * 8 / 1024 / 1024);
            summary.if_load_tx_max = lodash_1.round(lodash_1.maxBy(timeline, (o) => { return o.sysinfo.network.stats.tx_sec; }).sysinfo.network.stats.tx_sec * 8 / 1024 / 1024);
            summary.total_rx_bytes = timeline[rlen - 1].sysinfo.network.stats.rx_diff;
            summary.total_rx_packets = timeline[rlen - 1].sysinfo.network.stats.rx_packets_diff;
            summary.total_tx_bytes = timeline[rlen - 1].sysinfo.network.stats.tx_diff;
            summary.total_tx_packets = timeline[rlen - 1].sysinfo.network.stats.tx_packets_diff;
            summary.nstat_total = timeline[rlen - 1].sysinfo.network.stats.nstat_diff;
        }
        return summary;
    });
    return res;
}
exports.getTimelineSummary = getTimelineSummary;
//# sourceMappingURL=timeline.js.map