const express = require('express');
const libController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', libController.getAddProduct);

router.post('/add-product', libController.postAddProduct);

router.get('/products', libController.getProducts);

module.exports = router;