package com.example.boot.service;

import com.example.boot.dao.UserMapper;
import com.example.boot.dto.LoginDto;
import com.example.boot.dto.RegisterDto;
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

    public int register(RegisterDto dto) {
        //生成密码的随机盐
        String salt = UUID.randomUUID().toString();
        User user = new User();
        user.setUserName(dto.getUserName());
        //密码加盐后在md5
        user.setPassword(DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()));
        user.setSalt(salt);
        user.setEmail(dto.getEmail());
        System.out.println(user.getEmail());

        return userMapper.insert(user);
    }

    public boolean login(LoginDto dto) {
        User user = userMapper.selectByEmail(dto.getEmail());
        //获取盐
        String salt = user.getSalt();
        String password = user.getPassword();
        System.out.println(salt);
        System.out.println(password);
        System.out.println(DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()));
        //密码校验
        return DigestUtils.md5DigestAsHex((dto.getPassword() + salt).getBytes()).equals(user.getPassword());
    }
}
