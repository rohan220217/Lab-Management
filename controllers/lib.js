const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('lib/index', {
                pageTitle: 'Library',
                path: '/',
                prods: products,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))

};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('lib/product-detail',{
                pageTitle: 'Product Detail',
                path: '/product-detail',
                product: product,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.getActivity = (req, res, next) => {
    req.user
        .populate('activity.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.activity.items;
            res.render('lib/activity', {
                pageTitle: 'Your Activity',
                path: '/activity',
                products: products,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            res.redirect('/activity');
        })
        .catch(err => console.log(err))

};