/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.domain;

import com.google.gson.Gson;

import java.io.Serializable;

public class User implements Serializable {

	/**
     *
     */
    private static final long serialVersionUID = -1692162509197698149L;

    private int  id;
    private int type;
    private String douban_id;
    private String rongim_id;
    private int sex;
    private String user_name;
    private String large_avatar;
    private String avatar;
    private String loc_name;
    private String douban_alt;
    private long update_time;
    private long create_time;

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(long create_time) {
        this.create_time = create_time;
    }

    public String getDouban_alt() {
        return douban_alt;
    }

    public void setDouban_alt(String douban_alt) {
        this.douban_alt = douban_alt;
    }

    public String getDouban_id() {
        return douban_id;
    }

    public void setDouban_id(String douban_id) {
        this.douban_id = douban_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLarge_avatar() {
        return large_avatar;
    }

    public void setLarge_avatar(String large_avatar) {
        this.large_avatar = large_avatar;
    }

    public String getLoc_name() {
        return loc_name;
    }

    public void setLoc_name(String loc_name) {
        this.loc_name = loc_name;
    }

    public String getRongim_id() {
        return rongim_id;
    }

    public void setRongim_id(String rongim_id) {
        this.rongim_id = rongim_id;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public long getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(long update_time) {
        this.update_time = update_time;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}