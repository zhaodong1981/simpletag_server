/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/car', require('./api/carRoutes'));
router.use('/driver', require('./api/driverRoutes'));
router.use('/user', require('./api/userRoutes'));
router.use('/link', require('./api/linkRoutes'));
router.use('/tag-link', require('./api/tag_linkRoutes'));

module.exports = router;