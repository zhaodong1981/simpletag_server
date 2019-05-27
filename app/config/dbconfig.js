/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init car and driver tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists car (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " maker TEXT," +
        " model TEXT," +
        " year INT," +
        " driver INT" +
        ")");

    db.run("CREATE TABLE if not exists driver (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " firstName TEXT," +
        " lastName TEXT," +
        " car INT" +
        ")");

    db.run("CREATE TABLE if not exists users (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " username TEXT," +
        " password TEXT," +
        " firstName TEXT," +
        " lastName TEXT" +
        ")");

    db.run("CREATE TABLE if not exists links (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " users.id FOREIGN KEY," +
        " title TEXT," +
        " description TEXT," +
        " createdate TEXT," +
        " modifydate TEXT" +
        ")");

    db.run("CREATE TABLE if not exists tag-link (" +
        "tag TEXT," +
        " links.id FOREIGN KEY PRIMARY KEY (tag, links.id)" +
        ")");
};

module.exports = {
    init: init,
    db: db
};

