const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FileCache = require('./src/models/fileCache.model');

dotenv.config();

async function clearCache() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  const result = await FileCache.deleteMany({});
  console.log(`Cleared ${result.deletedCount} cache entries`);
  await mongoose.disconnect();
}

clearCache().catch(console.error);
