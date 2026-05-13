const Product = require('../models/Product');
const crypto = require('crypto');
const QRCode = require('qrcode');

const seedDatabase = async () => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      return;
    }

    const demoProducts = [
      {
        productName: 'AirMax Infinity Space Edition',
        brand: 'Nike',
        batchNumber: 'B-9092-A',
        manufacturingDate: new Date('2026-01-15'),
        description: 'Limited edition anti-gravity sneakers.'
      },
      {
        productName: 'Quantum Smartphone X',
        brand: 'TechCorp',
        batchNumber: 'TC-X-2026',
        manufacturingDate: new Date('2026-03-10'),
        description: 'Smartphone with quantum encryption.'
      },
      {
        productName: 'HoloWatch Pro',
        brand: 'ChronoTech',
        batchNumber: 'HW-PRO-1',
        manufacturingDate: new Date('2026-05-01'),
        description: 'Holographic smartwatch with health tracking.'
      }
    ];

    console.log('🌱 Seeding database with demo products...');

    for (const item of demoProducts) {
      const productId = 'PROD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      const dataToHash = `${productId}-${item.productName}-${item.brand}-${item.batchNumber}-${item.manufacturingDate}`;
      const productHash = crypto.createHash('sha256').update(dataToHash).digest('hex');
      const qrCodeUrl = await QRCode.toDataURL(productId);

      const product = new Product({
        ...item,
        productId,
        productHash,
        qrCodeUrl
      });
      await product.save();
      console.log(`   - Seeded: ${item.productName} (ID: ${productId})`);
    }

    console.log('✅ Database seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = seedDatabase;
