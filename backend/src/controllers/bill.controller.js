/**
 * File: bill.controller.js
 *
 * Purpose:
 * Handles incoming requests for bill upload and triggers the OCR + analysis pipeline.
 *
 * Responsibilities:
 * - Accept file upload (PDF/Image) from client via Multer
 * - Call OCR Integration Service to get structured data
 * - Send extracted data to Analysis Service for overcharge detection
 * - Persist the audit result in the Database
 * - Return final audit result to the client
 *
 * Flow:
 * Client → Bill Router → Bill Controller → OCR Service → Analysis Service → Response
 */
