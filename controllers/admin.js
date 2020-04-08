const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const in_stock = req.body.in_stock;
    const product = new Product({
        title : title,
        category : category,
        description  : description,
        in_stock : in_stock
    });
    product
        .save()
        .then(result => {
            console.log('Created Product');
            res.status(400).redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path:'/admin/products'
            });
        })
        .catch(err => console.log(err) );
};