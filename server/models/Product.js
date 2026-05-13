const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  batchNumber: {
    type: String,
    required: true
  },
  manufacturingDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  qrCodeUrl: {
    type: String,
    required: true
  },
  productHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
