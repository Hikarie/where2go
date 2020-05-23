package com.example.boot.user.service;

import com.example.boot.user.dao.UserMapper;
import com.example.boot.user.dto.RegisterDTO;
import com.example.boot.user.po.User;
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

    @Autowired
    private UserMapper userMapper;

    public boolean register(RegisterDTO dto) {
        //生成密码的随机盐
        String salt = UUID.randomUUID().toString();
        User user = new User();
        user.setUserName(dto.getUserName());
        //密码加盐后在md5
        user.setPassword(DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()));
        user.setSalt(salt);
        return 1 ==userMapper.insert(user);
    }

}
