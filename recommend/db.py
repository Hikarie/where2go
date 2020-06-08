#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/6/4 19:56
# @Author  : Honey
# @Software: PyCharm

import pymysql
import pandas as pd
import yaml


def get_con():
    with open('MySQL.yaml', 'r') as f:
        data = yaml.load(f.read())
        # print(data)
        host = data['config']['host']
        port = data['config']['port']
        user = data['config']['user']
        password = data['config']['password']
        db = data['config']['db']

    con = pymysql.connect(
        host=host,
        user=user,
        password=password,
        port=port,
        db=db)
    return con


def get_df():
    con = get_con()
    cursor = con.cursor()

    sql = "select * from ratings"

    cursor.execute(sql)

    results = cursor.fetchall()
    col_results = cursor.description  # 获取查询结果的字段描述

    columns = []
    for col_result in col_results:
        columns.append(col_result[0])

    df = pd.DataFrame(columns=columns)
    for i in range(len(results)):
        df.loc[i] = list(results[i])

    con.close()
    return df


def upload_data(data):
    con = get_con()
    cursor = con.cursor()
    for key, value in data.items():
        sql = 'select * from recommend where user_id={}'.format(key + 1)
        cursor.execute(sql)
        data = cursor.fetchall()
        if data:
            try:
                update_sql = 'UPDATE recommend set sight_id1={},sight_id2={},sight_id3={},sight_id4={},sight_id5={} WHERE user_id={}'.format(
                    value[0][0] + 1,
                    value[1][0] + 1,
                    value[2][0] + 1,
                    value[3][0] + 1,
                    value[4][0] + 1,
                    key + 1)
                cursor.execute(update_sql)
                con.commit()
            except BaseException:
                print('原始数据不够，更新推荐表失败')
        else:
            try:
                insert_sql = 'insert into recommend values({},{},{},{},{},{})'.format(
                    key + 1,
                    value[0][0] + 1,
                    value[1][0] + 1,
                    value[2][0] + 1,
                    value[3][0] + 1,
                    value[4][0] + 1)
                cursor.execute(insert_sql)
                con.commit()
            except BaseException:
                print('原始数据不够，更新推荐表失败')
    con.close()
