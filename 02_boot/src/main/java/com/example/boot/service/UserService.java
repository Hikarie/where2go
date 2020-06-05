package com.example.boot.service;

import com.example.boot.dao.CollectionMapper;
import com.example.boot.dao.SightMapper;
import com.example.boot.dao.UserMapper;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.LoginDTO;
import com.example.boot.dto.RegisterDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.po.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;
import java.util.UUID;

/**
 * @Author : wang ziyu
 * @create 2020/3/22 4:32
 */
@Service
public class UserService {

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired(required = false)
    private CollectionMapper collectionMapper;

    @Autowired(required = false)
    private SightMapper sightMapper;

    /**
     * POST 用户注册
     *
     * @param dto
     * @return
     */
    public int register(RegisterDTO dto) {
        //检查该邮箱是否已经注册过
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andEmailEqualTo(dto.getEmail());
        List<User> list = userMapper.selectByExample(example);
        if(list.size()>0){
            return 0;
        }
        //生成密码的随机盐
        String salt = UUID.randomUUID().toString();
        User user = new User();
        user.setUserName(dto.getUserName());
        //密码加盐后在md5
        user.setPassword(DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()));
        user.setSalt(salt);
        user.setEmail(dto.getEmail());
        return userMapper.insert(user);
    }

    /**
     * POST 用户登录
     *
     * @param dto
     * @return
     */
    public boolean login(LoginDTO dto) {
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andEmailEqualTo(dto.getEmail());
        List<User> list = userMapper.selectByExample(example);
        if(list.size()>1){
            return false;
        }
        User user = list.get(0);
        //获取盐
        String salt = user.getSalt();
        return DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()).equals(user.getPassword());
    }

    /**
     *  GET 获取用户收藏的景点个数
     *
     * @param dto
     * @return
     */
    public long getNumOfCollecions(UserDTO dto) {
        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        User user = userMapper.selectByExample(userExample).get(0);

        // 如果用户已经收藏过该景点，则应该返回收藏失败
        CollectionExample collectionExample = new CollectionExample();
        CollectionExample.Criteria collectionExampleCriteria = collectionExample.createCriteria();
        collectionExampleCriteria.andUserIdEqualTo(user.getUserId());
        long num = collectionMapper.countByExample(collectionExample);
        return (int)num;
    }

    /**
     * POST 用户收藏景点
     * @param dto
     * @return
     */
    public int addCollection(CollectionDTO dto) {
        UserExample userExample = new UserExample();
        UserExample.Criteria userExampleCriteria = userExample.createCriteria();
        userExampleCriteria.andEmailEqualTo(dto.getEmail());
        List<User> userList = userMapper.selectByExample(userExample);
        User user = userList.get(0);

        SightExample sightExample = new SightExample();
        SightExample.Criteria sightExampleCriteria = sightExample.createCriteria();
        sightExampleCriteria.andSightNameEqualTo(dto.getSightName());
        Sight sight = sightMapper.selectByExample(sightExample).get(0);

        // 如果用户已经收藏过该景点，则应该返回收藏失败
        CollectionExample collectionExample = new CollectionExample();
        CollectionExample.Criteria collectionExampleCriteria = collectionExample.createCriteria();
        collectionExampleCriteria.andUserIdEqualTo(user.getUserId());
        List<Collection> list = collectionMapper.selectByExample(collectionExample);
        if(list.size()>0) {
            for(Collection it : list){
                if(it.getSightId().equals(sight.getSightId())){
                    return 0;
                }
            }
        }

        //  用户使用过收藏功能，但未曾收藏过该景点
        Collection collection = new Collection();
        collection.setUserId(user.getUserId());
        collection.setSightId(sight.getSightId());

        return collectionMapper.insert(collection);
    }


}
