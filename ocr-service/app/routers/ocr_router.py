from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.ocr_service import process_bill_image

router = APIRouter()

ALLOWED_TYPES = {'image/jpeg', 'image/png', 'image/webp', 'application/pdf'}

@router.post("/extract")
async def extract_bill_data(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Invalid file type. Only images and PDFs supported.")
    
    try:
        contents = await file.read()
        if len(contents) == 0:
            raise HTTPException(400, "Empty file provided")
        
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(400, "File too large. Maximum size is 10MB.")
        
        result = process_bill_image(contents, file.filename)
        return {"success": True, "data": result}
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        if "POPPLER_MISSING" in error_msg:
            raise HTTPException(400, "PDF processing is not supported in this environment (Poppler missing). Please upload an image or install Poppler.")
        raise HTTPException(500, f"OCR processing failed: {error_msg}")