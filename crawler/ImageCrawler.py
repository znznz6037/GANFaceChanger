from selenium import webdriver
from bs4 import BeautifulSoup
from urllib.request import urlretrieve
from urllib.parse import quote_plus
import os, urllib

saveDir = "./Image"

#Chrome Headless Mode
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
chrome_options.add_argument('--disable-gpu')


keyword = input('Input Keyword : ')
url = "https://www.google.co.in/search?q=" + keyword + "&source=lnms&tbm=isch"
browser = webdriver.Chrome('chromedriver.exe', options=chrome_options)
browser.get(url)

for i in range(10000):
    browser.execute_script("window.scrollTo(0, 10000);")

html = browser.page_source
soup = BeautifulSoup(html, 'html.parser')

imgLen = len(soup.findAll('img'))
img = soup.findAll('img')
browser.find_elements_by_tag_name('img')
num = 0
imgurl = []

for line in img:
     if str(line).find('data-src') != -1 and str(line).find('http') < 100:  
      imgurl.append(line['data-src'])
      num+=1

try:
    if not(os.path.isdir(saveDir)):
        os.makedirs(os.path.join(saveDir))
except OSError as e:
    if e.errno != errno.EEXIST:
        print("Failed to create directory!!!!!")
        raise

for i,src in zip(range(num),imgurl):
    urllib.request.urlretrieve(src, saveDir+"/"+str(i)+".jpg")
    print(i,"saved")

browser.quit()
