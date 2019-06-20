/* Load Modules */
const express = require('express');
const router = express.Router();

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
    userController.create(req, res);
});

router.post('/login', function (req, res) {
    var post = req.body;
    if (post.user === 'dzhao' && post.password === 'password') {
      req.session.user_id = "dzhao_12345";
      res.send('Login succeeded');
    } else {
      res.send('Bad username or password');
    }
  });

module.exports = router;