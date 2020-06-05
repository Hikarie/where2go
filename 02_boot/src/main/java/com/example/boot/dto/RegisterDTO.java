package com.example.boot.dto;

import com.alibaba.fastjson.annotation.JSONField;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @Author : wang ziyu
 * @create 2020/3/22 4:19
 */

public class RegisterDTO {
    @NotBlank(message = "用户名不能为空")
    private String userName;

    @Length(min = 6, max = 20, message = "密码必须是6至20位")
    private String password;

    @NotBlank(message = "邮箱不能为空")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
