/**
 * File: analysis.service.js
 * 
 * Purpose:
 * Technical logic for identifying medical overcharges and price gouging.
 * 
 * Responsibilities:
 * - Match extracted hospital line-items (from OCR) to real-world datasets (NPPA/CGHS)
 * - Calculate price gaps and percentages of overcharge
 * - Use fuzzy matching to identify procedures with non-standard naming
 * - Aggregate the total 'Theft' amount based on government mandated caps
 * 
 * Input: Array of lineItems from OCR
 * Output: Analyzed list with detected overcharges and total theft amount
 */
