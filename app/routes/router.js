/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userRoutes'));
router.use('/link', require('./api/linkRoutes'));
router.use('/tag', require('./api/tagRoutes'));

module.exports = router;