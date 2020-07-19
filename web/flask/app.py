from flask import Flask, render_template, request, jsonify
from flask_restful import Resource, Api
from flask.views import MethodView
from werkzeug.utils import secure_filename

import logging, json, datetime, time
import os, threading, sys
import subprocess

port = 5000
log = logging.basicConfig(filename='testsvr.log', level=logging.INFO)
app = Flask(__name__)
api = Api(app)
UPLOAD_DIR="./image"
app.config['UPLOAD_DIR'] = UPLOAD_DIR
app.config['JSON_AS_ASCII'] = False

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
        os.chdir('./stargan-master')
        subprocess.call(["python", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"5", "--model_save_step", "1", "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Black_Hair", "Blond_Hair", "Brown_Hair", "Male", "Young", "--model_save_dir=stargan_celeba_128/models", "--result_dir=image/results"])
        os.chdir('../')
        return render_template('result.html')
        #return 'File upload complete (%s)' % path

if __name__=='__main__':
    logging.info('start server')
    app.run('0.0.0.0', port=port, debug=True)


	#os.chdir('/stargan-master')
        #subprocess.call(["python", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"5", "--selected_attrs", "Black_Hair", "Blond_Hair", "Brown_Hair", "Male", "Young", "--model_save_dir='stargan_celeba_128/models'", "--result_dir='stargan_celeba_128/results'"])
     	#os.chdir('../')

