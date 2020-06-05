package com.example.boot.dto;

import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/6/6 0:59
 */
public class UserDTO {
    @NotBlank(message = "景点名不能为空")
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


}
