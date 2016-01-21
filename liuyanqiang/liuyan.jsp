<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML>
<html>
<link rel="stylesheet" href="liuyan.css" type="text/css" />
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<head>
<title>留言墙</title>
</head>
<body>
	<table id="tableout" border="1">
		<tr id="tr1">
			<td>我是背景</td>
		</tr>
		<tr id="tr2">
			<td><div>
					<form action="/s2s2ibatis/htmltest/liuyanqiang/liuyanAction.action" method="post">
						输入内容<input id="input1" name="inputstr" value="XX"></input>
						<input id="posx" name="posx" style="display:none"></input>
						<input id="posy" name="posy" style="display:none"></input>
						<button type="submit" id="button1" disabled="true">提交</button>
					</form>
				</div> <span>当前鼠标位置</span><span id="mousepos">0,0</span></td>
		</tr>
	</table>
	<div class="content">hello!</div>
</body>

<script type="text/javascript">

</script>
<script src="liuyan.js"></script>

</html>