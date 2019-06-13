/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const LinkController = require('../../controller/linkController');
const linkController = new LinkController();

/**
 * Link Entity routes
 */
router.get('/count', function (req, res) {
    linkController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    linkController.exists(req, res);
});

router.get('/:user_id', function (req, res) {
    linkController.findByUserId(req, res);
});

router.get('/', function (req, res) {
  //  linkController.findAll(res);
    linkController.findByPageSize(req,res);
});

router.get('/page', function (req, res) {
    console.log("paging 0... ");
    linkController.findByPageOffset(req,res);
});

router.put('/:id', function (req, res) {
    linkController.update(req, res);
});

router.post('/create', function (req, res) {
    linkController.create(req, res);
});

router.delete('/:id', function (req, res) {
    linkController.deleteById(req, res);
});

module.exports = router;