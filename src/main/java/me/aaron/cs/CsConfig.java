/*
 * *
 *
 *     Created by OuYangX.
 *     Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
 *
 * /
 */

package me.aaron.cs;

/**
 * Created by Mr.OuYangX, 15/8/13 下午9:42.
 */
public interface CsConfig {

    public static interface  ERROR_CODE {
        public static final Integer SUCCESS = 0;
        public static final Integer NOT_FOUND = 1011;
        public static final Integer SYSTEM_ERROR = 1000;

    }

    public static interface ERROR_MSG {
        public static final String NOT_FOUND = "用户不存在";
        public static final String LETTER_NOT_FOUND = "信件不存在";
        public static final String SYSTEM_ERROR = "系统内部错误";

    }
}
