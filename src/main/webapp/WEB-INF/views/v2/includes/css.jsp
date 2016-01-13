<%@ page pageEncoding="UTF-8"%>
<jsp:include page="../includes/versions.jsp"></jsp:include>
<%!public static void writeScript(JspWriter out, String path, String version,
			String screen) throws java.io.IOException {
		out.print("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + path
				+ "?v=" + version + "\" media=\"" + screen + "\">\n");
	}%>
<%
	String version = "1.1.1";
	if (request.getAttribute("version") != null)
		version = (String) request.getAttribute("version");

	String path = request.getParameter("path");
	String[] cssPaths = path.split(",");
	if (cssPaths != null && cssPaths.length > 0) {
		
		for (int i = 0; i < cssPaths.length; i++) {
			String cPath = cssPaths[i];
			String mType = "screen";
			int index = cPath.indexOf("?");
			
			if (index != -1) {
				mType = cPath.substring(index + 1);
				cPath = cPath.substring(0,index);
			}
			writeScript(out, cPath, version, mType);
		}
	}
%>
