<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="description" content="" />
    <title>HTTP.404 - 找不到页面</title>
  <meta name="keywords" content="IMSDK首页|IMSDK.IM|即时通讯|移动APP" />
  <%@ include file="../includes/front-head-config.jsp" %>
</head>
<body>
    <%@ include file="../includes/front-header.jsp"%>

    <div class="container">
        <div class="row">
        <div class="col-md-8 col-md-offset-2">
		    <div class="panel panel-danger http404">
		    <div class="panel-heading">
		    <h3 class="panel-title">崩溃啊，您确定您要找的页面没有错吗？怎么找也找不到了哟～</h3></div>
		    <div class="panel-body">
		        
			    <ul>
				    <li>想帮忙一起找？那请了解<a href="/about">关于我们</a></li>
				    <li>不想帮忙？那算了，继续<a href="/">关注产品</a></li>
			    </ul>
		    </div>
		    </div>
        </div>
        </div>
    </div>
    <%@ include file="../includes/front-footer.jsp"%>
</body>
</html>


