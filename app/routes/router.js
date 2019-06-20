/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4')
const session = require('express-session')

//use session
router.use(session({
    genid: (req) => {
   //   console.log('Inside the session middleware')
    //  console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  

/* API routes */
router.use('/user', require('./api/userRoutes'));
router.use('/link', require('./api/linkRoutes'));
router.use('/tag', require('./api/tagRoutes'));

module.exports = router;