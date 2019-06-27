/* Load User Data Access Object */
const UserDao = require('../dao/userDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load User entity */
const User = require('../model/user');

/* load lib to hash password */

const bcrypt = require('bcrypt');

/**
 * User Controller
 */
class UserController {

    constructor() {
        this.userDao = new UserDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Username / Primary Key
     * @params req, res
     * @return entity
     */
    findByUsername(req, res) {
        let username = req.params.username;

        this.userDao.findByUsername(username)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

     /**
     * Get all users
     * @return users
     */
    getAllUsers() {
       return this.userDao.getAllUsers();
    };


    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let user = new User();
        user.username = req.body.username;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;

        return this.userDao.update(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res, userservice) {
        let user = new User();
        let hash = bcrypt.hashSync(req.body.password, 10);
        user.username = req.body.username;
        user.password = hash; // store the hash, not the password
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.schema = user.username;

        return this.userDao.create(user)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Returns true if an entity exists with the given Username / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let username = req.params.username;

        this.userDao.exists(username)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = UserController;