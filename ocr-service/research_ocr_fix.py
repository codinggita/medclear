import re

PRICE_PATTERN = re.compile(r'^\d*[.,]?\d{2}$|^\d+$')

def test_parsing(text):
    clean_text = text.replace(',', '').replace('₹', '').replace('Rs.', '').replace('Rs', '').strip()
    match = PRICE_PATTERN.match(clean_text)
    print(f"Original: '{text}', Cleaned: '{clean_text}', Match: {match is not None}")

samples = ["150.00", "₹150.00", "Rs. 150", "15,000", "₹15,000.00", "INR 500"]

for s in samples:
    test_parsing(s)
