package com.example.boot;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.SightMapper;
import com.example.boot.dao.UserMapper;
import com.example.boot.po.Sight;
import com.example.boot.po.SightExample;
import com.example.boot.po.User;
import com.example.boot.vo.SightVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

import java.util.LinkedList;
import java.util.List;

@SpringBootTest
class BootApplicationTests {

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired(required = false)
    private SightMapper sightMapper;

    @Test
    void contextLoads() {
        System.out.println("hello");
    }

    @Test
    void connectMysql() {
        //测试数据库连接情况
        System.out.println("hello");
    }

    @Test
    void loginTest() {
        //测试数据库连接情况
        System.out.println("hello");
        String email = "12345678";
        String password = "123456789";
        User user = userMapper.selectByEmail(email);
        //获取盐
        System.out.println(user.getSalt());
        System.out.println(user.getPassword());
        System.out.println(DigestUtils.md5DigestAsHex((password + user.getSalt()).getBytes()));
    }

    @Test
    void AddSight() {
        //往数据库中添加部分数据
        System.out.println("hello");
        String email = "12345678";
        String password = "123456789";
        User user = userMapper.selectByEmail(email);
        //获取盐
        System.out.println(user.getSalt());
        System.out.println(user.getPassword());
        System.out.println(DigestUtils.md5DigestAsHex((password + user.getSalt()).getBytes()));
    }

    @Test
    void getSightOfTop5() {
        //调用条件查询，获取5个景点的信息
        SightExample example = new SightExample();
///        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("happiness_index DESC");
        List<Sight> list = sightMapper.selectByExample(example);
        List<SightVO> listVO = new LinkedList<>();
        for (Sight it : list) {
            SightVO sightVO = new SightVO();
            BeanUtils.copyProperties(it, sightVO);
            listVO.add(sightVO);
        }
        String jsonCity = JSON.toJSONString(listVO);
        System.out.println("{\"sight\":" + jsonCity + "}");
    }
}
