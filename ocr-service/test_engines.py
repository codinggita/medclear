import cv2
import easyocr
import pytesseract
import numpy as np

def direct_test():
    img_path = "sample-bill.png"
    img = cv2.imread(img_path)
    if img is None:
        print("Error: Could not read image")
        return
    
    print(f"Image shape: {img.shape}")
    
    print("\n--- Testing Tesseract ---")
    try:
        text = pytesseract.image_to_string(img)
        print(f"Raw text length: {len(text)}")
        print(f"Sample: {text[:100]}...")
    except Exception as e:
        print(f"Tesseract Failed: {e}")
        
    print("\n--- Testing EasyOCR ---")
    try:
        reader = easyocr.Reader(['en'], gpu=False)
        result = reader.readtext(img)
        print(f"Boxes found: {len(result)}")
        if result:
            print(f"Sample: {result[0][1]}")
    except Exception as e:
        print(f"EasyOCR Failed: {e}")

if __name__ == "__main__":
    direct_test()
