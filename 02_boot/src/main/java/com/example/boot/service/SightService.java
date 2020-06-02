package com.example.boot.service;

import com.example.boot.dao.SightMapper;
import com.example.boot.po.Sight;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Author : wangziyu
 * @Date : 2020/6/1 14:09
 */
public class SightService {

    @Autowired(required = false)
    private SightMapper sightMapper;
}
