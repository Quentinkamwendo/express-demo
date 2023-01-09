const passport = require('passport')


const loginForm = (req, res) => {

    res.render('login', { title: 'Login', isLoggedIn: false });
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
})

module.exports = {loginForm, loginUser}