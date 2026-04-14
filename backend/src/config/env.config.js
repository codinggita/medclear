/**
 * File: env.config.js
 * 
 * Purpose:
 * Centralizes environment variable management and validation.
 * 
 * Responsibilities:
 * - Load variables from .env using dotenv
 * - Validate presence of critical variables (PORT, MONGO_URI, JWT_SECRET)
 * - Export a frozen configuration object used throughout the app
 * 
 * Flow:
 * Server.js -> Env Config -> System-wide usage
 */
