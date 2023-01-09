const bcrypt = require("bcrypt");
const connection = require('../model/db');

const registerForm = (req, res) => {

    res.render('register', { title: 'Register', isLoggedIn: false });
}

const registerNewUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Hash the password for security
    const passwordHash = bcrypt.hashSync(password, 10);

    //Add user to database
    connection.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [username, passwordHash, email], (err, result) => {
        if (err) throw err;
        req.login(username, (err)=> {
            if (err) throw err;
            res.redirect('/home');
        });
    });
}

module.exports = {registerForm, registerNewUser}