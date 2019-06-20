let processUser = function (username) {
    if (typeof username === 'undefined' || username === ''){
        return "dzhao_";
    }
    return username + "_";
};

let checkAuth = function (req, res, next) {
    if (!req.session.user_id) {
      res.status(401).send('Not authorized');
    } else {
      next();
    }
};

module.exports = {
    checkAuth: checkAuth,
    processUser: processUser
};

