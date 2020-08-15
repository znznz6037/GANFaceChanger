from flask import Flask, render_template, request, jsonify, redirect
from flask_restful import Resource, Api
from flask.views import MethodView
from werkzeug.utils import secure_filename

import logging, json, datetime, time
import os, threading, sys
import subprocess

port = 5000
log = logging.basicConfig(filename='testsvr.log', level=logging.INFO)
#app = Flask(__name__, static_url_path="", static_folder = "static")
app = Flask(__name__)
api = Api(app)
UPLOAD_DIR="./data/celeba/images"
RESULT_DIR="./static/image/results"
app.config['UPLOAD_DIR'] = UPLOAD_DIR
app.config['RESULT_DIR'] = RESULT_DIR
app.config['JSON_AS_ASCII'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

image = 'static/image/results/1-images.jpg'
if os.path.isfile(image):
    os.remove(image)

@app.route('/')
def Home():
    return render_template('home.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        fname = secure_filename(f.filename)
        fname.encode('utf-8')
        path = os.path.join(app.config['UPLOAD_DIR'], fname)
        f.save(path)
        print(path)
        subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"5", "--model_save_step", "1", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Black_Hair", "Blond_Hair", "Brown_Hair", "Male", "Young", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"])
        time.sleep(2)
        #result = os.path.join(app.config['RESULT_DIR'], secure_filename('1-images.jpg'))
        image.encode('utf-8')
        return render_template('result.html', user_image=image)

if __name__=='__main__':
    logging.info('start server')
    app.run('0.0.0.0', port=port, debug=True)
