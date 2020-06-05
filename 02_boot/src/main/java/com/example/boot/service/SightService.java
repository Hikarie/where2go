package com.example.boot.service;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.SightMapper;
import com.example.boot.po.Sight;
import com.example.boot.po.SightExample;
import com.example.boot.vo.SightVO;
import org.apache.ibatis.session.RowBounds;
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


    public List<SightVO> happinessOfTop5() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
///     criteria.andCountryEqualTo("意大利");
        example.setOrderByClause("happiness_index DESC");
        RowBounds rowBounds = new RowBounds(0,5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
        List<SightVO> ListOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            ListOfSightVO.add(sightVO);
        }
        return ListOfSightVO;
    }

    public List<SightVO> popularityOfTop5() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
///     criteria.andCountryEqualTo("意大利");
        example.setOrderByClause("views DESC");
        RowBounds rowBounds = new RowBounds(0,5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
        List<SightVO> ListOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            ListOfSightVO.add(sightVO);
        }
        return ListOfSightVO;
    }
}
