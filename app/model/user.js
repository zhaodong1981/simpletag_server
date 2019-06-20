/**
 * User Entity (ES6 Class)
 */

class User {
    constructor(username, password, firstname, lastname, schema) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.schema = schema;
    }
}

module.exports = User;