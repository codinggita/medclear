/**
 * File: error.middleware.js
 * 
 * Purpose:
 * Centralized catch-all for handling errors throughout the Express stack.
 * 
 * Responsibilities:
 * - Capture errors passed via next(err)
 * - Distinguish between operational errors (validators, auth) and system crashes
 * - Log detailed errors to the system console/service for debugging
 * - Format a clean, standardized JSON response for the end-user
 * - Handle specific MongoDB error codes (duplicate keys, etc.)
 */
