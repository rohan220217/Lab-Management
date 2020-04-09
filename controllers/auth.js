const User = require('../models/user');

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign UP',
        path: '/signup'
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userdoc => {
            if(userdoc){
                return res.redirect('/signup');
            }
            const user = new User({
                email: email,
                password: password,
                activity: { items: [] }
            })
            user
                .save()
                .then(result => {
                    console.log('User Created!');
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if(!user){
                res.redirect('/signup');
            };
            
        })
};