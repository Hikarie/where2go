package com.example.boot.controller;

import com.example.boot.service.SightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        String result = sightService.happinessOfTop5();
        System.out.println("controller: " + result);
        return result;
    }

    @GetMapping("/popularityOfTop5")
    public String popularityOfTop5() {
        String result = sightService.popularityOfTop5();
        return result;
    }
}
