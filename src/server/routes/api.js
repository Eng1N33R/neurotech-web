const router = require('express').Router();
const { getPacketData } = require('../controllers/data.js');

router.get('/data', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let group = req.query.group === undefined ? 'day' : req.query.group;
    let epoch = req.query.epoch === undefined ? 0 : parseInt(req.query.epoch);
    getPacketData((err, client, done) => {
        if (err) throw err;
        client.query("SELECT date_trunc($1, (packet).timestamp) AS time, count(*)::int AS packets FROM neurotech.packets WHERE label = 1 AND extract(epoch from (packet).timestamp) > $2 GROUP BY 1 ORDER BY 1", [group, epoch],
            (err, query) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(query.rows));
                client.end()
            }
        );
    });
});

module.exports = router;