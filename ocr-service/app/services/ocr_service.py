"""
File: ocr_service.py

Purpose:
Core logic for text extraction using OCR technologies.

Responsibilities:
- Integrate with OCR engines (Tesseract, EasyOCR, or Cloud APIs)
- Parse extracted text into structured line items (ID, Name, Charge)
- Handle multi-page PDF to image conversion for processing
- Validate the quality of extraction results

Input: File buffer / Image array
Output: Structured dictionary of medical line-items
"""
