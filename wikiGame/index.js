//Get a random wiki page
var getRandomWiki = function(callback){

	//generate the url
	var remoteUrlWithOrigin = "https://en.wikipedia.org/w/api.php?format=json&generator=random&action=query";
	
	// Using jQuery
	$.ajax({
		url: remoteUrlWithOrigin,
		data: queryData,
		dataType: 'json',
		type: 'POST',
		headers: { 'Api-User-Agent': 'Example/1.0', 'Access-Control-Allow-Origin': '*' },
		success: function(data) {
			// do something with data
		}
	} );
}

var play = function(){
	$("#gameCover").hide();
	$("#iframePanel").show();
	window.location.href += "#game";
}

var playWithTimer = function(){
	
}
$(document).ready(function(){
	
	//some init settings
	//remove carousel auto slide
	$('.carousel').carousel({
		interval: false
	});
	
	//attaching event listeners
	$("#startTimer").click(function(){
		var time = $("#timerInput").val();
		if(time && time > 0){
			play();
			$("#timerDialog").modal('toggle');
		}
		else{
			$("#startTimer").addClass("btn-danger");
			setTimeout(function(){
				$("#startTimer").removeClass("btn-danger");
			}, 1000);
		}
	});
	
	$(".play").click(function(){
		play();
	});
	
	$("#closeRestartDialog").click(function(e){$("#confirmRestart").modal('toggle');});
	$("#restartGame").click(function(e){window.location.reload();});
	
});