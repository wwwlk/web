/**
 * 
 */

var move = 1;

$("#tr1").mousemove(function(e) {
	var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
	var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
	if (move == 1) {
		$("#mousepos").text(xx + ',' + yy);
		$("#posx").val(xx);
		$("#posy").val(yy);
		$(".content").css({
			"background-color" : "#00ff00",
			"left" : xx + 1,
			"top" : yy + 1
		});
		$(".content").html($("#input1").val());
	}

});

$("#tr1").click(function(e) {
	if (move == 0) {
		move = 1;
		$("#button1").attr("disabled",true);
	} else {
		move = 0;
		$("#button1").attr("disabled",false);
		//$("#button1").removeAttr("disabled"); 
	}
})