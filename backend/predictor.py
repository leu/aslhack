from keras.models import load_model
import numpy as np
import cv2
import pickle

CLASSES = ["a", "b", "c", "d", "e", "help", "i love you", "no", "why", "water"]

image_x, image_y = 50, 50

def keras_process_image(img):
	img = cv2.resize(img, (image_x, image_y))
	img = np.array(img, dtype=np.float32)
	img = np.reshape(img, (1, image_x, image_y, 1))
	return img

def keras_predict(model, image):
	processed = keras_process_image(image)
	pred_probab = model.predict(processed)[0]
	pred_class = list(pred_probab).index(max(pred_probab))
	return max(pred_probab), pred_class

def get_hand_hist():
	with open("hist", "rb") as f:
		hist = pickle.load(f)
	return hist

def process(image):
    hist = get_hand_hist()
    x, y, w, h = 300, 100, 300, 300
    img = cv2.resize(image, (640, 480))
    dst = cv2.calcBackProject([img], [0, 1], hist, [0, 180, 0, 256], 1)
    disc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(10,10))
    cv2.filter2D(dst,-1,disc,dst)
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    im = cv2.filter2D(dst, -1, kernel)
    thresh = cv2.threshold(im,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
    thresh = cv2.merge((thresh,thresh,thresh))
    thresh = cv2.cvtColor(thresh, cv2.COLOR_BGR2GRAY)
    thresh = thresh[y:y+h, x:x+w]
    contours = cv2.findContours(thresh.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[0]
    return img, contours, thresh

savedModel = load_model('cnn_model_keras2.h5')

img = cv2.imread("temp.jpg")
processed, contours, thresh = process(img)
cv2.imwrite("heatmap.jpg", thresh)
contour = max(contours, key = cv2.contourArea)
x1, y1, w1, h1 = cv2.boundingRect(contour)
save_img = thresh[y1:y1+h1, x1:x1+w1]
if w1 > h1:
    save_img = cv2.copyMakeBorder(save_img, int((w1-h1)/2) , int((w1-h1)/2) , 0, 0, cv2.BORDER_CONSTANT, (0, 0, 0))
elif h1 > w1:
    save_img = cv2.copyMakeBorder(save_img, 0, 0, int((h1-w1)/2) , int((h1-w1)/2) , cv2.BORDER_CONSTANT, (0, 0, 0))

pred_probab, pred_class = keras_predict(savedModel, save_img)
text = CLASSES[pred_class]

print(text)

f = open("myfile.txt", "w")
f.write(text)
f.close()