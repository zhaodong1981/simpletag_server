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
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, username, password, firstname, lastname FROM users WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.username, row.password, row.firstname, row.lastname));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM users";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User(row.id, row.username, row.password, row.firstname, row.lastname));
            }
            return users;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM users";
        return this.common.findOne(sqlRequest);
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
            "WHERE id=$id";

        let sqlParams = {
            $username: User.username,
            $password: User.password,
            $firstname: User.firstname,
            $lastname: User.lastname,
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params User
     * returns database insertion status
     */
    create(User) {
        let sqlRequest = "INSERT into users (username, password, firstname, lastname) " +
            "VALUES ($username, $password, $firstname, $lastname)";
        let sqlParams = {
            $username: User.username,
            $password: User.password,
            $firstname: User.firstname,
            $lastname: User.lastname
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM users WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM users WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;