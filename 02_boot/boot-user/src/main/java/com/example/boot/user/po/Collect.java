package com.example.boot.user.po;

import javax.persistence.*;

@Table(name = "collect")
public class Collect {
    /**
     * 收藏的唯一标识，无具体意义（自增）
     */
    @Id
    private Integer id;

    /**
     * 用户唯一标识
     */
    @Column(name = "user_id")
    private Integer userId;

    /**
     * 景点唯一标识
     */
    @Column(name = "sight_id")
    private Integer sightId;

    /**
     * 获取收藏的唯一标识，无具体意义（自增）
     *
     * @return id - 收藏的唯一标识，无具体意义（自增）
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置收藏的唯一标识，无具体意义（自增）
     *
     * @param id 收藏的唯一标识，无具体意义（自增）
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取用户唯一标识
     *
     * @return user_id - 用户唯一标识
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 设置用户唯一标识
     *
     * @param userId 用户唯一标识
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取景点唯一标识
     *
     * @return sight_id - 景点唯一标识
     */
    public Integer getSightId() {
        return sightId;
    }

    /**
     * 设置景点唯一标识
     *
     * @param sightId 景点唯一标识
     */
    public void setSightId(Integer sightId) {
        this.sightId = sightId;
    }
}