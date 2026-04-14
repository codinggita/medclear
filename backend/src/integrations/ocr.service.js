/**
 * File: ocr.service.js
 * 
 * Purpose:
 * Integration layer for communicating with the Python FastAPI OCR microservice.
 * 
 * Responsibilities:
 * - Establish an HTTP connection with the Python service
 * - Forward multi-part file uploads (PDF/Image) to the OCR endpoint
 * - Handle retries, timeout, and connection errors for the downstream service
 * - Receive and parse the structured JSON output from the Python service
 * 
 * Flow:
 * Node.js (Bill Controller) → OCR Service Integration → Python Microservice → Response
 * 
 * Input: File buffer
 * Output: Raw structured items from OCR
 */
