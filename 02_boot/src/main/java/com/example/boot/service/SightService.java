package com.example.boot.service;

import com.example.boot.dao.*;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.SightDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.po.*;
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

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired(required = false)
    private RecommendMapper recommendMapper;

    @Autowired(required = false)
    private RatingsMapper ratingsMapper;


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
     * 获取景点的详细信息,如果已登录则记录用户行为
     *
     * @param dto
     * @return
     */
    public SightInfo getSight(CollectionDTO dto) {
        if(dto.getEmail()==null){
            SightExample example = new SightExample();
            SightExample.Criteria criteria = example.createCriteria();
            criteria.andSightNameEqualTo(dto.getSightName());
            List<Sight> list = sightMapper.selectByExampleWithBLOBs(example);
            Sight sight = list.get(0);
            // 更新访问量
            sight.setViews(sight.getViews()+1);
            sightMapper.updateByExampleSelective(sight,example);
//            List<SightVO> listOfSightVO = new LinkedList<>();
            SightInfo sightInfo = new SightInfo();
            BeanUtils.copyProperties(sight, sightInfo);
            return sightInfo;
        }else {
            //获取用户
            UserExample userExample=new UserExample();
            UserExample.Criteria userCriteria=userExample.createCriteria();
            userCriteria.andEmailEqualTo(dto.getEmail());
            User user=userMapper.selectByExample(userExample).get(0);
            //获取景点
            SightExample sightExample = new SightExample();
            SightExample.Criteria sigthCriteria = sightExample.createCriteria();
            sigthCriteria.andSightNameEqualTo(dto.getSightName());
            Sight sight = sightMapper.selectByExampleWithBLOBs(sightExample).get(0);
            // 更新评分表
            RatingsExample ratingsExample =new RatingsExample();
            RatingsExample.Criteria ratingsCriteria=ratingsExample.createCriteria();
            ratingsCriteria.andUserIdEqualTo(user.getUserId());
            ratingsCriteria.andSightIdEqualTo(sight.getSightId());
            List<Ratings> ratingsList=ratingsMapper.selectByExample(ratingsExample);
            if(ratingsList.size()==0){
                Ratings ratings=new Ratings();
                ratings.setUserId(user.getUserId());
                ratings.setSightId(sight.getSightId());
                ratings.setRating(1.0f);
                ratingsMapper.insert(ratings);
            }else {
                Ratings ratings=ratingsList.get(0);
                ratings.setRating(ratings.getRating()+1);
                ratingsMapper.updateByExample(ratings,ratingsExample);
            }
            sight.setViews(sight.getViews()+1);
            sightMapper.updateByExampleSelective(sight,sightExample);
//            List<SightVO> listOfSightVO = new LinkedList<>();
            SightInfo sightInfo = new SightInfo();
            BeanUtils.copyProperties(sight, sightInfo);
            return sightInfo;
        }
        // 获取景点的详细信息
    }

    /**
     * 在侧边栏展示个性化推荐的五个景点
     * @param dto
     * @return
     */
    public List<SightVO> personalizedSight(UserDTO dto) {
        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        User user = userMapper.selectByExample(userExample).get(0);

        RecommendExample recommendExample = new RecommendExample();
        RecommendExample.Criteria recommendExampleCriteria = recommendExample.createCriteria();
        recommendExampleCriteria.andUserIdEqualTo(user.getUserId());
        Recommend recommend= recommendMapper.selectByExample(recommendExample).get(0);

        List<SightVO> listOfSightVO = new LinkedList<>();

        Sight sight1 = sightMapper.selectByPrimaryKey(recommend.getSightId1());
        SightVO sightVO1 = new SightVO();
        BeanUtils.copyProperties(sight1, sightVO1);
        sightVO1.setDescription(null);
        listOfSightVO.add(sightVO1);

        Sight sight2 = sightMapper.selectByPrimaryKey(recommend.getSightId2());
        SightVO sightVO2 = new SightVO();
        BeanUtils.copyProperties(sight2, sightVO2);
        sightVO2.setDescription(null);
        listOfSightVO.add(sightVO2);

        Sight sight3 = sightMapper.selectByPrimaryKey(recommend.getSightId3());
        SightVO sightVO3 = new SightVO();
        BeanUtils.copyProperties(sight3, sightVO3);
        sightVO3.setDescription(null);
        listOfSightVO.add(sightVO3);

        Sight sight4 = sightMapper.selectByPrimaryKey(recommend.getSightId4());
        SightVO sightVO4 = new SightVO();
        BeanUtils.copyProperties(sight4, sightVO4);
        sightVO4.setDescription(null);
        listOfSightVO.add(sightVO4);

        Sight sight5 = sightMapper.selectByPrimaryKey(recommend.getSightId5());
        SightVO sightVO5 = new SightVO();
        BeanUtils.copyProperties(sight5, sightVO5);
        sightVO5.setDescription(null);
        listOfSightVO.add(sightVO5);

        return listOfSightVO;
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
