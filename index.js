
//make node.js require relative to your project root
//https://www.npmjs.com/package/rootpath
require('rootpath')();

/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Database configuration */
const database = require('app/config/dbconfig');

const cors = require('cors');

const jwt = require('./app/utils/jwt');
const errorHandler = require('./app/utils/error-handler');

/* Init database */
database.init();

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/router'));

// global error handler
app.use(errorHandler);

/* Init server listening */
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});
