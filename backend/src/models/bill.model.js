/**
 * File: bill.model.js
 * 
 * Purpose:
 * Defines the MongoDB schema for medical bills and audit artifacts.
 * 
 * Responsibilities:
 * - Persist structured billing items extracted from OCR
 * - Store overcharge calculations and detected theft amounts
 * - Map each audit record to a specific User
 * - Store metadata about the hospital (name, category, location)
 * - Record timestamps for audit completion
 * 
 * Data Schema:
 * - userId: ObjectId (Reference to User)
 * - hospitalName: String
 * - items: Array [ { name, chargedAmount, cappedAmount, isOvercharged } ]
 * - totalCharged: Number
 * - totalTheft: Number
 * - auditDate: Date (default: now)
 */
