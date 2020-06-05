package com.example.boot.dto;

import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/6/6 0:59
 */
public class UserDTO {
    @NotBlank(message = "用户名不能为空")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
