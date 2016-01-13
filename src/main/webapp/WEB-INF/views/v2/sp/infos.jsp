<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%--
  ~ /**
  ~ *
  ~ *    Created by OuYangX.
  ~ *    Copyright (c) 2015, ouyangxian@gmail.com All Rights Reserved.
  ~ *
  ~ */
  --%>

<body>
<section>
    <div class="container">
        <div class="row">
            <label>扣量百分比（默认 0,如设置为 10 即扣量10%）</label>
            <input id="limit_value" class="" type="text" value="${limit_value}"/>
            <button id="setup_limit_value" class="btn btn-info">设置</button>
            <span id="help_setup_limit_value"></span>
        </div>
    </div>
</section>
<section>
    <div class="container-fluid">

        <div class="row" id="spInfos">
            <table class="box table-no-bordered" id="infosBox">
            </table>
        </div>
    </div>
</section>

<script type="text/javascript" src="/res/js/thirdparty/jquery.js?8n5btr"></script>
<script type="text/javascript" src="/res/js/thirdparty/jquery.ui.all.js?8n5btr"></script>
<script type="text/javascript" src="/res/js/thirdparty/jquery.form.js?8n5btr"></script>

<script type="text/javascript" src="/res/js/thirdparty/bootstrap.min.js"></script>
<script type="text/javascript" src="/res/js/thirdparty/bootstrap-plugins/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/res/js/thirdparty/bootstrap-plugins/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript" src="/res/js/require.min.js" data-main="/res/js/page/spinfo"></script>
</body>
