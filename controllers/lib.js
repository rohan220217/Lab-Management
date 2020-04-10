const Product = require('../models/product');

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.render('lib/index', {
            pageTitle: 'Library',
            path: '/',
            prods: products,
            isAuthenticated: req.session.isLoggedIn
        });
    } catch { err => console.log(err) }
};

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        res.render('lib/product-detail', {
            pageTitle: 'Product Detail',
            path: '/product-detail',
            product: product,
            isAuthenticated: req.session.isLoggedIn
        });
    } catch{ err => console.log(err) };

};

exports.getActivity = async (req, res, next) => {
    try {
        const user = await req.user.populate('activity.items.productId').execPopulate()
        const products = user.activity.items;
        res.render('lib/activity', {
            pageTitle: 'Your Activity',
            path: '/activity',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        });
    } catch{ err => console.log(err) };
};

exports.postCart = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        const product = await Product.findById(prodId);
        req.user.addToCart(product);
        res.redirect('/activity');
    } catch{ err => console.log(err) }
};

exports.return = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        const result = await req.user.removeFromActivity(prodId);
        res.redirect('/activity')
    } catch{ err => console.log(err) }
};