package com.example.boot.service;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.SightMapper;
import com.example.boot.po.Sight;
import com.example.boot.po.SightExample;
import com.example.boot.vo.SightVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * @Author : wangziyu
 * @Date : 2020/6/1 14:09
 */
@Service
public class SightService {

    @Autowired(required = false)
    private SightMapper sightMapper;


    public String happinessOfTop5() {
        //调用条件查询，获取5个景点的信息 幸福指数 ------ happiness_index
        SightExample example = new SightExample();
        example.setOrderByClause("happiness_index DESC");
        List<Sight> list = sightMapper.selectByExample(example);
        List<SightVO> listVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listVO.add(sightVO);
        }
        String jsonCity = JSON.toJSONString(listVO);
        System.out.println("service: " + jsonCity);
        return "{\"sight\":" + jsonCity + "}";
    }

    public String popularityOfTop5() {
        //调用条件查询，获取5个景点的信息 人气 -----  浏览量
        SightExample example = new SightExample();
        example.setOrderByClause("happiness_index DESC");
        List<Sight> list = sightMapper.selectByExample(example);
        List<SightVO> listVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listVO.add(sightVO);
        }
        String jsonCity = JSON.toJSONString(listVO);
        return "{\"sight\":" + jsonCity + "}";
    }
}
