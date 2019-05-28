/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userRoutes'));
router.use('/link', require('./api/linkRoutes'));
router.use('/tag-link', require('./api/tag_linkRoutes'));

module.exports = router;