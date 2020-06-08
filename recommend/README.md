# 数据库表设计

## 评分表

`ratings`

存放用户评分记录

|  字段名  | 类型  | 主键/外键 | 是否唯一 |   备注   |
| :------: | :---: | :-------: | :------: | :------: |
|    id    |  int  |   主键    |    是    | 逻辑主键 |
| user_id  |  int  |   外键    |    否    |  用户id  |
| sight_id |  int  |   外键    |    否    |  景点id  |
|  rating  | float |    无     |    否    |   评分   |

## 推荐表

`recommend`

存放推荐信息，每个用户推荐的五个景点

|  字段名   | 类型 | 主键/外键 | 是否唯一 |   备注    |
| :-------: | :--: | :-------: | :------: | :-------: |
|  user_id  | int  |   主键    |    是    |  用户id   |
| sight_id1 | int  |    无     |    否    | 推荐景点1 |
| sight_id2 | int  |    无     |    否    | 推荐景点2 |
| sight_id3 | int  |    无     |    否    | 推荐景点3 |
| sight_id4 | int  |    无     |    否    | 推荐景点4 |
| sight_id5 | int  |    无     |    否    | 推荐景点5 |

# 推荐算法

1. 利用余弦相似度计算用户之间的相似度

```python
def calCosineSimilarity(list1, list2):
    res = 0
    denominator1 = 0
    denominator2 = 0
    for (val1, val2) in zip(list1, list2):
        res += (val1 * val2)
        denominator1 += val1 ** 2
        denominator2 += val2 ** 2
    return res / (math.sqrt(denominator1 * denominator2))
```

然后计算用户之间的相似度矩阵

```python
userSimMatrix = np.zeros((len(ratingValues), len(ratingValues)), dtype=np.float32)
for i in range(len(ratingValues) - 1):
    for j in range(i + 1, len(ratingValues)):
        userSimMatrix[i, j] = calCosineSimilarity(ratingValues[i], ratingValues[j])
        userSimMatrix[j, i] = userSimMatrix[i, j]
```

找到与每个用户最相近的K个用户，用这K个用户的喜好来对目标用户进行推荐，这里K=10

```python
userMostSimDict = dict()
for i in range(len(ratingValues)):
    userMostSimDict[i] = sorted(enumerate(list(userSimMatrix[i])), key=lambda x: x[1], reverse=True)[:10]
```

根据最相似的10个用户，计算出用户没有看过的景点的推荐评分

```python
userRecommendValues = np.zeros((len(ratingValues), len(ratingValues[0])), dtype=np.float32)

for i in range(len(ratingValues)):
    for j in range(len(ratingValues[i])):
        if ratingValues[i][j] == 0:
            val = 0
            for (user, sim) in userMostSimDict[i]:
                val += (ratingValues[user][j] * sim)
            userRecommendValues[i, j] = val
```

将其排序，得到最值得推荐的五个景点

```python
userRecommendDict = dict()
for i in range(len(ratingValues)):
    userRecommendDict[i] = sorted(enumerate(list(userRecommendValues[i])), key=lambda x: x[1], reverse=True)[:5]
```

