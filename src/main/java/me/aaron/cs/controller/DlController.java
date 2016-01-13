/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs.controller;

import com.google.gson.Gson;
import me.aaron.cs.CsConfig;
import me.aaron.cs.domain.Letter;
import me.aaron.cs.domain.LetterInfo;
import me.aaron.cs.domain.User;
import me.aaron.cs.form.LetterForm;
import me.aaron.cs.form.UserForm;
import me.aaron.cs.service.DlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DlController {

    private static final Logger LOG = LoggerFactory.getLogger(DlController.class);

    @Autowired
    private DlService dbService;


    @RequestMapping(value = "/get_personal_info", method = RequestMethod.GET)
    @ResponseBody
    public Object getUser(HttpServletRequest request, HttpServletResponse response) {

        LOG.info("get personal request params- {}", (new Gson()).toJson(request.getParameterMap()));

        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> paramMap = new HashMap<>();

        try {
            paramMap.put("uid", request.getParameter("uid"));
            paramMap.put("type", request.getParameter("type"));


            User user = dbService.getUser(paramMap);
            if (user != null) {
                resultMap.put("userinfo", user);
                resultMap.put("code", CsConfig.ERROR_CODE.SUCCESS);
            } else {
                resultMap.put("code", CsConfig.ERROR_CODE.USER_NOT_FOUND);
                resultMap.put("msg", CsConfig.ERROR_MSG.USER_NOT_FOUND);

            }
            LOG.info("get personal info response - {}", (new Gson()).toJson(resultMap));
        } catch (Exception e) {
            LOG.error("get personal info response error.", e);

            resultMap.put("msg", CsConfig.ERROR_MSG.SYSTEM_ERROR);
            resultMap.put("code", CsConfig.ERROR_CODE.SYSTEM_ERROR);
        }
        return (new Gson()).toJson(resultMap);
    }

    @RequestMapping(value = "/create_douban_user", method = RequestMethod.POST)
    @ResponseBody
    public Object addUser(HttpServletRequest request, @Valid @RequestBody UserForm userForm, HttpServletResponse response) {

        LOG.info("create douban user request params- {}", userForm);

        Map<String, Object> resultMap = new HashMap<String, Object>();

        try {
            User user = dbService.addDoubanUser(userForm);
            Map<String, Object> resultBody = new HashMap<>();
            resultBody.put("id", user.getId());
            resultMap.put("userinfo", resultBody);
            resultMap.put("code", CsConfig.ERROR_CODE.SUCCESS);

            LOG.info("create douban user  response - {}", (new Gson()).toJson(resultMap));
        } catch (Exception e) {
            LOG.error("create douban user response error.", e);
            resultMap.put("msg", CsConfig.ERROR_MSG.SYSTEM_ERROR);
            resultMap.put("code", CsConfig.ERROR_CODE.SYSTEM_ERROR);
        }
        return (new Gson()).toJson(resultMap);
    }

    @RequestMapping(value = "/get_letters", method = RequestMethod.GET)
    @ResponseBody
    public Object getLetter(HttpServletRequest request, HttpServletResponse response) {

        LOG.info("get letters request params- {}", (new Gson()).toJson(request.getParameterMap()));

        Map<String, Object> resultMap = new HashMap<String, Object>();
        Map<String, Object> paramMap = new HashMap<>();

        try {
            paramMap.put("user_id", request.getParameter("user_id"));

            User user = dbService.getUser(paramMap);
            if (user != null) {
                List<LetterInfo> letters = dbService.getLetters(paramMap);
                if (letters != null && !letters.isEmpty()) {
                    resultMap.put("letters", letters);
                    resultMap.put("code", CsConfig.ERROR_CODE.SUCCESS);
                } else {
                    resultMap.put("code", CsConfig.ERROR_CODE.LETTER_NOT_FOUND);
                    resultMap.put("msg", CsConfig.ERROR_MSG.LETTER_NOT_FOUND);
                }
            } else {
                resultMap.put("code", CsConfig.ERROR_CODE.USER_NOT_FOUND);
                resultMap.put("msg", CsConfig.ERROR_MSG.USER_NOT_FOUND);

            }
            LOG.info("get letters response - {}", (new Gson()).toJson(resultMap));
        } catch (Exception e) {
            LOG.error("get letters response error.", e);
            resultMap.put("msg", CsConfig.ERROR_MSG.SYSTEM_ERROR);
            resultMap.put("code", CsConfig.ERROR_CODE.SYSTEM_ERROR);
        }
        return (new Gson()).toJson(resultMap);
    }

    @RequestMapping(value = "/get_random_letter", method = RequestMethod.GET)
    @ResponseBody
    public Object getRandomLetter(HttpServletRequest request, HttpServletResponse response) {

        LOG.info("get random letter request params- {}", (new Gson()).toJson(request.getParameterMap()));

        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> paramMap = new HashMap<>();

        try {
            paramMap.put("user_id", request.getParameter("user_id"));
            paramMap.put("sex", request.getParameter("sex"));
            paramMap.put("location", request.getParameter("location"));

            User user = dbService.getUser(paramMap);
            if (user != null) {
                LetterInfo letter = dbService.getRandomLetter(paramMap);
                if (letter != null) {
                    resultMap.put("letter", letter);
                    resultMap.put("code", CsConfig.ERROR_CODE.SUCCESS);
                } else {
                    resultMap.put("code", CsConfig.ERROR_CODE.LETTER_NOT_FOUND);
                    resultMap.put("msg", CsConfig.ERROR_MSG.LETTER_NOT_FOUND);
                }

            } else {
                resultMap.put("code", CsConfig.ERROR_CODE.USER_NOT_FOUND);
                resultMap.put("msg", CsConfig.ERROR_MSG.USER_NOT_FOUND);

            }
            LOG.info("get random letter response - {}", (new Gson()).toJson(resultMap));
        } catch (Exception e) {
            LOG.error("get random letter response error.", e);
            resultMap.put("msg", CsConfig.ERROR_MSG.SYSTEM_ERROR);
            resultMap.put("code", CsConfig.ERROR_CODE.SYSTEM_ERROR);
        }
        return (new Gson()).toJson(resultMap);
    }

    @RequestMapping(value = "/send_letter", method = RequestMethod.POST)
    @ResponseBody
    public Object sendLetter(HttpServletRequest request, @Valid @RequestBody LetterForm letterForm, HttpServletResponse response) {

        LOG.info("send letter request params- {}", letterForm);

        Map<String, Object> resultMap = new HashMap<String, Object>();

        try {
            Letter letter = dbService.sendLetter(letterForm);
            Map<String, Object> resultBody = new HashMap<>();
            resultBody.put("id", letter.getId());
            resultMap.put("letter", resultBody);
            resultMap.put("code", CsConfig.ERROR_CODE.SUCCESS);

            LOG.info("send letter response - {}", (new Gson()).toJson(resultMap));
        } catch (Exception e) {
            LOG.error("send letter response error.", e);
            resultMap.put("msg", CsConfig.ERROR_MSG.SYSTEM_ERROR);
            resultMap.put("code", CsConfig.ERROR_CODE.SYSTEM_ERROR);
        }
        return (new Gson()).toJson(resultMap);
    }
}
