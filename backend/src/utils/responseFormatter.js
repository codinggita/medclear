/**
 * File: responseFormatter.js
 * 
 * Purpose:
 * Ensures all API responses adhere to a consistent structure.
 * 
 * Responsibilities:
 * - Wrap success data in a { success: true, data: ... } object
 * - Wrap error messages in a { success: false, error: ... } object
 * - Handle pagination metadata for list responses
 */
