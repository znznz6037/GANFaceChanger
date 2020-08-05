import requests, json
import shutil, time

def moveImage(fdir, str):
    if(str["anger"]):
        shutil.move(fdir, './dataset/anger')
    elif(str["contempt"]):
        shutil.move(fdir, './dataset/contemptuous')
    elif(str["disgust"]):
        shutil.move(fdir, './dataset/disgusted')
    elif(str["fear"]):
        shutil.move(fdir, './dataset/fearful')
    elif(str["happiness"]):
        shutil.move(fdir, './dataset/happy')
    elif(str["neutral"]):
        shutil.move(fdir, './dataset/neutral')
    elif(str["sadness"]):
        shutil.move(fdir, './dataset/sad')
    elif(str["surprise"]):
        shutil.move(fdir, './dataset/surprised')

subscription_key = 'Input your key'
uri_base = 'Input your endpoint url'
    # Request headers.
headers = {
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': subscription_key,
}
    # Request parameters.
params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
}

for i in range(1, 7377):
    filename = str(i) + '.jpg'
    filedir = './dataset/'
    filedir += filename
    f = open(filedir, "rb")
    body = f.read()
    f.close()
    
    body = body
    try:
        response = requests.request('POST', uri_base + '/face/v1.0/detect', data=body, headers=headers, params=params)
        parsed = json.loads(response.text)
        print(parsed)
	    #age = parsed[0]['faceAttributes']["age"]
	    #print(age)
        emotion = parsed[0]['faceAttributes']["emotion"]
        print(emotion)
        moveImage(filedir, emotion)
        time.sleep(5)

    except Exception as e:
       print('Error:')
       print(e)
