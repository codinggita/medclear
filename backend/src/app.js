const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const { errorHandler } = require('./middlewares/errorHandler');
const billRoutes = require('./routes/bill.routes');
const logger = require('./utils/logger');

const app = express();

// Security and Performance
app.use(helmet());
app.use(compression());

// Production CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: 'RATE_LIMIT_EXCEEDED' }
}));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
});

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'REST API is running' });
});

app.use('/api/v1/bills', billRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'ROUTE_NOT_FOUND' });
});

app.use(errorHandler);

module.exports = app;
