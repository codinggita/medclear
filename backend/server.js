/**
 * File: server.js
 * 
 * Purpose: 
 * The entry point for the Node.js backend. Responsible for starting the HTTP server
 * and managing the initialization sequence.
 * 
 * Responsibilities:
 * - Load environment variables via env.config.js
 * - Connect to MongoDB via db.config.js
 * - Initialize the Express application from app.js
 * - Listen on the configured port
 * 
 * Flow:
 * config -> db connection -> app start -> listen
 */
