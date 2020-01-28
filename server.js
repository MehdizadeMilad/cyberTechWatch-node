const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dbUrl, dbOptions } = require('./config/keys');


const app = express();
const port = 3000;

// mongoose.connect(dbUrl, dbOptions);

const routes = require('./api/routes');
routes(app);

app.listen(port, function () {
    console.log('Server started listening on port ', port);
});