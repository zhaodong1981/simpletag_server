/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('db/sqlite.db');

/* Init */
let init = function () {
    //enable foreign key contraints
    db.run("PRAGMA foreign_keys = ON;");
};

module.exports = {
    init: init,
    db: db
};

