import json
import cv2
import easyocr
import os
import re

# Use absolute path to the sample image
img_path = r"c:\Users\kakka\OneDrive\Desktop\HACKTHON CLUB\medclear\ocr-service\sample-bill.png"

PRICE_PATTERN = re.compile(r'^\d+(\.\d{1,2})?$')

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

def debug_ocr():
    try:
        img = cv2.imread(img_path)
        if img is None:
            print(f"FAILED: Could not read {img_path}")
            return

        # Initialize reader WITHOUT progress bar (verbose=False)
        reader = easyocr.Reader(['en'], gpu=False, verbose=False)
        ocr_result = reader.readtext(img)
        
        boxes = []
        for bbox, text, conf in ocr_result:
            x_coords = [p[0] for p in bbox]
            y_coords = [p[1] for p in bbox]
            boxes.append({
                "text": text,
                "x_min": min(x_coords),
                "center_y": (min(y_coords) + max(y_coords)) / 2,
                "conf": float(conf)
            })
            
        rows = cluster_into_rows(boxes)
        
        output = {
            "total_boxes": len(boxes),
            "rows": []
        }
        
        for r in rows:
            row_text = " | ".join([b['text'] for b in r])
            output["rows"].append(row_text)
            
        with open("raw_ocr_output.json", "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2)
            
        print(f"SUCCESS: Found {len(boxes)} boxes and {len(rows)} rows.")
    except Exception as e:
        print(f"CRASH: {str(e)}")

if __name__ == "__main__":
    debug_ocr()
