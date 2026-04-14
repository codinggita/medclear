/**
 * Folder: controllers/
 * 
 * Purpose: 
 * Contains logic to handle incoming requests, interface with services, and send responses.
 */

/**
 * File: auth.controller.js
 * 
 * Purpose:
 * Handles authentication requests like Google Login, Logout, and Token refresh.
 * 
 * Responsibilities:
 * - Accept Google OAuth token from client
 * - Invoke AuthService to verify and sign new JWT
 * - Set long-lived cookies or return tokens in JSON
 * - Handle user logout session clearing
 * 
 * Flow:
 * Client → Auth Router → Auth Controller → Auth Service → Response
 */
