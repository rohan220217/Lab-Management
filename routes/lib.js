const express = require('express');
const libController = require('../controllers/lib');

const router = express.Router();

router.get('/', libController.getIndex);

router.get('/products/:productId', libController.getProduct);

router.get('/activity', libController.getActivity);

router.post('/cart', libController.postCart);

module.exports = router;  