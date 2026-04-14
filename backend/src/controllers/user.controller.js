/**
 * File: user.controller.js
 * 
 * Purpose:
 * Handles user-specific requests like profile retrieval and setting updates.
 * 
 * Responsibilities:
 * - Retrieve user profile from database via UserService
 * - Update user preferences (language, notification settings)
 * - Handle account deletion or data exports
 * 
 * Flow:
 * Client → User Router → User Controller → User Service → Database → Response
 */
