const express = require('express');
const passport = require('passport');
const bcrypt = require("bcrypt");
const MySQLStrategy = require('passport').Strategy;
const connection = require('mysql2')
const path = require("path");

require("dotenv").config();
const app = express();

// Set up EJS as the template engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));


// Replace with your MySQL configuration
const MYSQL_CONFIG = {
    host: 'process.env.MY_HOST',
    user: 'process.env.MY_USER',
    password: 'process.env.MY_PASSWORD',
    database: 'process.env.MY_DATABASE'
};

// Set up Passport to use the MySQL strategy
passport.use(new MySQLStrategy(MYSQL_CONFIG, function(user, done) {
    // Query the database to find the user
    connection.query('SELECT * FROM users WHERE username = ?', [user.username], function(err, results) {
        if (err) { return done(err); }
        if (!results.length) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const user = results[0];
        if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

// Set up Passport to serialize and deserialize user instances
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, results) {
        if (err) { return done(err); }
        done(null, results[0]);
    });
});

// Tell Express to use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set up a route to render the login form
app.get('/login', function(req, res) {
    res.render('login');
});

// Set up a route to handle the login form
app.post('/login', passport.authenticate('mysql', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), ()=> console.log('successfully logged in'));

// Set up a route to handle the logout process
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Set up a route to render the registration form
app.get('/register', function(req, res) {
    res.render('register');
});

// Set up a route to handle the registration form
app.post('/register', function(req, res) {
    // Get the user's registration information from the request body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Hash the password for security
    const passwordHash = bcrypt.hashSync(password, 10);

// Insert the new user into the database

    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, passwordHash, email], function(err, results) {
        if (err) {
            // If there is an error, redirect back to the registration form
            res.redirect('/register');
        } else {
            // If the user is successfully registered, authenticate and log them in
            passport.authenticate('mysql', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            });
        }
