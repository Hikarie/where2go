package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.LoginDTO;
import com.example.boot.dto.RegisterDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.service.UserService;
import com.example.boot.vo.result.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    /**
     * 实现注册功能
     * @param dto
     * @return
     */
    @PostMapping("/register")
    public String register(@Valid RegisterDTO dto) {
        int res = userService.register(dto);
        return res == 1 ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    /**
     * 实现用户登录功能
     * @param dto
     * @return
     */
    @PostMapping("/login")
    public String register(@Valid LoginDTO dto) {
        boolean res = userService.login(dto);
        return res ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    /**
     * 获取用户收藏的景点个数
     * @param dto
     * @return
     */
    @GetMapping("/collection")
    public String getNumbOfCollections(@Valid CollectionDTO dto) {
        long num = userService.getNumOfCollecions(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(num);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * 用户收藏景点
     * @param dto
     * @return
     */
    @PostMapping("/collection")
    public String UpdateCollection(@Valid CollectionDTO dto) {
        int res = userService.addCollection(dto);
        return res == 1 ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

}
