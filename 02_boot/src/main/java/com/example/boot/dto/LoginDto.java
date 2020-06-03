package com.example.boot.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @Author : wangziyu
 * @Date : 2020/5/31 16:06
 */
public class LoginDto {

    /**
     * 邮箱
     */
    @NotBlank(message = "邮箱不能为空")
    private String email;

    /**
     * 密码
     */
    @Length(min = 6, max = 20, message = "密码必须是6至20位")
    private String password;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
