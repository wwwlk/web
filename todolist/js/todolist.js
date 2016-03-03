
function deletetodolist(obj)
{
		var idclick=$(obj).parent().parent().find("#col2").text();
		//alert(idclick);
		layer.msg(idclick);
}

//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
/// 调用方法
//alert(GetQueryString("参数名1"));
//alert(GetQueryString("参数名2"));
//alert(GetQueryString("参数名3"));
//下面举一个例子:
//若地址栏URL为：abc.html?id=123&url=http://www.maidq.com
//那么，但你用上面的方法去调用：alert(GetQueryString("url"));
//则会弹出一个对话框：内容就是 http://www.maidq.com
//如果用：alert(GetQueryString("id"));那么弹出的内容就是 123 啦；
//当然如果你没有传参数的话，比如你的地址是 abc.html 后面没有参数，那强行输出调用结果有的时候会报错：
//所以我们要加一个判断 ，判断我们请求的参数是否为空，首先把值赋给一个变量：
//var myurl=GetQueryString("url");
//if(myurl !=null && myurl.toString().length>1)
//{
//   alert(GetQueryString("url"));
//}
//这样就不会报错了！
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//获取当前时间字符串	
function CurentTime()  
{   
    var now = new Date();  
         
    var year = now.getFullYear();       //年  
    var month = now.getMonth() + 1;     //月  
    var day = now.getDate();            //日  
         
    var hh = now.getHours();            //时  
    var mm = now.getMinutes();          //分  
    var ss=now.getSeconds();            //秒  
         
    var clock = year + "";  
         
    if(month < 10) clock += "0";         
    clock += month + "";  
         
    if(day < 10) clock += "0";   
    clock += day + "";  
         
    if(hh < 10) clock += "0";  
    clock += hh + "";  
  
    if (mm < 10) clock += '0';   
    clock += mm+ "";  
          
    if (ss < 10) clock += '0';   
    clock += ss;  
  
    return(clock);   
}  

$(document).ready(function(){
	
	//查询全部记录,前100条
	$.ajax({
	      "url": "https://d.apicloud.com/mcm/api/todolist?filter=%7B%22order%22%3A+%5B%22donetime+ASC%22%2C%22level+DESC%22%2C%22intime+DESC%22%5D%2C%22limit%22%3A100%7D",
	      "method": "GET",
	      "dataType": "json",
	      "cache": false,
	      "headers": {
	        "X-APICloud-AppId": "A6901793633537",
	        "X-APICloud-AppKey": "134a0fa03aa2b4fb84bc45d5f0da4b89d575af67.1456500652256"
	      }
	})
	.success(function (data, status, header) {
	      //success body
	      for(var i in data){   
          var tbBody = "";
          var trColor;
          if (i % 2 == 0) {
              trColor = "even";
          }
          else {
              trColor = "odd-row";
          }
          
          var checkStatus="checked='checked'";
          var dellineclass=" id='delline'"
          if ((data[i].donetime).length ==0) 
					{ 
						checkStatus="";
						dellineclass="";
					} 

	        //document.write("id:"+data[i].id+" content:"+data[i].content+" level:"+data[i].level+" intime:"+data[i].intime+" donetime:"+data[i].donetime +"<br\>");  	        
	        tbBody += "<tr class='" + trColor + "'" + dellineclass + "><td id='col1'><input type='checkbox' class='todolistrow' id='todolistrow" + i + "' " + checkStatus + " /></td><td id='col2'>" + data[i].id + "</td>" + "<td id='col3'>" + data[i].content + "</td>" + "<td id='col4'>" + data[i].level + "</td>" + "<td style='display:none;' id='col5'" + data[i].intime + "</td>"+ "<td style='display:none;' id='col6'" + data[i].donetime + "</td><td id='col7'><img src='css/delete.png' style='cursor:pointer' alt='删除' border='0' onclick='deletetodolist(this)'/></td></tr>";
          $("#myTb").append(tbBody);

      }    
      layer.msg('加载完成', {
			    offset: 0,
			    shift: 6
			});
			
			
			//加载完成,鼠标移动高亮
		 $("#myTb tr").mouseover(function(){     
		      //如果鼠标移到class为list的表格的tr上时，执行函数 ，给该行添加class  
		      $(this).addClass("highlight");  
		  });  
		  $("#myTb tr").mouseout(function(){     
		       //当鼠标移出该行时执行函数  ,移除class  
		      $(this).removeClass("highlight");  
		  });  


			//增加单选框事件,绑定的事件要放在ajax请求内
		  $(".todolistrow").click(function(){
		  	
				//alert($(this).attr("id"));
				var idclick=$(this).parent().parent().find("#col2").text();
				//alert($(this).is(':checked'));
				if ($(this).is(':checked')==true)
				{
					curDonetime=CurentTime();
				}
				else
				{
					curDonetime="";
				}
				
				$.ajax({
	      "url": "https://d.apicloud.com/mcm/api/todolist/"+idclick,
	      "method": "POST",
	      "cache": false,
	      "headers": {
	        "X-APICloud-AppId": "A6901793633537",
	        "X-APICloud-AppKey": "134a0fa03aa2b4fb84bc45d5f0da4b89d575af67.1456500652256"
	      },
	      "data": {"donetime":curDonetime,"_method":"PUT"}
				}).success(function (data, status, header) {
				      //success body
				      location=location;
				}).fail(function (header, status, errorThrown) {
				      layer.msg("更新失败");
				})
	
		  });
	})
	.fail(function (header, status, errorThrown) {
	      //fail body
	      layer.msg("数据加载失败", {
				    offset: 0,
				    shift: 6
				});

	});
	

  
  //增加按钮点击事件
  $("#btn").click(function(){
		$.ajax({
		      "url": "https://d.apicloud.com/mcm/api/todolist",
		      "method": "POST",
		      "cache": false,
		      "headers": {
		        "X-APICloud-AppId": "A6901793633537",
		        "X-APICloud-AppKey": "134a0fa03aa2b4fb84bc45d5f0da4b89d575af67.1456500652256"
		      },
		      "data": {
		        "content": $("#inputStr").val(),
		        "level": "1",
		        "intime": CurentTime(),
		        "donetime": ""
		      }
		}).success(function (data, status, header) {
		      //success body
		      layer.msg('保存成功', {
					    offset: 0,
					    shift: 6
					});
		      setTimeout("location=location;",2000);
					
		}).fail(function (header, status, errorThrown) {
		      //fail body
		      layer.msg("保存失败，请重新保存！", {
					    offset: 0,
					    shift: 6
					});
		})
  });
  

});