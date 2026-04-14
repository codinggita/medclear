"""
File: ocr_router.py

Purpose:
Defines the API endpoints for the OCR service.

Responsibilities:
- Route: POST /ocr/process -> Accept image/PDF files
- Delegate file processing to the OCR service layer
- Return structured JSON output to the Node.js backend

Flow:
Node.js Integration → FastAPI Router → OCR Service → Response
"""
