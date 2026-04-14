/**
 * File: upload.middleware.js
 * 
 * Purpose:
 * Middleware for handling multi-part form-data (file uploads).
 * 
 * Responsibilities:
 * - Configure storage engine (Memory or Disk)
 * - Define file size limits for PDF and images
 * - Filter files by MIME type (allow only .pdf, .jpg, .png)
 * - Pass the file buffer or path to the next controller in the stack
 */
