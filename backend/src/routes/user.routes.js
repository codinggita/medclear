/**
 * File: user.routes.js
 * 
 * Purpose:
 * Definitive mapping of user-profile endpoints to controller logic.
 * 
 * Responsibilities:
 * - Route: GET /api/user/profile -> Get current user metadata
 * - Route: PATCH /api/user/preferences -> Update user specific config
 * - Apply AuthMiddleware to all routes to ensure session validity
 * 
 * Flow:
 * Request → Router → AuthMiddleware → User Controller
 */
