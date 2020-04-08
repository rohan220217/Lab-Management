const express = require('express');
const libController = require('../controllers/lib');

const router = express.Router();

router.get('/', libController.getIndex);

router.get('/products', libController.getProducts);

router.get('/products/:productId', libController.getProduct);



module.exports = router;