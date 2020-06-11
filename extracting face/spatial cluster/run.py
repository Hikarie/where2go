'''
· 预处理
· 将照片的经纬度、拍摄时间写入CSV
· 跳过没有经纬度的照片
'''

__author__ = 'zx'
__version__ = '0.1'
__date__ = '2019/11/27'
__modify__ = '2020/2/7'

import exifread
import re
import csv
import os
import time
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
from collections import Counter

import sys
import getopt

import pandas as pd

# 获取照片中经纬度信息和拍摄时间
def get_gps_message(apath):
    f = open(apath, 'rb')
    imagetext = exifread.process_file(f)

    n = str()
    w = str()

    for q in imagetext:

        if q == "GPS GPSLongitude":
            n = imagetext[q].printable
            n = to_decimal(n, 'lon')
            # print("GPS经度 =", imagetext[q],imagetext['GPS GPSLatitudeRef'])

        elif q =="GPS GPSLatitude":
            w = imagetext[q].printable
            w = to_decimal(w, 'lat')
            # print("GPS纬度 =",imagetext[q],imagetext['GPS GPSLongitudeRef'])

        # elif q =='Image DateTime':
        #     time = imagetext[q].printable
        #     # print("拍摄时间 =",imagetext[q])
    return n, w


# 转换为十进制 + 清洗数据
def to_decimal(val, type):

    n = val.strip('[]').replace(" ","").replace("/",",").split(",")

    # 清洗异常数据
    if type == 'lon':
        if float(n[0])<0.0 or float(n[0])>=180.0:
            return ''
    else:
        if float(n[0])<0.0 or float(n[0])>=90.0:
            return ''

    # 转为十进制
    if len(n) is 4:
        res = float(n[0]) + float(n[1])/60 + (float(n[2])/float(n[3]))/3600
    else:
        res = float(n[0]) + float(n[1])/60 + float(n[2])/3600

    if res == 0.0:
        return ''

    return str(res)


# 读取照片
def read_image(dirname):

    flist = os.listdir(dirname)

    # if path is None:
    #     path = '../data.csv'

    # with open(path, 'w', newline='') as csvfile:

        # writer = csv.writer(csvfile)

    data = pd.DataFrame(columns=('lon','lat'))
    names = list()

    for f in flist:
        if os.path.isdir(f):
            read_image(f)
        else:
            n, w = get_gps_message(f)  # 获得经纬度、时间信息
            # print([f[:-4], n, w, time])
            if len(n) is not 0:
                names.append(f)
                a = {"lon":n, "lat":w}
                data = data.append(a, ignore_index=True)
                # writer.writerow([f[:-4], n, w])     # 填表
            else:
                os.remove(f)  #删除没有信息的照片
    return data, names


def max_list(lt):
    temp = 0
    for i in lt:
        if lt.count(i) > temp:
            res = i
            temp = lt.count(i)
    return res

def cluster(X, names):
    db_model = DBSCAN(eps=0.05, min_samples=5).fit(X)
    labels = db_model.labels_
    res = max_list(labels.tolist())
    n = 0
    for i in range(len(labels)):
        if labels[i] != res:
            f = names[i]
            print(f)
            os.remove(f)
            n += 1
    # plt.xlabel("latitude")
    # plt.ylabel("longitude")
    # plt.scatter(X[:, 0], X[:, 1], c=labels)
    # plt.show()
    return n

root = os.getcwd()
print("当前位置："+root)
dirlist = os.listdir()
for dir in dirlist:
    if dir == ".vscode":
        continue
    if os.path.isdir(dir):
        print("正在对照片集 "+str(dir)+" 进行空间聚类...")
        os.chdir(dir)
        apath = os.path.join(root, dir)
        data, names = read_image(apath)
        count = cluster(data, names)
        print("照片集 "+str(dir)+" 筛选完毕！删除"+str(count)+"张")




# if __name__ == '__main__':
#     def usage():
#         print("==================================================================================================")
#         print("usage")
#         print("-o : output path (or use output=)")
#         print("-d : directory where the photo set exist(or use dir=)")
#         print("-t: if you want to get time messages(or use --time)")
#         print("==================================================================================================")
#     try:
#         opts, args = getopt.getopt(sys.argv[1:],"o:d:t",["output=","dir=","time"])
#     except:
#         usage()
#         exit()

#     path = None
#     directory = None
#     date = False

#     for o,a in opts:
#         if o in("-o","output="):
#             path = a
#         if o in("-d","dir="):
#             directory = a
#         if o in("--time"):
#             date = True

#     start = time.clock()
#     print("Writing in "+path)
#     read_image(directory, path, date)
#     elapsed = (time.clock() - start)
#     print("finished! used time: " + str(elapsed))