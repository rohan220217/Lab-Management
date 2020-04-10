const express = require('express');
const libController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product',isAuth, libController.getAddProduct);

router.post('/add-product',isAuth, libController.postAddProduct);

router.get('/products',isAuth, libController.getProducts);

router.get('/edit-product/:productId',isAuth, libController.getEditProduct);

router.post('/edit-product',isAuth, libController.postEditProduct);

router.post('/delete-product',isAuth, libController.postDeleteProduct);    

module.exports = router;