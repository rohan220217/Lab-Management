const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const in_stock = req.body.in_stock;
    const product = new Product({
        title: title,
        category: category,
        description: description,
        in_stock: in_stock
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
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) res.redirect('/');

    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) res.redirect('/');

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title;
    const updateCategory = req.body.category;
    const updateDescription = req.body.description;
    const updateIn_stock = req.body.in_stock;

    Product.findById(prodId)
        .then(product => {
            product.title = updateTitle;
            product.category = updateCategory;
            product.description = updateDescription;
            product.in_stock = updateIn_stock;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product!');
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('Product Deleted!')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
};