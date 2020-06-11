package com.example.boot;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.*;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.LoginDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.po.*;
import com.example.boot.vo.SightInfo;
import com.example.boot.vo.SightVO;
import org.apache.ibatis.session.RowBounds;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
/**
 * 主要测试目标是service层的业务代码
 */
class BootApplicationTests {

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired(required = false)
    private SightMapper sightMapper;

    @Autowired(required = false)
    private CollectionMapper collectionMapper;

    @Autowired(required = false)
    private RatingsMapper ratingsMapper;

    @Autowired(required = false)
    private RecommendMapper recommendMapper;


    @BeforeAll
    public static void beforeTest() {
        System.out.println("进行单元测试");
    }

    @AfterAll
    public static void afterTest() {
        System.out.println("单元测试结束");
    }

    @Test
    public void loginTest() {
        //测试登录信息验证
        LoginDTO dto = new LoginDTO();
        dto.setEmail("xxx@xxx.com");
        dto.setPassword("12345678");
        //登录
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andEmailEqualTo(dto.getEmail());
        List<User> list = userMapper.selectByExample(example);
        if (list.size() > 1) {
            return;
        }
        User user = list.get(0);
        //获取盐
        String salt = user.getSalt();
        assert (DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()).equals(user.getPassword()));
    }

    /**
     * 用户获取景点收藏个数
     *
     * @return
     */
    @Test
    public void getNumOfCollecionsTest() {
        //测试登录信息验证
        UserDTO dto = new UserDTO();
        dto.setEmail("xxx@xxx.com");

        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        User user = userMapper.selectByExample(userExample).get(0);

        // 根据用户ID查询收藏的景点个数
        CollectionExample collectionExample = new CollectionExample();
        CollectionExample.Criteria collectionExampleCriteria = collectionExample.createCriteria();
        collectionExampleCriteria.andUserIdEqualTo(user.getUserId());
        long num = collectionMapper.countByExample(collectionExample);
    }


    /**
     * 用户获取景点收藏列表
     *
     * @return
     */
    @Test
    public void getCollectionList() {

        UserDTO dto = new UserDTO();
        dto.setEmail("xxx@xxx.com");

        // 获取用户ID
        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        User user = userMapper.selectByExample(userExample).get(0);

        // 根据用户ID,获取用户收藏的景点ID
        CollectionExample collectionExample = new CollectionExample();
        CollectionExample.Criteria collectionExampleCriteria = collectionExample.createCriteria();
        collectionExampleCriteria.andUserIdEqualTo(user.getUserId());
        List<Collection> collectionList = collectionMapper.selectByExample(collectionExample);
        List<SightVO> listOfSightVO = new LinkedList<>();

        //查询景点信息
        for (Collection it : collectionList) {
            Sight sight = sightMapper.selectByPrimaryKey(it.getSightId());
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(sight, sightVO);
            sightVO.setDescription(null);
            listOfSightVO.add(sightVO);
        }
        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }


    @Test
    public void getSightOfTop5Test() {
        //调用条件查询，获取5个景点的信息
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("happiness_index DESC");
        RowBounds rowBounds = new RowBounds(0, 5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
        List<SightVO> listVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listVO.add(sightVO);
        }
        assertNotNull(listVO);
//        String jsonCity = JSON.toJSONString(listVO);
//        System.out.println("{\"sight\":" + jsonCity + "}");
    }

    /**
     * 展示幸福指数最高的五个景点
     *
     * @return
     */
    @Test
    public void happinessOfTop5() {
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
//        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }

    /**
     * 展示人气指数最高的五个景点
     *
     * @return
     */
    @Test
    public void popularityOfTop5() {
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
//        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }

    /**
     * 获取景点的详细信息,如果已登录则记录用户行为
     */
    @Test
    public void getSight() {
        CollectionDTO dto = new CollectionDTO();
        dto.setEmail("xxx@xxx.com");
        dto.setSightName("苏必利尔湖");

        if (dto.getEmail() == null) {
            SightExample example = new SightExample();
            SightExample.Criteria criteria = example.createCriteria();
            criteria.andSightNameEqualTo(dto.getSightName());
            List<Sight> list = sightMapper.selectByExampleWithBLOBs(example);
            Sight sight = list.get(0);
//            // 更新访问量
//            sight.setViews(sight.getViews()+1);
//            sightMapper.updateByExampleSelective(sight,example);
//            List<SightVO> listOfSightVO = new LinkedList<>();
            SightInfo sightInfo = new SightInfo();
            BeanUtils.copyProperties(sight, sightInfo);
            System.out.println(JSON.toJSONString(sightInfo));
            assertNotNull(sightInfo);
        } else {
            //获取用户
            UserExample userExample = new UserExample();
            UserExample.Criteria userCriteria = userExample.createCriteria();
            userCriteria.andEmailEqualTo(dto.getEmail());
            User user = userMapper.selectByExample(userExample).get(0);
            //获取景点
            SightExample sightExample = new SightExample();
            SightExample.Criteria sigthCriteria = sightExample.createCriteria();
            sigthCriteria.andSightNameEqualTo(dto.getSightName());
            Sight sight = sightMapper.selectByExampleWithBLOBs(sightExample).get(0);
//            // 更新评分表
//            RatingsExample ratingsExample =new RatingsExample();
//            RatingsExample.Criteria ratingsCriteria=ratingsExample.createCriteria();
//            ratingsCriteria.andUserIdEqualTo(user.getUserId());
//            ratingsCriteria.andSightIdEqualTo(sight.getSightId());
//            List<Ratings> ratingsList=ratingsMapper.selectByExample(ratingsExample);
//            if(ratingsList.size()==0){
//                Ratings ratings=new Ratings();
//                ratings.setUserId(user.getUserId());
//                ratings.setSightId(sight.getSightId());
//                ratings.setRating(1.0f);
//                ratingsMapper.insert(ratings);
//            }else {
//                Ratings ratings=ratingsList.get(0);
//                ratings.setRating(ratings.getRating()+1);
//                ratingsMapper.updateByExample(ratings,ratingsExample);
//            }
//            sight.setViews(sight.getViews()+1);
//            sightMapper.updateByExampleSelective(sight,sightExample);
//            List<SightVO> listOfSightVO = new LinkedList<>();
            SightInfo sightInfo = new SightInfo();
            BeanUtils.copyProperties(sight, sightInfo);
//            System.out.println(JSON.toJSONString(sightInfo));
            assertNotNull(sightInfo);
        }

        // 获取景点的详细信息
    }

    /**
     * 在侧边栏展示个性化推荐的五个景点
     *
     * @return
     */
    @Test
    public void personalizedSight() {

        UserDTO dto = new UserDTO();
        dto.setEmail("xxx@xxx.com");

        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        User user = userMapper.selectByExample(userExample).get(0);

        RecommendExample recommendExample = new RecommendExample();
        RecommendExample.Criteria recommendExampleCriteria = recommendExample.createCriteria();
        recommendExampleCriteria.andUserIdEqualTo(user.getUserId());
        Recommend recommend = recommendMapper.selectByExample(recommendExample).get(0);

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
//        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }

    /**
     * 返回幸福指数排行榜
     *
     * @return
     */
    @Test
    public void happinessRanking() {
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
//        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }

    /**
     * 返回人气指数排行榜
     *
     * @return
     */
    @Test
    public void popularityRanking() {
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
//        System.out.println(JSON.toJSONString(listOfSightVO));
        assertNotNull(listOfSightVO);
    }

}
