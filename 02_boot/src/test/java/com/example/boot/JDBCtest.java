package com.example.boot;

import java.sql.DriverManager;
import java.sql.SQLException;

import org.junit.jupiter.api.Test;

import java.sql.Connection;

/**
 * @Author : wangziyu
 * @Date : 2020/5/30 17:16
 */
class JDbctest {
    @Test
    public void jdbcall() throws ClassNotFoundException, SQLException {

        Class.forName("com.mysql.cj.jdbc.Driver");//加载驱动类
        String url = "jdbc:mysql://120.25.25.222:3306/where_to_go";
        String username = "root";
        String password = "@Wzy892631290";
        Connection conn = DriverManager.getConnection(url, username, password);//用参数得到连接对象
//        System.out.println("连接成功！");
        System.out.println(conn);
    }
}
