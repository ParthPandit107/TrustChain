const Product = require('../models/Product');
const crypto = require('crypto');
const QRCode = require('qrcode');

// Helper function to generate a random Product ID
const generateProductId = () => {
  return 'PROD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { productName, brand, batchNumber, manufacturingDate, description } = req.body;

    const productId = generateProductId();

    // Create a string to hash (simulating blockchain data payload)
    const dataToHash = `${productId}-${productName}-${brand}-${batchNumber}-${manufacturingDate}`;
    const productHash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    // Generate QR Code containing ONLY the Product ID
    const qrCodeUrl = await QRCode.toDataURL(productId);

    const newProduct = new Product({
      productId,
      productName,
      brand,
      batchNumber,
      manufacturingDate,
      description,
      qrCodeUrl,
      productHash
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET /api/products/:productId
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// POST /api/verify
exports.verifyProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const product = await Product.findOne({ productId });

    if (product) {
      res.status(200).json({
        success: true,
        isGenuine: true,
        message: 'Genuine Product',
        data: product
      });
    } else {
      res.status(200).json({
        success: true,
        isGenuine: false,
        message: 'Fake Product'
      });
    }
  } catch (error) {
    console.error('Error verifying product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
