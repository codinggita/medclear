/**
 * File: auth.routes.js
 * 
 * Purpose:
 * Definitive mapping of authentication endpoints to controller logic.
 * 
 * Responsibilities:
 * - Route: POST /api/auth/google -> Authenticate with Google Token
 * - Route: GET /api/auth/logout -> Clear user session
 * - Map validators to specific routes to ensure input integrity
 * 
 * Flow:
 * Request → Router → Validator → Auth Controller
 */
