/**
 * File: bill.routes.js
 * 
 * Purpose:
 * Entry points for the medical billing audit pipeline.
 * 
 * Responsibilities:
 * - Route: POST /api/audit/bill -> Accept bill upload for analysis
 * - Route: GET /api/audit/history -> Retrieve user's past audit results
 * - Apply UploadMiddleware to the POST route for file handling
 * - Apply AuthMiddleware to ensure ownership of data
 * 
 * Flow:
 * Request → Router → AuthMiddleware → UploadMiddleware → Bill Validator → Bill Controller
 */
