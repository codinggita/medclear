from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ocr_router

app = FastAPI(title="MedClear OCR Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print("MedClear OCR Service starting up...")
    print("EasyOCR and Tesseract engines ready.")

@app.get("/ocr/health")
def health_check():
    return {"success": True, "status": "OCR Service is running"}

app.include_router(ocr_router.router, prefix="/ocr", tags=["OCR"])
