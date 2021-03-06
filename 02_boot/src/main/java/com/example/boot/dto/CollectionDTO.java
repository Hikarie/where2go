package com.example.boot.dto;

import com.alibaba.fastjson.annotation.JSONField;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/6/6 1:28
 */
public class CollectionDTO {

    @NotBlank(message = "景点名不能为空")
    private String sightName;

    @Email(message = "邮箱格式错误")
    private String email;

    public String getSightName() {
        return sightName;
    }

    public void setSightName(String sightName) {
        this.sightName = sightName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
