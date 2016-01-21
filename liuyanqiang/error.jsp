<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>失败了</title>
</head>
<body>
<h1>操作失败</h1>
<h2>失败原因：<s:property value="%{errorMSG}"/></h2>
</body>
</html>