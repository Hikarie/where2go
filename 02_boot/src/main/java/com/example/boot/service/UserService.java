package com.example.boot.service;

import com.example.boot.dao.CollectMapper;
import com.example.boot.dao.UserMapper;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.LoginDTO;
import com.example.boot.dto.RegisterDTO;
import com.example.boot.po.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

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
    private CollectMapper collectMapper;

    /**
     * 用户注册
     *
     * @param dto
     * @return
     */
    public int register(RegisterDTO dto) {
        //检查该邮箱是否已经注册过
        if (userMapper.selectByEmail(dto.getEmail()) != null) {
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
     * 用户登录
     *
     * @param dto
     * @return
     */
    public boolean login(LoginDTO dto) {
        User user = userMapper.selectByEmail(dto.getEmail());
        //获取盐
        String salt = user.getSalt();
        return DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()).equals(user.getPassword());
    }

    /**
     * 获取用户收藏景点个数
     *
     * @param dto
     * @return
     */
    public boolean getNumOfCollecions(CollectionDTO dto) {
    }
}
