/**
 * User Entity (ES6 Class)
 */

class User {
    constructor(id, username, password, firstname, lastname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

module.exports = User;