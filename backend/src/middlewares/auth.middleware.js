/**
 * File: auth.middleware.js
 * 
 * Purpose:
 * Security layer for guarding protected API routes.
 * 
 * Responsibilities:
 * - Extract Bearer token from the Authorization header
 * - Verify the JWT using the application secret
 * - Map the token payload back to a User record in the database
 * - Handle cases for expired, malformed, or missing tokens
 * - Attach the authenticated User object to the request for controller access
 */
