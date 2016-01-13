/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.dao;

import me.aaron.cs.domain.Letter;
import me.aaron.cs.domain.LetterInfo;
import me.aaron.cs.domain.User;

import java.util.List;
import java.util.Map;

public interface DlDao {

    public void addUser(User user);

    public User getUser(Map<String,Object> params);

    public void sendLetter(Letter letter);

    public int sendedLetter(Map<String, Object> params);

    public List<LetterInfo> getLetters(Map<String, Object> params);

    public List<Long> getRadomIds(Map<String, Object> params);

    public LetterInfo getLastLetter(Map<String, Object> params);


}