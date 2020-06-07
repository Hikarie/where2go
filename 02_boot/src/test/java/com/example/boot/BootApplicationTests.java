package com.example.boot;

import com.alibaba.fastjson.JSON;
import com.example.boot.dao.SightMapper;
import com.example.boot.dao.UserMapper;
import com.example.boot.po.Sight;
import com.example.boot.po.SightExample;
import com.example.boot.po.User;
import com.example.boot.po.UserExample;
import com.example.boot.vo.SightVO;
import org.apache.ibatis.session.RowBounds;
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
    void loginTest() {
        //测试数据库连接情况
        System.out.println("hello");
        String email = "12345678";
        String password = "123456789";
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andEmailEqualTo(email);
        User user = userMapper.selectByExample(example).get(0);

        //获取盐
        System.out.println(user.getSalt());
        System.out.println(user.getPassword());
        System.out.println(DigestUtils.md5DigestAsHex((password + user.getSalt()).getBytes()));
    }

    @Test
    void getSightOfTop5() {
        //调用条件查询，获取5个景点的信息
        SightExample example = new SightExample();
        SightExample.Criteria criteria = example.createCriteria();
        example.setOrderByClause("happiness_index DESC");
        RowBounds rowBounds = new RowBounds(0,5);
        List<Sight> list = sightMapper.selectByExampleWithBLOBsWithRowbounds(example, rowBounds);
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
