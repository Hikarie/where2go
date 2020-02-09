# https://pythonhosted.org/face_recognition/_modules/face_recognition/api.html

import face_recognition
import os
from PIL import Image

def recognition(file):
    image = face_recognition.load_image_file(file)
    face_locations = face_recognition.face_locations(image)

    n = 0

    # 如果这张照片不存在人脸，将他删除
    if len(face_locations) == 0:
        print("照片"+str(file)+"被删除。")
        os.remove(file)

    elif not os.path.exists('face'):
        os.mkdir('face')
    for i in range(len(face_locations)):
        # 打印出每张人脸对应四条边在图片中的位置(top、right、bottom、left)
        top, right, bottom, left = face_locations[i]
        # You can access the actual face itself like this:
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        pil_image.save('face/'+file[:-4]+'-'+str(i+1)+".jpg")
        n += 1
    return n

print("当前位置："+os.getcwd())
dirlist = os.listdir()
for dir in dirlist:
    if dir == ".vscode":
        continue
    if os.path.isdir(dir):
        print("正在对照片集 "+str(dir)+" 进行操作...")
        os.chdir(dir)
        filelist = os.listdir()
        count = 0 
        for f in filelist:
            if os.path.isfile(f):
                count += recognition(f)
        print("照片集"+str(dir)+"筛选完毕！提取人脸"+str(count)+"张")