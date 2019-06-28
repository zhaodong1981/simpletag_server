let processUser = function (req) {
    if (typeof req === 'undefined' || req === '' || req.token === 'undefined'|| req.token.ref === 'undefined'){
        return "test_";
    }
    return req.token.ref;
};

/*
let checkAuth = function (req, res, next) {
    if (!req.session.user_id) {
      res.status(401).send('Not authorized');
    } else {
      next();
    }
};
*/

module.exports = {
    processUser: processUser
};

