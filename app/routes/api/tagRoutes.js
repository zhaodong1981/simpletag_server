/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const Tag_linkController = require('../../controller/tag_linkController');
const tag_linkController = new Tag_linkController();

router.get('/', function (req, res) {
    tag_linkController.findAll(res);
});

router.post('/create', function (req, res) {
    tag_linkController.create(req, res);
});

router.delete('/:link_id', function (req, res) {
    tag_linkController.deleteByLinkId(req, res);
});

router.delete('/:link_id/:tag', function (req, res) {
    tag_linkController.deleteTag(req, res);
});

module.exports = router;