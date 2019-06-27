/* Load User entity */
const User = require('../model/user');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * User Data Access Object
 */
class UserDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its username / Primary Key
     * @params username
     * @return entity
     */
    findByUsername(username) {
        let sqlRequest = "SELECT username, firstname, lastname, schema FROM users WHERE username=$username";
        let sqlParams = {$username: username};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.username, '', row.firstname, row.lastname,row.schema));
    };

     /**
     * Find all users
     * @params 
     * @return all users
     */
    getAllUsers() {
        let sqlRequest = "SELECT username, password, firstname, lastname, schema FROM users";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User(row.username, row.password, row.firstname, row.lastname,row.schema));
            }
            return users;
           
        });
    };


    /**
     * Updates the given entity in the database
     * @params User
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(User) {
        let sqlRequest = "UPDATE users SET " +
            "username=$username, " +
            "password=$password, " +
            "firstname=$firstname, " +
            "lastname=$lastname " +
            "WHERE username=$username";

        let sqlParams = {
            $username: User.username,
            $password: User.password,
            $firstname: User.firstname,
            $lastname: User.lastname
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params User
     * returns database insertion status
     */
    create(User) {
        let sqlRequest = "INSERT into users (username, password, firstname, lastname,schema) " +
            "VALUES ($username, $password, $firstname, $lastname,$schema)";
        let sqlParams = {
            $username: User.username,
            $password: User.password,
            $firstname: User.firstname,
            $lastname: User.lastname,
            $schema: User.schema + '_'
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given username / Primary Key
     * @params username
     * returns database entry existence status (true/false)
     */
    exists(username) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM users WHERE username=$username";
        let sqlParams = {$username: username};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;