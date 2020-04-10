const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign UP',
        path: '/signup',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const userdoc = await User.findOne({ email: email });
        if (userdoc) {
            return res.redirect('/signup');
        }
        const hashedPassword = bcrypt.hash(password, 12);
        let user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            activity: { items: [] }
        })
        user = await user.save();

        console.log('User Created!');
        res.redirect('/login');
    } catch{ err => console.log(err) }

};

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: message
    });
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error', ' Username or Password')
            res.redirect('/login');
        };

        const doMatch = bcrypt.compare(password, user.password);
        if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        };
        req.flash('error', ' Username or Password')
        res.redirect('/login');
    } catch{
        err => {
            console.log(err)
            res.redirect('/login');
        }
    };
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    });
    console.log('logout')
};