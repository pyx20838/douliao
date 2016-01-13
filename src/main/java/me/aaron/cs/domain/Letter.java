/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2016, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.domain;

import com.google.gson.Gson;

import java.io.Serializable;

public class Letter implements Serializable {

	/**
     *
     */
    private static final long serialVersionUID = -1692162509197698149L;

    private int  id;
    private int user_id;
    private int received_user_id;
    private String content;
    private String loc_cityname;
    private String loc_longitude;
    private String loc_latitude;
    private long update_time;
    private long create_time;

    public int getReceived_user_id() {
        return received_user_id;
    }

    public void setReceived_user_id(int received_user_id) {
        this.received_user_id = received_user_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(long create_time) {
        this.create_time = create_time;
    }

    public long getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(long update_time) {
        this.update_time = update_time;
    }

    public String getLoc_cityname() {
        return loc_cityname;
    }

    public void setLoc_cityname(String loc_cityname) {
        this.loc_cityname = loc_cityname;
    }

    public String getLoc_latitude() {
        return loc_latitude;
    }

    public void setLoc_latitude(String loc_latitude) {
        this.loc_latitude = loc_latitude;
    }

    public String getLoc_longitude() {
        return loc_longitude;
    }

    public void setLoc_longitude(String loc_longitude) {
        this.loc_longitude = loc_longitude;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}