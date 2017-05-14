//Global constants
_wiki_game = {
	"0": "https://en.wikipedia.org/wiki/Biology",
	"1": "https://en.wikipedia.org/wiki/Computer_science",
	"2": "https://en.wikipedia.org/wiki/Physics",
	"3": "https://en.wikipedia.org/wiki/Chemistry"
}


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
	
	var activeIndex = $("#targetWiki .carousel-indicators .active").attr("data-slide-to");
	var initialWikiUrl = _wiki_game[activeIndex];
	$("#wikiFrame").attr("src", initialWikiUrl);
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
			$("#startTimer").addClass("btn-error");
			setTimeout(function(){
				$("#startTimer").removeClass("btn-error");
			}, 1000);
			$("#startTimer").css({"transform": "translate(10px)"});
			$("#startTimer").css({"transform": "translate(-10px)"});
			$("#startTimer").css({"transform": "translate(5px)"});
			$("#startTimer").css({"transform": "translate(-5px)"});
			$("#startTimer").css({"transform": "translate(-3px)"});
			$("#startTimer").css({"transform": "translate(3px)"});
			$("#startTimer").css({"transform": "translate(0px)"});
		}
	});
	
	$(".play").click(function(){
		play();
	});
	
	$("#closeRestartDialog").click(function(e){$("#confirmRestart").modal('toggle');});
	$("#restartGame").click(function(e){window.location.reload();});
	
});