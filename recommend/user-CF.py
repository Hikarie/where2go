#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/6/1 16:41
# @Author  : Honey
# @Software: PyCharm


#
import math
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

from db import get_df,upload_data

ratingsDF = get_df()

print(ratingsDF)
trainRatingsDF, testRatingsDF = train_test_split(ratingsDF, test_size=0.2)

trainRatingsPivotDF = pd.pivot_table(trainRatingsDF[['user_id', 'sight_id', 'rating']], columns=['sight_id'],
                                     index=['user_id'], values='rating', fill_value=0)

ratingValues = trainRatingsPivotDF.values.tolist()


def calCosineSimilarity(list1, list2):
    res = 0
    denominator1 = 0
    denominator2 = 0
    for (val1, val2) in zip(list1, list2):
        res += (val1 * val2)
        denominator1 += val1 ** 2
        denominator2 += val2 ** 2
    return res / (math.sqrt(denominator1 * denominator2))


userSimMatrix = np.zeros((len(ratingValues), len(ratingValues)), dtype=np.float32)
for i in range(len(ratingValues) - 1):
    for j in range(i + 1, len(ratingValues)):
        userSimMatrix[i, j] = calCosineSimilarity(ratingValues[i], ratingValues[j])
        userSimMatrix[j, i] = userSimMatrix[i, j]

userMostSimDict = dict()
for i in range(len(ratingValues)):
    userMostSimDict[i] = sorted(enumerate(list(userSimMatrix[i])), key=lambda x: x[1], reverse=True)[:10]

userRecommendValues = np.zeros((len(ratingValues), len(ratingValues[0])), dtype=np.float32)

for i in range(len(ratingValues)):
    for j in range(len(ratingValues[i])):
        if ratingValues[i][j] == 0:
            val = 0
            for (user, sim) in userMostSimDict[i]:
                val += (ratingValues[user][j] * sim)
            userRecommendValues[i, j] = val

userRecommendDict = dict()
for i in range(len(ratingValues)):
    userRecommendDict[i] = sorted(enumerate(list(userRecommendValues[i])), key=lambda x: x[1], reverse=True)[:5]

upload_data(userRecommendDict)