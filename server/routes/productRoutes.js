const express = require('express');
const { createProduct, getProduct, verifyProduct } = require('../controllers/productController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products/:productId', getProduct);
router.post('/verify', verifyProduct);

module.exports = router;
