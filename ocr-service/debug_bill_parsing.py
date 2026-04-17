import sys
import os
import cv2
import numpy as np
from app.services.ocr_service import process_bill_image

# Mock a filename
filename = "media__1776426181095.png"
# Path to the image in artifacts (I'll copy it to a local temporary path first)
image_path = "sample-bill.png" # I already copied it to frontend/public but I can use it here too or just use the local copy

def debug_ocr():
    with open(image_path, "rb") as f:
        image_bytes = f.read()
    
    # Run the processing logic
    result = process_bill_image(image_bytes, filename)
    
    print("\n--- OCR RESULT ---")
    print(f"Engine: {result.get('engine')}")
    print(f"Confidence: {result.get('ocr_confidence')}")
    print(f"Items Found: {len(result.get('items', []))}")
    print("Items:")
    for item in result.get('items', []):
        print(f"  - {item['rawName']} | Price: {item['price']} | Conf: {item['confidence']}")
    print(f"Parsed Total: {result.get('parsedTotal')}")
    print("------------------\n")

if __name__ == "__main__":
    debug_ocr()
