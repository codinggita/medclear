import cv2
import numpy as np

def preprocess_image(image_input) -> np.ndarray:
    if isinstance(image_input, bytes):
        nparr = np.frombuffer(image_input, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    else:
        image = image_input
        
    if image is None:
        raise ValueError("Failed to decode image input")
    
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image
    
    denoised = cv2.fastNlMeansDenoising(gray, h=10)
    blurred = cv2.GaussianBlur(denoised, (5, 5), 0)
    
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )
    
    return thresh

def deskew_image(image: np.ndarray) -> np.ndarray:
    try:
        coords = np.column_stack(np.where(image > 0))
        if len(coords) == 0:
            return image
        
        angle = cv2.minAreaRect(coords)[-1]
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle
        
        if abs(angle) < 0.5:
            return image
        
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(image, matrix, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        
        return rotated
    except Exception:
        return image

def enhance_contrast(image: np.ndarray) -> np.ndarray:
    try:
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        return clahe.apply(image)
    except Exception:
        return image