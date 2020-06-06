package com.example.boot.service;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.SightMapper;
import com.example.boot.dto.SightDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.po.Sight;
import com.example.boot.po.SightExample;
import com.example.boot.vo.SightInfo;
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


    /**
     * 展示幸福指数最高的五个景点
     *
     * @return
     */
    public List<SightVO> happinessOfTop5() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("happiness_index DESC");
        RowBounds rowBounds = new RowBounds(0, 5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
        List<SightVO> listOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listOfSightVO.add(sightVO);
        }
        return listOfSightVO;
    }

    /**
     * 展示人气指数最高的五个景点
     *
     * @return
     */
    public List<SightVO> popularityOfTop5() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("views DESC");
        RowBounds rowBounds = new RowBounds(0, 5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
        List<SightVO> listOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listOfSightVO.add(sightVO);
        }
        return listOfSightVO;
    }

    /**
     * 获取景点的详细信息
     *
     * @param dto
     * @return
     */
    public SightInfo getSight(SightDTO dto) {
        // 获取景点的详细信息
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        criteria.andSightNameEqualTo(dto.getSightName());
        List<Sight> list = sightMapper.selectByExampleWithBLOBs(example);
        Sight sight = list.get(0);
        // 更新访问量
        sight.setViews(sight.getViews()+1);
        sightMapper.updateByExampleSelective(sight,example);
        List<SightVO> listOfSightVO = new LinkedList<>();
        SightInfo sightInfo = new SightInfo();
        BeanUtils.copyProperties(sight, sightInfo);
        return sightInfo;
    }

    /**
     * 在侧边栏展示个性化推荐的五个景点
     * @param dto
     */
    public void personalizedSight(UserDTO dto) {
        return;
    }

    /**
     * 返回幸福指数排行榜
     * @return
     */
    public List<SightVO> happinessRanking() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("happiness_index DESC");
        List<Sight> list = sightMapper.selectByExampleWithBLOBs(example);
        List<SightVO> listOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listOfSightVO.add(sightVO);
        }
        return listOfSightVO;
    }

//    /**
//     * 在幸福排行榜的侧边栏展示人气排行的前五个景点
//     * @return
//     */
//    public List<SightVO> popularityOf() {
//        SightExample example = new SightExample();
//        SightExample.Criteria criteria = example.createCriteria();
//        example.setOrderByClause("views DESC");
//        RowBounds rowBounds = new RowBounds(0, 5);
//        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
//        List<SightVO> listOfSightVO = new LinkedList<>();
//        for (Sight it : list) {
//            SightVO sightVO = new SightVO();
//            BeanUtils.copyProperties(it, sightVO);
//            listOfSightVO.add(sightVO);
//        }
//        return listOfSightVO;
//    }

    /**
     * 返回人气指数排行榜
     * @return
     */
    public List<SightVO> popularityRanking() {
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("views DESC");
        List<Sight> list = sightMapper.selectByExample(example);
        List<SightVO> listOfSightVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listOfSightVO.add(sightVO);
        }
        return listOfSightVO;
    }


}
