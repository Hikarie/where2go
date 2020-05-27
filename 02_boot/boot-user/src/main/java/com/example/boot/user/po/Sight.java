package com.example.boot.user.po;

import java.math.BigDecimal;
import javax.persistence.*;

@Table(name = "sight")
public class Sight {
    /**
     * 景点唯一标识(递增)
     */
    @Id
    @Column(name = "sight_id")
    private Integer sightId;

    /**
     * 景点名
     */
    @Column(name = "sight_name")
    private String sightName;

    /**
     * 景点类型
     */
    @Column(name = "sight_type")
    private String sightType;

    /**
     * 幸福指数
     */
    @Column(name = "happiness_index")
    private String happinessIndex;

    /**
     * 景点所在洲
     */
    private String state;

    /**
     * 景点所在国家
     */
    private String country;

    /**
     * 景点所在城市
     */
    private String city;

    /**
     * 景点的经度
     */
    private BigDecimal lng;

    /**
     * 景点的纬度
     */
    private BigDecimal lat;

    /**
     * 用户对景点的评分
     */
    private BigDecimal score;

    /**
     * 景点访问量
     */
    private Integer views;

    /**
     * 景点的详细描述
     */
    private String description;

    /**
     * 获取景点唯一标识(递增)
     *
     * @return sight_id - 景点唯一标识(递增)
     */
    public Integer getSightId() {
        return sightId;
    }

    /**
     * 设置景点唯一标识(递增)
     *
     * @param sightId 景点唯一标识(递增)
     */
    public void setSightId(Integer sightId) {
        this.sightId = sightId;
    }

    /**
     * 获取景点名
     *
     * @return sight_name - 景点名
     */
    public String getSightName() {
        return sightName;
    }

    /**
     * 设置景点名
     *
     * @param sightName 景点名
     */
    public void setSightName(String sightName) {
        this.sightName = sightName == null ? null : sightName.trim();
    }

    /**
     * 获取景点类型
     *
     * @return sight_type - 景点类型
     */
    public String getSightType() {
        return sightType;
    }

    /**
     * 设置景点类型
     *
     * @param sightType 景点类型
     */
    public void setSightType(String sightType) {
        this.sightType = sightType == null ? null : sightType.trim();
    }

    /**
     * 获取幸福指数
     *
     * @return happiness_index - 幸福指数
     */
    public String getHappinessIndex() {
        return happinessIndex;
    }

    /**
     * 设置幸福指数
     *
     * @param happinessIndex 幸福指数
     */
    public void setHappinessIndex(String happinessIndex) {
        this.happinessIndex = happinessIndex == null ? null : happinessIndex.trim();
    }

    /**
     * 获取景点所在洲
     *
     * @return state - 景点所在洲
     */
    public String getState() {
        return state;
    }

    /**
     * 设置景点所在洲
     *
     * @param state 景点所在洲
     */
    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    /**
     * 获取景点所在国家
     *
     * @return country - 景点所在国家
     */
    public String getCountry() {
        return country;
    }

    /**
     * 设置景点所在国家
     *
     * @param country 景点所在国家
     */
    public void setCountry(String country) {
        this.country = country == null ? null : country.trim();
    }

    /**
     * 获取景点所在城市
     *
     * @return city - 景点所在城市
     */
    public String getCity() {
        return city;
    }

    /**
     * 设置景点所在城市
     *
     * @param city 景点所在城市
     */
    public void setCity(String city) {
        this.city = city == null ? null : city.trim();
    }

    /**
     * 获取景点的经度
     *
     * @return lng - 景点的经度
     */
    public BigDecimal getLng() {
        return lng;
    }

    /**
     * 设置景点的经度
     *
     * @param lng 景点的经度
     */
    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }

    /**
     * 获取景点的纬度
     *
     * @return lat - 景点的纬度
     */
    public BigDecimal getLat() {
        return lat;
    }

    /**
     * 设置景点的纬度
     *
     * @param lat 景点的纬度
     */
    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    /**
     * 获取用户对景点的评分
     *
     * @return score - 用户对景点的评分
     */
    public BigDecimal getScore() {
        return score;
    }

    /**
     * 设置用户对景点的评分
     *
     * @param score 用户对景点的评分
     */
    public void setScore(BigDecimal score) {
        this.score = score;
    }

    /**
     * 获取景点访问量
     *
     * @return views - 景点访问量
     */
    public Integer getViews() {
        return views;
    }

    /**
     * 设置景点访问量
     *
     * @param views 景点访问量
     */
    public void setViews(Integer views) {
        this.views = views;
    }

    /**
     * 获取景点的详细描述
     *
     * @return description - 景点的详细描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置景点的详细描述
     *
     * @param description 景点的详细描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}