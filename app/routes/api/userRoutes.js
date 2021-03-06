/* Load Modules */
const express = require('express');
const router = express.Router();
const userService = require('../../utils/user.service');

/* Load controller */
const UserController = require('../../controller/userController');
const userController = new UserController();

router.get('/exists/:username', function (req, res) {
    userController.exists(req, res);
});

router.get('/:username', function (req, res) {
    userController.findByUsername(req, res);
});

router.put('/:username', function (req, res) {
    userController.update(req, res);
});

router.post('/create', function (req, res) {
    userController.create(req, res, userService);
});

router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
    userController.getAllUsers().then(users => userService.authenticate(users,req.body))
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports = router;