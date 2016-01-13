<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
    <%@ include file="../includes/front-head-config.jsp" %>
    <title><fmt:message key="error.e_401_title"/></title>
</head>
<body>
    <%@ include file="../includes/front-header.jsp" %>
	<div class="inside" style="min-height: 350px;">
		<div class="container">
			<div id="content">
				<div class="login">
					<div class="col_1">
						<h1>
							<span> <fmt:message key="error.e_401_title"/></span>
						</h1>
						<p style="margin: 20px 0;">
							<span id="timer">5</span> <fmt:message key="error.e_401_tip"/>
						</p>
						<p>
							<a href="/"><font color=blue><fmt:message key="error.e_401_return"/></font> </a>
						</p>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="../includes/front-footer.jsp" %>
	<script>
	    var n = document.getElementById('timer');
	    var c = 5;
	    setInterval(function() {
	    	n.innerHTML = --c;
	    	if (c == 0)
	    	  location.href = "/";
	    }, 1000);
	</script>
</body>