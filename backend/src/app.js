/**
 * File: app.js
 * 
 * Purpose:
 * Configures the Express application, middleware, and route mounting.
 * 
 * Responsibilities:
 * - Configure standard middlewares (CORS, JSON parsing, Logging)
 * - Define global route prefixes (e.g., /api/auth)
 * - Mount modular route files
 * - Configure centralized error handling middleware
 * 
 * Flow:
 * Server.js -> App -> Middlewares -> Routes -> Error Handler
 */
