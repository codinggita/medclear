"""Debug: see what rows and boxes the pipeline produces from sample-bill.png"""
import sys
sys.path.insert(0, ".")

from app.services.ocr_service import (
    extract_with_easyocr, cluster_into_rows
)
from app.utils.noise_filter import is_noise_row, is_header_row, extract_numeric_value, clean_price_text
import cv2
import numpy as np

with open("sample-bill.png", "rb") as f:
    image_bytes = f.read()

nparr = np.frombuffer(image_bytes, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

boxes = extract_with_easyocr(img)
if boxes:
    rows = cluster_into_rows(boxes)
    print(f"Total boxes: {len(boxes)}, Total rows: {len(rows)}\n")
    
    for idx, row in enumerate(rows):
        line_text = " ".join(b['text'] for b in row)
        noise = is_noise_row(line_text)
        header = is_header_row(line_text)
        tag = ""
        if noise: tag = "[NOISE]"
        elif header: tag = "[HEADER]"
        
        print(f"Row {idx:2d} {tag:8s} | {line_text}")
        for b in row:
            val = extract_numeric_value(b['text'])
            pos = b['x_min']
            print(f"          Box x={pos:6.0f}  conf={b['conf']:.2f}  text='{b['text']}'  numval={val}")
        print()
