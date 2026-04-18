import re
import io
import cv2
import numpy as np
from PIL import Image
import pytesseract
from app.utils.image_preprocess import preprocess_image, deskew_image, enhance_contrast

try:
    from pdf2image import convert_from_bytes
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False

try:
    import easyocr
    EASY_AVAILABLE = True
    reader = easyocr.Reader(['en'], gpu=False)
except Exception:
    EASY_AVAILABLE = False
    reader = None

CURRENCY_PATTERN = re.compile(r'(?:Rs\.?|INR|₹|\$|S)\s*([\d,]+(?:\.\d+)?|[\d,]+)', re.IGNORECASE)
PRICE_PATTERN = re.compile(r'^\d*[.,]?\d+$')
TOTAL_PATTERN = re.compile(r'(?:Grand Total|Net Amount|Total Payable|Total Amount|Payable Amount|Subtotal|TOTAL:)', re.IGNORECASE)

def convert_pdf_to_images(pdf_bytes):
    if not PDF_AVAILABLE:
        raise Exception("PDF_NOT_SUPPORTED_POPPLER_MISSING")
    
    try:
        images = convert_from_bytes(pdf_bytes)
        combined_img = None
        for img in images:
            cv_img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            if combined_img is None:
                combined_img = cv_img
            else:
                combined_img = cv2.vconcat([combined_img, cv_img])
        return combined_img
    except Exception as e:
        raise Exception(f"PDF conversion failed: {str(e)}")

def extract_with_easyocr(processed_img):
    if not EASY_AVAILABLE:
        return None
    try:
        return reader.readtext(processed_img)
    except Exception:
        return None

def extract_with_tesseract(processed_img):
    try:
        if len(processed_img.shape) == 3:
            img_to_ocr = cv2.cvtColor(processed_img, cv2.COLOR_BGR2GRAY)
        else:
            img_to_ocr = processed_img
            
        data = pytesseract.image_to_data(img_to_ocr, output_type=pytesseract.Output.DICT)
        boxes = []
        for i in range(len(data['text'])):
            if int(data['conf'][i]) > 30:
                text = data['text'][i].strip()
                if text:
                    boxes.append({
                        "text": text,
                        "x_min": data['left'][i],
                        "x_max": data['left'][i] + data['width'][i],
                        "y_min": data['top'][i],
                        "center_y": data['top'][i] + data['height'][i] / 2,
                        "conf": int(data['conf'][i]) / 100.0
                    })
        return boxes
    except Exception:
        return None

def cluster_into_rows(boxes, y_tolerance=35):
    if not boxes:
        return []
    
    boxes.sort(key=lambda b: b['center_y'])
    rows = []
    current_row = [boxes[0]]
    
    for i in range(1, len(boxes)):
        if abs(boxes[i]['center_y'] - current_row[0]['center_y']) < y_tolerance:
            current_row.append(boxes[i])
        else:
            rows.append(sorted(current_row, key=lambda b: b['x_min']))
            current_row = [boxes[i]]
    rows.append(sorted(current_row, key=lambda b: b['x_min']))
    return rows

def parse_line_items(rows):
    items = []
    extracted_total = 0.0
    
    print(f"--- DEBUG: Processing {len(rows)} rows ---")
    for idx, row in enumerate(rows):
        line_text = " ".join([b['text'] for b in row])
        avg_conf = sum([b['conf'] for b in row]) / len(row) if row else 0
        
        prices = []
        possible_price_boxes = []
        for box in reversed(row):
            clean_text = re.sub(r'[₹$S]|Rs\.?|INR|,|\s+', '', box['text'], flags=re.IGNORECASE)
            if re.match(r'^[Il]\d+', clean_text): clean_text = clean_text[1:]
            
            if PRICE_PATTERN.match(clean_text):
                try:
                    val = float(clean_text)
                    prices.append(val)
                    possible_price_boxes.append(box['text'])
                except ValueError:
                    continue
        
        if TOTAL_PATTERN.search(line_text):
            if prices:
                total_cand = max(prices)
                if total_cand > extracted_total:
                    extracted_total = total_cand
            continue

        if len(prices) > 0:
            # The actual item price is usually the rightmost one that is 'large'
            # Or just the rightmost one if there's only one
            price = prices[0]
            name_parts = []
            
            # Identify name part (exclude quantity and price columns)
            # Strategy: Include everything until we hit a box that matches our chosen 'price' or a very obvious price
            # BUT don't let small numbers like 1, 2, 3 break the name unless they are the only thing
            for box in row:
                text = box['text']
                clean_box = re.sub(r'[₹$S]|Rs\.?|INR|,|\s+', '', text, flags=re.IGNORECASE)
                
                # If this box IS the price we found, stop
                try:
                    is_this_price = float(clean_box) == price
                except:
                    is_this_price = False
                
                if is_this_price or (PRICE_PATTERN.match(clean_box) and float(clean_box) > 10):
                    break
                
                name_parts.append(text)
            
            name = " ".join(name_parts).strip().strip('|').strip()
            if name and len(name) > 2 and not name.replace('.', '').replace('-', '').isdigit():
                if name.lower() not in ['description', 'quantity', 'unit price', 'total cost', 'quanity']:
                    print(f"      [ITEM] Name: '{name}' | Price: {price}")
                    items.append({
                        "rawName": name,
                        "price": price,
                        "quantity": 1,
                        "confidence": round(avg_conf, 2)
                    })
                
    return items, extracted_total

def process_bill_image(image_bytes: bytes, filename: str):
    try:
        is_pdf = filename.lower().endswith('.pdf')
        
        if is_pdf:
            img = convert_pdf_to_images(image_bytes)
        else:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise Exception("Failed to decode image")

        processed = preprocess_image(img)
        processed = deskew_image(processed)
        processed = enhance_contrast(processed)

        engine = "easyocr"
        ocr_result = extract_with_easyocr(processed)
        
        boxes = []
        if ocr_result:
            for bbox, text, conf in ocr_result:
                x_coords = [p[0] for p in bbox]
                y_coords = [p[1] for p in bbox]
                boxes.append({
                    "text": text,
                    "x_min": min(x_coords),
                    "x_max": max(x_coords),
                    "y_min": min(y_coords),
                    "center_y": (min(y_coords) + max(y_coords)) / 2,
                    "conf": conf
                })
        else:
            engine = "tesseract"
            boxes = extract_with_tesseract(processed)

        if not boxes:
            return {"engine": "none", "items": [], "parsedTotal": 0, "ocr_confidence": 0}

        rows = cluster_into_rows(boxes)
        items, total = parse_line_items(rows)
        
        avg_conf = sum([i['confidence'] for i in items]) / len(items) if items else 0
        
        return {
            "engine": engine,
            "items": items,
            "parsedTotal": total if total > 0 else sum([i['price'] for i in items]),
            "ocr_confidence": round(avg_conf, 2)
        }
    except Exception as e:
        if "POPPLER_MISSING" in str(e):
            raise e
        raise Exception(f"OCR Error: {str(e)}")