# 安装

**版本要求：python3.6**

第一步：安装dlib
> pip install dlib-19.7.0-cp36-cp36m-win_amd64.whl

第二部：安装face_recognition
> pip install -i https://pypi.tuna.tsinghua.edu.cn/simple face_recognition

第三步：安装PIL
> pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pillow

# 运行
把face.py放在**和照片集同级的位置**，命令行直接python face.py即可。
- 程序会对该目录下每个照片集进行操作
- 会将照片集里不带人脸的照片删除
- 会裁剪出人脸图像放在face文件夹下
