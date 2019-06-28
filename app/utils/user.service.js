const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    authenticate
};

async function authenticate(users,{ username, password }) {
    console.log("all users: " + JSON.stringify(users));
    const user = users.find(u => u.username === username);
    if (user){
        console.log("user found");
    }else {
        console.log("User not found");
    }
    if (user && bcrypt.compareSync(password, user.password)) {
        console.log("Password matches");
        const token = jwt.sign({ username: user.username, ref: user.schema }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } else{
        console.log("Invalid password");
    };
    
}