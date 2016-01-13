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

public class LetterInfo implements Serializable {

	/**
     *
     */
    private static final long serialVersionUID = -1692162509197698149L;
    private int letter_id;
    private int send_user_id;
    private String send_user_avatar;
    private String send_user_sex;
    private String send_user_location;
    private String content;
    private long create_time;


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(long create_time) {
        this.create_time = create_time;
    }

    public int getLetter_id() {
        return letter_id;
    }

    public void setLetter_id(int letter_id) {
        this.letter_id = letter_id;
    }

    public String getSend_user_avatar() {
        return send_user_avatar;
    }

    public void setSend_user_avatar(String send_user_avatar) {
        this.send_user_avatar = send_user_avatar;
    }

    public int getSend_user_id() {
        return send_user_id;
    }

    public void setSend_user_id(int send_user_id) {
        this.send_user_id = send_user_id;
    }

    public String getSend_user_location() {
        return send_user_location;
    }

    public void setSend_user_location(String send_user_location) {
        this.send_user_location = send_user_location;
    }

    public String getSend_user_sex() {
        return send_user_sex;
    }

    public void setSend_user_sex(String send_user_sex) {
        this.send_user_sex = send_user_sex;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}