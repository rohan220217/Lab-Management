const express = require('express');
const libController = require('../controllers/lib');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', libController.getIndex);

router.get('/products/:productId', libController.getProduct);

router.get('/activity',isAuth, libController.getActivity);

router.post('/cart',isAuth, libController.postCart);

router.post('/return',isAuth, libController.return);

module.exports = router;  