<%@ page pageEncoding="utf-8" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
           prefix="decorator" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="../includes/html-attributes.jsp" %>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="description" content=""/>
    <%@ include file="../includes/front-head-config.jsp" %>
    <decorator:head/>
</head>
<body>
<%@ include file="../includes/front-header.jsp" %>

<div class="main-body">
    <decorator:body/>
    <%@ include file="../includes/front-sidebar.jsp" %>
</div>
<%@ include file="../includes/front-footer.jsp" %>
</body>
</html>