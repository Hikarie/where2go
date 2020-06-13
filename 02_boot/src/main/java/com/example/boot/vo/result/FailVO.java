package com.example.boot.vo.result;

/**
 * @Author : wangziyu
 * @Date : 2020/6/4 1:20
 */
public class FailVO {
    private int status = 0;
    private String msg = "失败";

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

}
