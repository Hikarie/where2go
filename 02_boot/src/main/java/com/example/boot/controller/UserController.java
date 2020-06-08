package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.LoginDTO;
import com.example.boot.dto.RegisterDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.service.UserService;
import com.example.boot.vo.SightVO;
import com.example.boot.vo.result.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
     * POST 实现注册功能
     * @param dto
     * @return
     */
    @PostMapping("/register")
    public String register(@Valid @RequestBody  RegisterDTO dto) {
        int res = userService.register(dto);
        return res == 1 ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    /**
     * POST 实现用户登录功能
     * @param dto
     * @return
     */
    @PostMapping("/login")
    public String register(@RequestBody @Valid LoginDTO dto) {
        boolean res = userService.login(dto);
        return res ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    /**
     * GET 获取用户收藏的景点个数
     * @param dto
     * @return
     */
    @PostMapping("/collectionNum")
    public String getNumbOfCollections(@RequestBody @Valid UserDTO dto) {
        long num = userService.getNumOfCollecions(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(num);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * POST 用户收藏景点
     * @param dto
     * @return
     */
    @PostMapping("/collection")
    public String addCollection(@RequestBody @Valid CollectionDTO dto) {
        int res = userService.addCollection(dto);
        return res == 1 ? JSON.toJSONString(new SucessVO()) : JSON.toJSONString(new FailVO());
    }

    /**
     * POST 返回收藏景点列表
     * @param dto
     * @return
     */
    @PostMapping("/collectionPage")
    public String getCollection(@RequestBody @Valid UserDTO dto){
        List<SightVO> listOfSightVO = userService.getCollectionList(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }
}
