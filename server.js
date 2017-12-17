const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    config = require('./src/server/config/config.js');

require('dotenv').config();

const apiRouter = require('./src/server/routes/api.js');

const app = express();
app.use(express.static(path.join(__dirname, '/dist/')));
app.use('/api', apiRouter);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// start the server
app.listen(config.port, () => {
    console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
