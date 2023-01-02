const express = require('express');
const passport = require('passport');

const app = express();

app.get('/login', function (req, res, next) {
    res.render('login');
});

app.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));