let processUser = function (username) {
    if (typeof username === 'undefined' || username === ''){
        return "dzhao_";
    }
    return username + "_";
};

module.exports = {
    processUser: processUser
};

