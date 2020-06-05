package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.dto.LoginDto;
import com.example.boot.dto.RegisterDto;
import com.example.boot.service.UserService;
import com.example.boot.vo.result.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @Author : wang ziyu
 * @create 2020/3/22 4:15
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@Valid RegisterDto dto) {
        int result = userService.register(dto);
        return result == 1 ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    @PostMapping("/login")
    public String register(@Valid LoginDto dto) {
        boolean res = userService.login(dto);
        return res ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }
}
