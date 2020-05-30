package com.example.boot.service;

import com.example.boot.dao.UserMapper;
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

    @Autowired(required=false)
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
