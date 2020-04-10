const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const in_stock = req.body.in_stock;
    try {
        let product = new Product({
            title: title,
            category: category,
            description: description,
            in_stock: in_stock
        });
        product = await product.save();

        console.log('Created Product');
        res.status(400).redirect('/admin/products');
    } catch{ err => console.log(err) }

};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated: req.session.isLoggedIn
        });
    } catch{ err => console.log(err) }
};

exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) res.redirect('/');
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        if (!product) res.redirect('/');

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            isAuthenticated: req.session.isLoggedIn
        });

    } catch{ err => console.log(err) }
};

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByIdAndUpdate(prodId)
        .then(product => {
            product.title = req.body.title;
            product.category = req.body.category;
            product.description = req.body.description;
            product.in_stock = req.body.in_stock;

            return product.save();
        })
        .then(result => {
            console.log('Updated Product!');
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))

};

exports.postDeleteProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        const product = await Product.findByIdAndRemove(prodId);

        if (!product) return res.status(404).send('The product was not found.');

        console.log('Product Deleted!')
        res.redirect('/admin/products')
    } catch{ err => console.log(err) }

};