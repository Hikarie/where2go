package com.example.boot.controller;

import com.alibaba.fastjson.JSON;
import com.example.boot.dto.CollectionDTO;
import com.example.boot.dto.SightDTO;
import com.example.boot.dto.UserDTO;
import com.example.boot.service.SightService;
import com.example.boot.vo.SightInfo;
import com.example.boot.vo.SightVO;
import com.example.boot.vo.result.SucessVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     * GET 返回某个景点的所有信息，并更新景点访问量 +1
     * 需要获取用户当前的信息，如果用户处于登录状态，则修改访问量+1
     * @param dto
     * @return
     */
//    @GetMapping("/information")
//    public String getInformation(@RequestBody @Valid SightDTO dto){
//        SightInfo sightInfo = sightService.getSight(dto);
//        SucessVO sucessVO = new SucessVO();
//        sucessVO.setResult(sightInfo);
//        String res = JSON.toJSONString(sucessVO);
//        return res;
//    }
    @PostMapping("/information")
    public String getInformation(@RequestBody @Valid CollectionDTO dto){
        SightInfo sightInfo = sightService.getSight(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(sightInfo);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }


    /**
     * GET 侧边栏展示个性化推荐的五个景点
     * @param dto
     * @return
     */
    @PostMapping("/sidebar/personalizedSight")
    public String getPersonalizedSight(@RequestBody @Valid UserDTO dto){
        List<SightVO> listOfSightVO=sightService.personalizedSight(dto);
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * GET 展示所有景点的幸福排行情况
     * @return
     */
    @GetMapping("/happinessRanking")
    public String getHappinessRanking(){
        List<SightVO> listOfSightVO = sightService.happinessRanking();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * GET 在侧边栏展示人气排行前五的景点信息
     * @return
     */
    @GetMapping("/sidebar/popularityOfTop5")
    public String getPopularityOfTop5(){
        List<SightVO> listOfSightVO = sightService.popularityOfTop5();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }

    /**
     * GET 展示所有景点的人气排行情况
     * @return
     */
    @GetMapping("/popularityRanking")
    public String getPopularityRanking(){
        List<SightVO> listOfSightVO = sightService.popularityRanking();
        SucessVO sucessVO = new SucessVO();
        sucessVO.setResult(listOfSightVO);
        String res = JSON.toJSONString(sucessVO);
        return res;
    }



}
