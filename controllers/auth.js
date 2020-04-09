const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign UP',
        path: '/signup',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userdoc => {
            if (userdoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        activity: { items: [] }
                    })
                    return user.save()
                })
                .then(result => {
                    console.log('User Created!');
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.redirect('/signup');
            };
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        res.redirect('/login');
                    };
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save(err => {
                        console.log(err)
                        res.redirect('/');
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login');
                })

        })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    });
    console.log('logout')
};