const { Pool } = require('pg');
const pool = new Pool();

exports.getPacketData = callback => {
    pool.connect(callback);
};