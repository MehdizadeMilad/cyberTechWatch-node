const express = require('express');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const { dbUrl, dbOptions } = require('./config/keys').mongo;
mongoose.connect(dbUrl, dbOptions, (err, con) => {
    if (err)
        console.log('Error Connecting to mongo instance!', err);
    else
        console.log('Mongo Connected');
});


// const mysql = require('mysql');
// const { host, user, password } = require('./config/keys').mysql;

// const con = mysql.createConnection({
//     host, user, password
// });

// con.connect(function(err) {
//     if(err) throw new Error('Db Connection Failed');
//     console.log('DB Connected');
// });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

const routes = require('./api/routes');
routes(app);

app.listen(port, function () {
    console.log('Server started listening on port ', port);
});