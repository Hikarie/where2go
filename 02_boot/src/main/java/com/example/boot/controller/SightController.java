package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.service.SightService;
import com.example.boot.vo.SightVO;
import com.example.boot.vo.result.FailVO;
import com.example.boot.vo.result.SucessVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author : wangziyu
 * @Date : 2020/6/4 15:54
 */
@RestController
@RequestMapping("/leaderboard")
public class SightController {

    @Autowired
    private SightService sightService;

    @GetMapping("/happinessOfTop5")
    public String happinessOfTop5() {
        List<SightVO> ListOfSightVO = sightService.happinessOfTop5();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(ListOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    @GetMapping("/popularityOfTop5")
    public String popularityOfTop5() {
        List<SightVO> ListOfSightVO = sightService.popularityOfTop5();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(ListOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }
}
