
import requests
from threading import Thread
import os
import time
import queue
headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0"}

path = os.getcwd()
try:
    os.mkdir("image")
except BaseException:
    pass

with open("url16.txt", 'r') as f:
    lines = f.readlines()

j=0
lines=set(lines)
q=queue.Queue()
for line in lines:
    q.put(line)
def fetch_img_func(q):
    while True:
        try:
            url = q.get_nowait()
            i = q.qsize()
        except Exception as e:
            print (e)
            break
        print("当前还有{}个任务".format(i))
        try:
            res = requests.get(url, headers=headers,stream=True)
            if res.status_code == 200:
                save_img_path ='image/{}.jpg'.format(i)
                with open(save_img_path, 'wb') as f:
                    f.write(res.content)
        except Exception:
            q.put(url)
            print("本次失败，已放回")

num=10
threads =[]
for i  in range(num):
    t = Thread(target=fetch_img_func, args=(q, ))
    threads.append(t)
for t in threads:
    t.start()
for t in threads:
    t.join()


