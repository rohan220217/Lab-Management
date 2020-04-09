const express = require('express');
const libController = require('../controllers/lib');

const router = express.Router();

router.get('/', libController.getIndex);

router.get('/products/:productId', libController.getProduct);

router.get('/cart', libController.getCart);

router.post('/cart', libController.postCart);

module.exports = router; 