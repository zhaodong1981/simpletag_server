/**
 * User Entity (ES6 Class)
 */

class User {
    constructor(id, username, password, firstname, lastname, schema) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.schema = schema;
    }
}

module.exports = User;