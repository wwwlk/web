
//����������ʽ��ȡ��ַ���������� ǿ���Ƽ�����ʵ���ַ��㣡��
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//��ȡ��ǰʱ���ַ���	
function CurentTime()  
{   
    var now = new Date();  
         
    var year = now.getFullYear();       //��  
    var month = now.getMonth() + 1;     //��  
    var day = now.getDate();            //��  
         
    var hh = now.getHours();            //ʱ  
    var mm = now.getMinutes();          //��  
    var ss=now.getSeconds();            //��  
         
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
	
	//��ѯȫ����¼,ǰ100��
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
          if ((data[i].donetime).length ==0) 
					{ 
						checkStatus="";
					} 

	        //document.write("id:"+data[i].id+" content:"+data[i].content+" level:"+data[i].level+" intime:"+data[i].intime+" donetime:"+data[i].donetime +"<br\>");  	        
	        tbBody += "<tr class='" + trColor + "'><td id='col1'><input type='checkbox' class='todolistrow' id='todolistrow" + i + "' " + checkStatus + " /></td><td id='col2'>" + data[i].id + "</td>" + "<td id='col3'>" + data[i].content + "</td>" + "<td id='col4'>" + data[i].level + "</td>" + "<td style='display:none;' id='col5'" + data[i].intime + "</td>"+ "<td style='display:none;' id='col6'" + data[i].donetime + "</td></tr>";
          $("#myTb").append(tbBody);

      }    
      layer.msg('�������', {
			    offset: 0,
			    shift: 6
			});
			
			
			//�������,����ƶ�����
		 $("#myTb tr").mouseover(function(){     
		      //�������Ƶ�classΪlist�ı���tr��ʱ��ִ�к��� �����������class  
		      $(this).addClass("highlight");  
		  });  
		  $("#myTb tr").mouseout(function(){     
		       //������Ƴ�����ʱִ�к���  ,�Ƴ�class  
		      $(this).removeClass("highlight");  
		  });  


			//���ӵ�ѡ���¼�,�󶨵��¼�Ҫ����ajax������
		  $(".todolistrow").click(function(){
		  	
				//alert($(this).attr("id"));
				var idclick=$(this).parent().parent().find("#col2").text();
				alert($(this).is(':checked'));
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
				      layer.msg("����ʧ��");
				})
	
		  });
	})
	.fail(function (header, status, errorThrown) {
	      //fail body
	      layer.msg("���ݼ���ʧ��", {
				    offset: 0,
				    shift: 6
				});

	});
	

  
  //���Ӱ�ť����¼�
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
		      layer.msg('����ɹ�', {
					    offset: 0,
					    shift: 6
					});
		      setTimeout("location=location;",2000);
					
		}).fail(function (header, status, errorThrown) {
		      //fail body
		      layer.msg("����ʧ�ܣ������±��棡", {
					    offset: 0,
					    shift: 6
					});
		})
  });
  

});