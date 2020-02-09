# coding:utf-8
import getopt
import flickrapi
import sys

"""
has_geo (Optional)
Any photo that has been geotagged, or if the value is "0" any photo that has not been geotagged.
Geo queries require some sort of limiting agent in order to prevent the database from crying.
This is basically like the check against "parameterless searches" for queries without a geo component.
"""


class urlManage:
    def __init__(self):
        api_key = '126b14b543118b31630dbc2dfcac1e8b'
        api_secret = '793d7303ca14ac9b'
        self.flickr = flickrapi.FlickrAPI(api_key, api_secret, cache=True)

    def getUrl(self, lat, lon, radius, num, output_file):
        """
        获取输入的经纬度，以该点为圆心，radius为半径所在圆的区域内的图片url集合
        @param lat: 纬度 十进制
        @param lon: 经度 十进制
        @param radius: 半径 单位 km
        @param num: 数量
        @param output_file: 输出文件名称，默认url.txt
        """
        if not output_file:
            output_file = "url.txt"
        try:
            photos = self.flickr.walk(
                has_geo=True,
                lat=lat,
                lon=lon,
                radius=radius,
                geo_context=2,
                extras='url_o')
        except Exception as e:
            print("error")
        count = 0
        with open(output_file, "w") as f:
            for photo in photos:
                url = photo.get('url_o')
                if str(url) == "None":
                    print("it's None!")
                else:
                    print(url)
                    f.write(url + "\n")
                    count += 1
                    if count >= num:
                        break


def main(argv):
    num = None
    lat = None
    lon = None
    radius = None
    output_file = None
    try:
        opts, args = getopt.getopt(
            argv, "h:n:x:y:r:o", [
                "num=", "lat=", "lon=", "radius=", "output="])
    except getopt.GetoptError:
        print('urlManage.py -y <lat> -x <lon> -n <num> -r <radius>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('urlManage.py -lat <lat> -lon<lon> -n <num> -o <output>')
            sys.exit()
        elif opt in ("-n", "--num"):
            num = arg
        elif opt in ("-o", "--output_file"):
            output_file = arg
        elif opt in ("-y", "--latitude"):
            lat = arg
        elif opt in ("-x", "--longitude"):
            lon = arg
        elif opt in ("-r", "--radius"):
            radius = arg
    print(lat)
    print(lon)
    print(num)
    print(radius)
    lat = float(lat)
    lon = float(lon)
    num = int(num)
    radius = int(radius)
    print(output_file)
    urlmanage = urlManage()
    urlmanage.getUrl(lat, lon, radius, num, output_file)


if __name__ == '__main__':
    main(sys.argv[1:])
