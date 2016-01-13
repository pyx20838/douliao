<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
System.out.println(new java.util.Date()+" 引发异常：" + exception.getMessage());
%>
<head>
    <%@ include file="../includes/front-head-config.jsp" %>
    <title><fmt:message key="error.e_500_title"/></title>
</head>
<body>
    <%@ include file="../includes/front-header.jsp" %>
    <div class="inside" style="min-height: 350px;">
        <div class="container">
            <div id="content">
                <div class="login">
                    <div class="col_1">
                        <h1>
                            <span> <fmt:message key="error.e_500_tip"/></span>
                        </h1>
                        <p style="margin:20px 0;">
                       <fmt:message key="error.e_500_errmsg"/>：<%=exception.getMessage() %>
                        </p>
                        <p>
                            <a href="/"><font color=blue><fmt:message key="error.e_500_return"/></font> </a>
                        </p>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
    <%@ include file="../includes/front-footer.jsp" %>
</body>