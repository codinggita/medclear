import requests

def test_endpoint():
    url = "http://localhost:8000/ocr/extract"
    files = {'file': open('sample-bill.png', 'rb')}
    
    try:
        response = requests.post(url, files=files, timeout=30)
        print(f"Status: {response.status_code}")
        data = response.json()
        if data.get('success'):
            ocr_data = data['data']
            print(f"Items Found: {len(ocr_data['items'])}")
            for item in ocr_data['items']:
                print(f"  - {item['rawName']}: {item['price']}")
            print(f"Total: {ocr_data['parsedTotal']}")
        else:
            print(f"Failed: {data.get('error')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_endpoint()
