/**
 * File: user.model.js
 * 
 * Purpose:
 * Defines the MongoDB schema and model for application users.
 * 
 * Responsibilities:
 * - Define user attributes (name, email, googleId, avatar)
 * - Persist user language preferences and regional settings
 * - Handle timestamps for user creation and updates
 * - Store linking data for medical audit history
 * 
 * Data Schema:
 * - name: String (required)
 * - email: String (unique, required)
 * - googleId: String (unique)
 * - language: String (default: 'en')
 */
