package com.example.boot.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/6/6 0:59
 */
public class UserDTO {
    @Email(message = "邮箱格式错误")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
