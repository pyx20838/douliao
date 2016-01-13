/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.service;

import me.aaron.cs.dao.DlDao;
import me.aaron.cs.domain.Letter;
import me.aaron.cs.domain.LetterInfo;
import me.aaron.cs.domain.User;
import me.aaron.cs.form.LetterForm;
import me.aaron.cs.form.UserForm;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class DlService {

    private static Logger LOG = LoggerFactory.getLogger(DlService.class);

    @Autowired
    private DlDao dlDao;


    @Transactional(rollbackFor = {Exception.class})
    public User addDoubanUser(UserForm userForm) throws Exception {
        User user = new User();
        user.setType(0);
        user.setDouban_id(userForm.getUid());
        user.setDouban_alt(userForm.getAlt());
        BeanUtils.copyProperties(user, userForm);
        dlDao.addUser(user);
        return user;
    }

    public User getUser(Map<String,Object> params) throws Exception {
        User user = new User();
        return dlDao.getUser(params);
    }

    @Transactional(rollbackFor = {Exception.class})
    public Letter sendLetter(LetterForm letterForm) throws Exception {
        Letter letter = new Letter();
        BeanUtils.copyProperties(letter, letterForm);
        dlDao.sendLetter(letter);
        return letter;
    }

    public List<LetterInfo> getLetters(Map<String, Object> params) throws Exception {
        return dlDao.getLetters(params);
    }


    @Transactional(rollbackFor = {Exception.class})
    public LetterInfo getRandomLetter(Map<String, Object> params) throws Exception {
        LetterInfo letterInfo =  dlDao.getLastLetter(params);
        if(letterInfo != null) {
            params.put("id", letterInfo.getLetter_id());
            params.put("received_user_id", params.get("user_id"));
            dlDao.sendedLetter(params);
        }
        return letterInfo;

    }
}
