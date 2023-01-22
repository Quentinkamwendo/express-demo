const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require("bcrypt");
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const paginate = require('express-paginate');
const path = require("path");
const connection = require('./model/db');

require("dotenv").config();

// Set up handlebars
// app.engine('handlebars', Handlebars.create().engine);
app.engine('handlebars', expressHandlebars.engine({
    partialsDir: path.join(__dirname, './views', 'partials'),
    layoutsDir: '',
    defaultLayout: 'main',
    handlebars: handlebars
}));
app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.locals.loggedIn = req.session.loggedIn;
//     next();
// })

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email'
}, (username, password, done) => {
    // Query the database to find the user
    connection.query(`SELECT * FROM users WHERE username = ?`, [username], (err, rows) => {
        if (err) return done(err);
        if (!rows.length) return done(null, false);

        const user = rows[0];
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return done(err);
            }
            if (result) {
                return done(null, user);
            }
            else {
                return done(null, false)
            }

        });

    });
}));

// Set up Passport to serialize and deserialize user instances
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
        done(err, rows[0]);
    });
});

// Tell Express to use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', require('./routes/loginRouter'));
app.use('/register', require('./routes/registerRouter'));
app.use('/logout', require('./routes/logoutRoute'));
app.use('/products', require('./routes/productRouters'));

app.use(paginate.middleware(3, 50));

app.get('/home', (req, res) => {

    if (req.isAuthenticated()) {

        connection.query(`SELECT * FROM products`, (err, rows) => {
            if (err) throw err;

            res.render('home', { title: 'HomePage', isLoggedIn: true, products: rows, })
        })

    } else {
        res.send(`Not logged in <a href="/login">Go Back</a>`);
    }
});


app.post('/goto-products', (req, res) => {
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('Express app listening on port 3000');
});
