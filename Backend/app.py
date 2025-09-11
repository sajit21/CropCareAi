import sys
import json
import tensorflow as tf
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import cv2
from functools import reduce
import os

tf.get_logger().setLevel('ERROR')

script_dir = os.path.dirname(os.path.abspath(__file__))

try:
    leaf_model_path = os.path.join(script_dir, 'leafornot.keras')
    disease_model_path = os.path.join(script_dir, 'new_mod.keras')
    
    print(f"Looking for leaf model at: {leaf_model_path}", file=sys.stderr)
    print(f"Looking for disease model at: {disease_model_path}", file=sys.stderr)
    
    if not os.path.exists(leaf_model_path):
        raise FileNotFoundError(f"Leaf model not found at: {leaf_model_path}")
    if not os.path.exists(disease_model_path):
        raise FileNotFoundError(f"Disease model not found at: {disease_model_path}")
    
    print("Files found, loading models...", file=sys.stderr)
    
    leaf_model = tf.keras.models.load_model(leaf_model_path)
    model = tf.keras.models.load_model(disease_model_path)
    
    print(" Models loaded successfully!", file=sys.stderr)
    
except Exception as e:
    print(json.dumps({"error": f"Failed to load models: {str(e)}"}))
    sys.exit(1)

classes = [
    'Apple-Apple scab', 'Apple-Black rot', 'Apple-Cedar apple rust', 'Apple-Healthy',
    'Blueberry-Healthy', 'Cherry-Healthy', 'Cherry-Powdery mildew',
    'Corn-Cercospora leaf spot Gray leaf spot', 'Corn-Common rust', 'Corn-Healthy',
    'Corn-Northern leaf blight', 'Grape-Black rot', 'Grape-Esca black measles',
    'Grape-Healthy', 'Grape-Leaf blight', 'Lemon-Anthracnose', 'Lemon-Bacterial Blight',
    'Lemon-Citrus Canker', 'Lemon-Deficiency Leaf', 'Lemon-Dry Leaf', 'Lemon-Healthy',
    'Lemon-Sooty Mould', 'Lemon-Spider Mites', 'Orange-Haunglongbing',
    'Peach-Bacterial spot', 'Peach-Healthy', 'Pepper-Bacterial spot', 'Pepper-Healthy',
    'Potato-Early blight', 'Potato-Healthy', 'Potato-Late blight', 'Raspberry-Healthy',
    'Rice-Brown Spot', 'Rice-Healthy', 'Rice-Leaf Blast', 'Rice-Neck Blast',
    'Soybean-Healthy', 'Squash-Powdery mildew', 'Strawberry-Healthy',
    'Strawberry-Leaf scorch', 'Tomato-Bacterial spot', 'Tomato-Early blight',
    'Tomato-Healthy', 'Tomato-Late blight', 'Tomato-Leaf mold', 'Tomato-Mosaic virus',
    'Tomato-Septoria leaf spot', 'Tomato-Spider mites', 'Tomato-Target spot',
    'Tomato-Yellow leaf curl virus'
]

remedy_dict = {
    'Apple-Apple scab': 'Use resistant varieties; apply fungicides such as Captan; remove fallen leaves to reduce spores.',
    'Apple-Black rot': 'Prune infected branches; apply fungicides; remove mummified fruit and debris.',
    'Apple-Cedar apple rust': 'Remove nearby cedar trees; apply protective fungicides before infection.',
    'Apple-Healthy': 'No treatment needed.',
    'Blueberry-Healthy': 'No treatment needed.',
    'Cherry-Healthy': 'No treatment needed.',
    'Cherry-Powdery mildew': 'Apply sulfur fungicides; ensure good air circulation; avoid overhead watering.',
    'Corn-Cercospora leaf spot Gray leaf spot': 'Crop rotation; resistant hybrids; fungicide sprays if necessary.',
    'Corn-Common rust': 'Use resistant varieties; fungicides if severe.',
    'Corn-Healthy': 'No treatment needed.',
    'Corn-Northern leaf blight': 'Use resistant hybrids; crop rotation; timely fungicides.',
    'Grape-Black rot': 'Prune infected parts; fungicide sprays; remove mummified fruit.',
    'Grape-Esca black measles': 'Prune infected wood; avoid vine stress; preventive fungicides.',
    'Grape-Healthy': 'No treatment needed.',
    'Grape-Leaf blight': 'Remove infected leaves; fungicides; improve airflow.',
    'Lemon-Anthracnose': 'Apply copper-based fungicides; prune infected parts; avoid wet foliage.',
    'Lemon-Bacterial Blight': 'Copper sprays; remove infected parts; avoid overhead watering.',
    'Lemon-Citrus Canker': 'Remove infected trees; copper sprays; quarantine new plants.',
    'Lemon-Deficiency Leaf': 'Apply balanced fertilizers as needed.',
    'Lemon-Dry Leaf': 'Improve watering; mulch; avoid drought stress.',
    'Lemon-Healthy': 'No treatment needed.',
    'Lemon-Sooty Mould': 'Control aphids and scales; wash leaves to remove mold.',
    'Lemon-Spider Mites': 'Use miticides; encourage natural predators; avoid drought.',
    'Orange-Haunglongbing': 'Remove infected trees; control psyllid vectors with insecticides; use disease-free plants.',
    'Peach-Bacterial spot': 'Copper sprays; prune infected branches; use resistant varieties.',
    'Peach-Healthy': 'No treatment needed.',
    'Pepper-Bacterial spot': 'Use certified seeds; copper sprays; crop rotation.',
    'Pepper-Healthy': 'No treatment needed.',
    'Potato-Early blight': 'Crop rotation; fungicides like chlorothalonil; remove infected debris.',
    'Potato-Healthy': 'No treatment needed.',
    'Potato-Late blight': 'Use resistant varieties; fungicide sprays; avoid overhead irrigation.',
    'Raspberry-Healthy': 'No treatment needed.',
    'Rice-Brown Spot': 'Use resistant varieties; balanced fertilization; fungicides if severe.',
    'Rice-Healthy': 'No treatment needed.',
    'Rice-Leaf Blast': 'Resistant varieties; fungicides; avoid excessive nitrogen.',
    'Rice-Neck Blast': 'Same as Leaf Blast; ensure field drainage.',
    'Soybean-Healthy': 'No treatment needed.',
    'Squash-Powdery mildew': 'Apply sulfur or potassium bicarbonate fungicides; improve airflow; avoid overhead watering.',
    'Strawberry-Healthy': 'No treatment needed.',
    'Strawberry-Leaf scorch': 'Remove infected leaves; fungicides; improve air circulation.',
    'Tomato-Bacterial spot': 'Copper sprays; use certified seeds; avoid overhead irrigation.',
    'Tomato-Early blight': 'Crop rotation; fungicides; remove infected debris.',
    'Tomato-Healthy': 'No treatment needed.',
    'Tomato-Late blight': 'Use resistant varieties; fungicides; field sanitation.',
    'Tomato-Leaf mold': 'Fungicides; avoid wet foliage; improve airflow.',
    'Tomato-Mosaic virus': 'Remove infected plants; control aphids; use resistant varieties.',
    'Tomato-Septoria leaf spot': 'Fungicides; remove infected leaves; crop rotation.',
    'Tomato-Spider mites': 'Miticides; encourage predators; avoid drought stress.',
    'Tomato-Target spot': 'Fungicides; remove debris; crop rotation.',
    'Tomato-Yellow leaf curl virus': 'Remove infected plants; control whitefly; use resistant varieties.'
}

def smart_leaf_grabcut_from_array(img):
    try:
        if img is None or img.size == 0:
            return np.zeros((100, 100, 3), dtype=np.uint8)
        
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        masks = [
            cv2.inRange(hsv, (25, 40, 40), (85, 255, 255)),    # Green
            cv2.inRange(hsv, (15, 50, 50), (35, 255, 255)),    # Yellow
            cv2.inRange(hsv, (0, 50, 20), (20, 255, 200)),     # Brown
            cv2.inRange(hsv, (0, 60, 60), (10, 255, 255))      # Red
        ]
        leaf_mask = reduce(cv2.bitwise_or, masks)
        bgModel = np.zeros((1, 65), np.float64)
        fgModel = np.zeros((1, 65), np.float64)
        
        if np.count_nonzero(leaf_mask) < 100:
            grabcut_mask = np.zeros(img.shape[:2], dtype=np.uint8)
            rect = (10, 10, img.shape[1] - 20, img.shape[0] - 20)
            cv2.grabCut(img, grabcut_mask, rect, bgModel, fgModel, 5, cv2.GC_INIT_WITH_RECT)
        else:
            grabcut_mask = np.full(img.shape[:2], cv2.GC_PR_BGD, dtype=np.uint8)
            grabcut_mask[leaf_mask > 0] = cv2.GC_PR_FGD
            h, w = grabcut_mask.shape
            grabcut_mask[h//3:2*h//3, w//3:2*w//3] = cv2.GC_FGD
            fg_count = np.count_nonzero((grabcut_mask == cv2.GC_FGD) | (grabcut_mask == cv2.GC_PR_FGD))
            bg_count = np.count_nonzero((grabcut_mask == cv2.GC_BGD) | (grabcut_mask == cv2.GC_PR_BGD))
            if fg_count < 100 or bg_count < 100:
                grabcut_mask = np.zeros(img.shape[:2], dtype=np.uint8)
                rect = (10, 10, img.shape[1] - 20, img.shape[0] - 20)
                cv2.grabCut(img, grabcut_mask, rect, bgModel, fgModel, 5, cv2.GC_INIT_WITH_RECT)
            else:
                cv2.grabCut(img, grabcut_mask, None, bgModel, fgModel, 5, cv2.GC_INIT_WITH_MASK)
        
        final_mask = np.where((grabcut_mask == cv2.GC_FGD) | (grabcut_mask == cv2.GC_PR_FGD), 1, 0).astype(np.uint8)
        result = img_rgb * final_mask[:, :, np.newaxis]
        return result
    except Exception as e:
        print(f"Segmentation error: {e}", file=sys.stderr)
        return np.zeros((100, 100, 3), dtype=np.uint8)

def preprocess_image_array(img_rgb):
    img_pil = Image.fromarray(img_rgb).resize((128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(img_pil) / 255.0
    input_arr = np.expand_dims(input_arr, axis=0)
    return input_arr

def is_leaf(img_pil):
    try:
        img = img_pil.resize((128, 128))
        input_arr = tf.keras.preprocessing.image.img_to_array(img) / 255.0
        input_arr = np.expand_dims(input_arr, axis=0)
        prediction = leaf_model.predict(input_arr, verbose=0)[0][0]
        return prediction > 0.5
    except Exception as e:
        print(f"Leaf detection error: {e}", file=sys.stderr)
        return True  # Default to assuming it's a leaf

def predict(image_url):
    try:
        print(f"Downloading image from: {image_url}", file=sys.stderr)
        
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()
        img_pil = Image.open(BytesIO(response.content)).convert('RGB')
        
        print("Image downloaded successfully", file=sys.stderr)

        if not is_leaf(img_pil):
            return {
                "error": "Uploaded image is not a leaf. Please upload a clear leaf image."
            }

        print("Image identified as leaf, processing...", file=sys.stderr)

        img_cv = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

        segmented_img = smart_leaf_grabcut_from_array(img_cv)

        if segmented_img.sum() == 0:
            input_arr = img_pil.resize((128, 128))
            input_arr = tf.keras.preprocessing.image.img_to_array(input_arr) / 255.0
            input_arr = np.expand_dims(input_arr, axis=0)
            print("Using original image (segmentation failed)", file=sys.stderr)
        else:
            input_arr = preprocess_image_array(segmented_img)
            print("Using segmented image", file=sys.stderr)

        # Predict disease
        print("Making disease prediction...", file=sys.stderr)
        predictions = model.predict(input_arr, verbose=0)
        result_index = int(np.argmax(predictions))
        confidence = float(predictions[0][result_index])
        disease = classes[result_index]

        remedy = remedy_dict.get(disease, "No remedy information available for this disease.")

        print(f"Prediction complete: {disease} (confidence: {confidence:.2f})", file=sys.stderr)

        return {
            "disease": disease,
            "remedy": remedy,
            "confidence": confidence
        }
        
    except Exception as e:
        print(f"Prediction error: {e}", file=sys.stderr)
        return {"error": f"Prediction failed: {str(e)}"}

if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            result = {"error": "Usage: python app.py <image_url>"}
        else:
            image_url = sys.argv[1]
            result = predict(image_url)
        
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)