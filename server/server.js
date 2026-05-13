const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const productRoutes = require('./routes/productRoutes');
const seedDatabase = require('./utils/seedDatabase');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

// MongoDB Connection Setup
let mongoServer;

const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      // --- PRODUCTION MODE (MongoDB Atlas) ---
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ Connected to Production MongoDB Atlas`);
    } else {
      // --- LOCAL DEMO MODE (In-Memory) ---
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`✅ MongoDB In-Memory Server connected at ${mongoUri}`);
      
      // Seed database with demo products only in local demo mode
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
  }
  process.exit();
});
