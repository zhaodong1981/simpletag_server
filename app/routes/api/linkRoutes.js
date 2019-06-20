/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const LinkController = require('../../controller/linkController');
const linkController = new LinkController();

const util = require('../../utils/helpers');

/**
 * Link Entity routes
 */
router.get('/count', util.checkAuth, function (req, res) {
    linkController.countAll(res);
});

/**
 * search links by keywords in link title or tags
 */
router.get('/search',util.checkAuth, function (req, res) {
  //  linkController.findAll(res);
    linkController.findByKeywords(req,res);
});

router.get('/exists/:id', util.checkAuth, function (req, res) {
    linkController.exists(req, res);
});

router.get('/', util.checkAuth, function (req, res) {
  //  linkController.findAll(res);
    linkController.findByPageSize(req,res);
});

router.put('/:id', util.checkAuth, function (req, res) {
    linkController.update(req, res);
});

router.post('/create', util.checkAuth, function (req, res) {
    linkController.create(req, res);
});

router.delete('/:id', util.checkAuth, function (req, res) {
    linkController.deleteById(req, res);
});

module.exports = router;