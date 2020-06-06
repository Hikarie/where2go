package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.dto.SightDTO;
import com.example.boot.service.SightService;
import com.example.boot.vo.SightVO;
import com.example.boot.vo.result.SucessVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * @Author : wangziyu
 * @Date : 2020/6/4 15:54
 */
@RestController
@RequestMapping("/sight")
public class SightController {

    @Autowired
    private SightService sightService;

    /**
     * GET 在首页返回幸福指数排行前五的五个景点
     * @return
     */
    @GetMapping("/happinessOfTop5")
    public String happinessOfTop5() {
        List<SightVO> listOfSightVO = sightService.happinessOfTop5();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * GET 在首页返回人气指数（浏览量）排行前五的五个景点
     * @return
     */
    @GetMapping("/popularityOfTop5")
    public String popularityOfTop5() {
        List<SightVO> listOfSightVO = sightService.popularityOfTop5();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * GET 返回某个景点的所有信息
     * @param dto
     * @return
     */
    @GetMapping("/information")
    public String getInformation(@RequestBody @Valid SightDTO dto){
        List<SightVO> listOfSightVO = sightService.getSight(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }
}
