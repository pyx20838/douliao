/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2016, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.form;

import com.google.gson.Gson;

import java.io.Serializable;

public class UserForm implements Serializable {

	/**
     *
     */
    private static final long serialVersionUID = -1692162509197698149L;

    private String  uid;
    private int sex;
    private String user_name;
    private String large_avatar;
    private String avatar;
    private String loc_name;
    private String alt;
    private String update_time;
    private String create_time;

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
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

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {
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