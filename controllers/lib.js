const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('lib/index', {
                pageTitle: 'Library',
                path: '/',
                prods: products
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
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    
}

exports.postCart = (req, res, next) => {

}