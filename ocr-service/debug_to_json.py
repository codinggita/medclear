import json
import cv2
import easyocr
import numpy as np
from app.services.ocr_service import cluster_into_rows, parse_line_items, preprocess_image, deskew_image, enhance_contrast

def debug_to_json():
    img_path = "sample-bill.png"
    img = cv2.imread(img_path)
    
    processed = preprocess_image(img)
    processed = deskew_image(processed)
    processed = enhance_contrast(processed)
    
    reader = easyocr.Reader(['en'], gpu=False)
    ocr_result = reader.readtext(processed)
    
    boxes = []
    for bbox, text, conf in ocr_result:
        x_coords = [p[0] for p in bbox]
        y_coords = [p[1] for p in bbox]
        boxes.append({
            "text": text,
            "x_min": min(x_coords),
            "x_max": max(x_coords),
            "y_min": min(y_coords),
            "center_y": (min(y_coords) + max(y_coords)) / 2,
            "conf": float(conf)
        })
    
    rows = cluster_into_rows(boxes)
    items, total = parse_line_items(rows)
    
    debug_data = {
        "boxes": boxes,
        "rows_count": len(rows),
        "items": items,
        "total": total
    }
    
    with open("ocr_debug.json", "w", encoding="utf-8") as f:
        json.dump(debug_data, f, indent=2)
    
    print(f"Debug data saved. Found {len(items)} items.")

if __name__ == "__main__":
    debug_to_json()
