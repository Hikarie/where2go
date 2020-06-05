package com.example.boot.vo.result;

/**
 * @Author : wangziyu
 * @Date : 2020/6/4 1:19
 */
public class SucessVO {

    private int status = 1;
    private String msg = "成功";
    private Object result;

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

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
