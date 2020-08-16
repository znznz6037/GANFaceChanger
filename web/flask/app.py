from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import logging, json, requests,datetime, time, base64
import os, threading, sys
import subprocess

port = 5000
log = logging.basicConfig(filename='testsvr.log', level=logging.INFO)
app = Flask(__name__)
CORS(app)
api = Api(app)
UPLOAD_DIR="./data/celeba/images"
RESULT_DIR="./static/image/results"
app.config['UPLOAD_DIR'] = UPLOAD_DIR
app.config['RESULT_DIR'] = RESULT_DIR
app.config['JSON_AS_ASCII'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

image = 'static/image/results/1-images.jpg'

@app.route('/')
def Home():
    return render_template('home.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
     if request.method == 'POST':
        if os.path.isfile(image):
           os.remove(image)
        f = request.files['file']
        fname = secure_filename(f.filename)
        fname.encode('utf-8')
        path = os.path.join(app.config['UPLOAD_DIR'], fname)
        #image = Image.open(UPLOAD_DIR + fname)
        #resize_image = image.resize((178, 218))
        #resize_image.save(fname)
        #subprocess.call(["autocrop", "-i", UPLOAD_DIR, "-o", UPLOAD_DIR + '/images', "-w", "256", "-H" ,"256"])
        f.save(path)
        print(path)
        subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"5", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Eyeglasses", "Bald", "Brown_Hair", "Male", "Young", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"])
        #subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "180000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Eyeglasses", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"])
        time.sleep(2)
        #result = os.path.join(app.config['RESULT_DIR'], secure_filename('1-images.jpg'))
        data = {}
        with open(image, mode='rb') as file:
           img = file.read()
        data['img'] = base64.b64encode(img).decode('utf8')
        return jsonify(data)

@app.route('/result', methods=['GET', 'POST'])
def post():
    data = {}
    with open(image, mode='rb') as file:
        img = file.read()
    data['img'] = base64.b64encode(img).decode('utf8')
    return jsonify(data)

@app.route('/download', methods=['GET', 'POST'])
def download():
    return send_file(image, as_attachment=True)

if __name__=='__main__':
    logging.info('start server')
    app.run('0.0.0.0', port=port, debug=True)
