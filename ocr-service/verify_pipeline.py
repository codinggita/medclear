"""Quick verification: run the full OCR pipeline on sample-bill.png"""
import sys
import json

# Ensure app modules are importable
sys.path.insert(0, ".")

from app.services.ocr_service import process_bill_image

# Load sample bill
with open("sample-bill.png", "rb") as f:
    image_bytes = f.read()

print(f"Image size: {len(image_bytes)} bytes")
print("Running OCR pipeline...")

result = process_bill_image(image_bytes, "sample-bill.png")

# Pretty-print result
print("\n" + "=" * 60)
print("OCR PIPELINE RESULT")
print("=" * 60)
print(json.dumps(result, indent=2))

# Validation summary
print("\n" + "=" * 60)
print("VALIDATION SUMMARY")
print("=" * 60)
items = result.get("items", [])
total = result.get("parsedTotal", 0)
conf = result.get("confidence", {})
print(f"Engine:        {result.get('engine', 'unknown')}")
print(f"Items found:   {len(items)}")
for item in items:
    print(f"  - {item['rawName']:<30} qty={item['quantity']:>3}  price=${item['price']:>10.2f}  conf={item['confidence']:.2f}")
print(f"Item Sum:      ${result.get('itemSum', 0):,.2f}")
print(f"Parsed Total:  ${total:,.2f}")
print(f"Overall Conf:  {conf.get('overall_confidence', 0):.3f}")
print(f"Reliable:      {conf.get('reliable', False)}")
print(f"Validation:    {result.get('validation', {}).get('message', 'N/A')}")

# Check for the bug
if total > 10_000_000:
    print("\n⚠️  BUG DETECTED: Total is suspiciously large!")
else:
    print(f"\n✅ Total ${total:,.2f} is within reasonable range")
