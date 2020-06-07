package com.example.boot.dto;

import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/6/6 0:58
 */
public class SightDTO {
    @NotBlank(message = "景点名不能为空")
    private String sightName;

    public String getSightName() {
        return sightName;
    }

    public void setSightName(String sightName) {
        this.sightName = sightName;
    }


}
