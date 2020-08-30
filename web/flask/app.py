from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from OpenSSL import SSL
from werkzeug.utils import secure_filename
from PIL import Image
import logging, json, requests,datetime, time, base64
import os, threading, sys
import subprocess

port = 5000 
log = logging.basicConfig(filename='testsvr.log', level=logging.INFO)
app = Flask(__name__)
CORS(app, support_credentials=True)
api = Api(app)
FUPLOAD_DIR="./stargan/data/celeba/images"
AUPLOAD_DIR="./UGATIT-master/imgs"
RESULT_DIR="./static/image/results"
ANIME_RESULT_DIR="./UGATIT-master/result/image.jpg"
app.config['FUPLOAD_DIR'] = FUPLOAD_DIR
app.config['AUPLOAD_DIR'] = AUPLOAD_DIR
app.config['RESULT_DIR'] = RESULT_DIR
app.config['ANIME_RESULT_DIR'] = ANIME_RESULT_DIR
app.config['JSON_AS_ASCII'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

image = './stargan/static/image/results/1-images.jpg'
animeFname = ''

@app.route('/')
def Home():
    return render_template('home.html')

@app.route('/upload', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def upload():
     if request.method == 'POST':
        if os.path.isfile(image):
           os.remove(image)
        style = request.form['style']
        print(style)
        f = request.files['file']
        fname = secure_filename(f.filename)
        fname.encode('utf-8')
        path = os.path.join(app.config['FUPLOAD_DIR'], fname)
        f.save(path)
        print(path)
        img = Image.open(path)
        img_resize = img.resize((256, 256), Image.LANCZOS)
        img_resize.save(path)

        if style == '안경':
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "180000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Eyeglasses", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        elif style == '하얀 피부':
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "199000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Pale_Skin", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        elif style == '염소 수염': 
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "198000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Goatee", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        elif style == '화장': 
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "197000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Wearing_Lipstick", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        elif style == '미소': 
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"1", "--test_iters", "196000", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Smiling", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        
        else:
            subprocess.call(["python3", "main.py", "--mode", "test", "--dataset", "CelebA", "--image_size", "128", "--c_dim" ,"5", "--filename", fname, "--log_step", "1", "--sample_step", "1", "--lr_update_step", "1", "--selected_attrs","Eyeglasses", "Bald", "Brown_Hair", "Male", "Young", "--model_save_dir=stargan_celeba_128/models", "--result_dir=static/image/results"], cwd='./stargan')
        data = {}
        with open(image, mode='rb') as file:
           img = file.read()
        data['img'] = base64.b64encode(img).decode('utf8')
        return jsonify(data)

@app.route('/uploadAnime', methods=['GET', 'POST'])
def anime():
    if request.method == 'POST':
        uploadImg = './UGATIT-master/imgs/image.jpg'
        animeImg = './UGATIT-master/result/image.jpg'
        if os.path.isfile(uploadImg):
            os.remove(uploadImg)
        f = request.files['file']
        animeFname = secure_filename(f.filename)
        animeFname.encode('utf-8')
        path = os.path.join(app.config['AUPLOAD_DIR'], 'image.jpg')
        f.save(path)
        print(path)
        img = Image.open(uploadImg)
        img_resize = img.resize((500, 500), Image.LANCZOS)
        img_resize.save(uploadImg)

        subprocess.call(['python3', 'test.py'], cwd='./UGATIT-master')
        data = {}
        with open(animeImg, mode='rb') as file:
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

@app.route('/faceDownload', methods=['GET', 'POST'])
def download():
    return send_file('./stargan' + image, as_attachment=True)

@app.route('/animeDownload', methods=['GET', 'POST'])
def animeDownload():
    return send_file(ANIME_RESULT_DIR, '1.jpg', as_attachment=True)

if __name__=='__main__':
    logging.info('start server')
    app.run('0.0.0.0', port=port, debug=True, ssl_context=('/etc/letsencrypt/live/psbgrad.duckdns.org/fullchain.pem', '/etc/letsencrypt/live/psbgrad.duckdns.org/privkey.pem'))
