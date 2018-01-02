const router = require('express').Router();

const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

const moment = require('moment');

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
    if (req.query.to !== undefined) query.from = req.query.from;
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

module.exports = router;