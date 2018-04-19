const router = require('express').Router();
const config = require('../config/config.js');

const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});
// disable automatic time zone adjustment (seriously?)
pgp.pg.types.setTypeParser(1114, str => moment.utc(str).format());

const moment = require('moment-timezone');

router.get('/stats/:mode', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let query = {
        from: String(moment().subtract(1, 'days').unix()),
        to: String(moment().unix()),
        size: 1,
        unit: 'hour',
        mode: 'all',
    }

    if (req.params.mode !== undefined) query.mode = req.params.mode;
    if (req.query.from !== undefined) query.from = req.query.from;
    if (req.query.to !== undefined) query.to = req.query.to;
    if (req.query.resolution !== undefined) {
        let comps = req.query.resolution.split(' ');
        query.size = parseInt(comps[0]);
        query.unit = comps[1];
    }

    if (query.mode === 'both') {
        query.mode = pgp.as.format("healthy::integer as healthy, abnormal::integer as abnormal");
    } else {
        switch (query.mode) {
            case 'healthy':
                query.mode = 'healthy';
                break;
            case 'abnormal':
                query.mode = 'abnormal';
                break;
            case 'all':
                query.mode = 'healthy+abnormal';
                break;
            default:
                res.status(404);
                res.send('unknown query mode');
                return;
        }
        query.mode = pgp.as.format("($1^)::integer as packets", [query.mode]);
    }

    db.any("select start_time as time, ${mode^} from group_packets(to_timestamp(${from}) at time zone 'UTC', to_timestamp(${to}) at time zone 'UTC', ${size}::integer, ${unit}::varchar);", query)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        })
        .catch(function (err) {
            console.log(err);
        });
});

function sendJson(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}

router.get('/judge/monitor/graph/:n', function (req, res, next) {
    sendJson(res, { woozy: req.params.n > config.limits.monitor.graph.woozy, sick: req.params.n > config.limits.monitor.graph.sick });
});
router.get('/judge/monitor/timeline/:n', function (req, res, next) {
    sendJson(res, { woozy: req.params.n > config.limits.monitor.timeline.woozy, sick: req.params.n > config.limits.monitor.timeline.sick });
});
router.get('/judge/statistics/graph/:n', function (req, res, next) {
    sendJson(res, { woozy: req.params.n > config.limits.statistics.graph.woozy, sick: req.params.n > config.limits.statistics.graph.sick });
});
router.get('/judge/statistics/table/:n', function (req, res, next) {
    sendJson(res, { woozy: req.params.n > config.limits.statistics.table.woozy, sick: req.params.n > config.limits.statistics.table.sick });
});

router.get('/limits/monitor/graph', function (req, res, next) {
    sendJson(res, { woozy: config.limits.monitor.graph.woozy, sick: config.limits.monitor.graph.sick });
});
router.get('/limits/monitor/timeline', function (req, res, next) {
    sendJson(res, { woozy: config.limits.monitor.timeline.woozy, sick: config.limits.monitor.timeline.sick });
});
router.get('/limits/statistics/graph', function (req, res, next) {
    sendJson(res, { woozy: config.limits.statistics.graph.woozy, sick: config.limits.statistics.graph.sick });
});
router.get('/limits/statistics/table', function (req, res, next) {
    sendJson(res, { woozy: config.limits.statistics.table.woozy, sick: config.limits.statistics.table.sick });
});

router.get('/geodata/aggregated', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    db.any("select latitude, longitude, count(*) from geodata group by latitude, longitude;")
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        })
        .catch(function (err) {
            console.log(err);
        });
})

/*router.get('/judge', function (req, res, next) {
    woozyN = (x) => (97*x/282 + 440/47);
    sickN = (x) => (25*x/12);

});*/

module.exports = router;