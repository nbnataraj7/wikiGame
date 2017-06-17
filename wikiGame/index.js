//Global constants
_wiki_game = {
	"0": "https://en.wikipedia.org/wiki/Biology",
	"1": "https://en.wikipedia.org/wiki/Computer_science",
	"2": "https://en.wikipedia.org/wiki/Physics",
	"3": "https://en.wikipedia.org/wiki/Chemistry",
	"targetWiki": null,
	"clicks": [],
	"defaultURL": "https://en.m.wikipedia.org/wiki/"
}


//Get a random wiki page
var getRandomWiki = function(callback){

	//generate the url
//	var remoteUrlWithOrigin = "https://www.mediawiki.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1";
	var remoteUrlWithOrigin = "https://en.wikipedia.org/w/api.php?format=json&generator=random&action=query";
	var queryData = [];
	// Using jQuery
	
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&grnnamespace=0&prop=extracts&generator=random&origin=*", function(data){
		console.log(data);
		if(data && data.query && data.query.pages){
			var keys = Object.keys(data.query.pages);
			if(keys.length > 0){
				var title = data.query.page
				s[keys[0]].title;
				var wikiTitle = title.split(" ").join("_");
				callback.call(this, wikiTitle);
			}
		}
	});
}

var gameOver = function(success){
	$("#gameCover").hide();
	$("#iframePanel").hide();
	$("#gameOverPanel").show();
	if(success){	
		$("#gameOverImage").attr("src", "resources/heart.png");
		$(".score").html("<div>Congratulations!!!</div><span>You used "+_wiki_game.clicks.length+" clicks to navigate to the target page ("+_wiki_game.target+
		")</span>");
	}
	else{
		$("#gameOverImage").attr("src", "resources/sad.png");
		$(".score").html("<div>Sorry!</div><span>You can try again if you want.</span>");
	}
}

var play = function(){
	$("#gameCover").hide();
	$("#iframePanel").show();
	//window.location.href += "#game";
	
	var activeIndex = $("#targetWiki .carousel-indicators .active").attr("data-slide-to");
	_wiki_game.targetWiki = _wiki_game[activeIndex];
	
	//get a random wikipedia page
	getRandomWiki(function(wikiTitle){
		$("#wikiFrame").attr("src", _wiki_game.defaultURL+wikiTitle);
	});
}

var startTimer = function(time){
	var seconds = 60;
	var hours = Math.floor(Math.abs(time/60-1));
	var minutes = time-1<=0?0:time-1;
	var milliseconds = seconds * 1000;
	_wiki_game.timerRef = setInterval(function(){
		seconds--;
		if(minutes>0 && seconds == 0){
			seconds = 59;
			minutes--;
		}
		if(hours>0 && minutes == 0){
			minutes = 59;
			hours--;
		}
		if(seconds == 0 && minutes == 0 && hours == 0){
			clearInterval(_wiki_game.timerRef);
			$("#iframePanel").hide();
			$("#gameCover").hide();
			$("#gameOverPanel").show();
			gameOver(false);
			$("#timerPanel").removeClass("timer-panel-show");
		}
		hours = hours?"00":hours;
		minutes = minutes == 0?"00":minutes;
		seconds = seconds == 0?"00":seconds;
		var displayTime = hours+":"+minutes+":"+seconds;
		$("#timerPanel").html("Time&nbsp;&nbsp;<span>"+displayTime+"</span>");
	}, 1000);
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
			startTimer(time);
			setTimeout(function(){
				$("#timerPanel").addClass("timer-panel-show");
			}, 900);
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
	
	//adding events to iframe
	$("#wikiFrame").on("load", function(e){
		var url = $(this).attr("src");
		_wiki_game["clicks"].push(url);
		if(url == _wiki_game["targetWiki"]){
			gameOver(true);
		}
	});
	
	$("#tryAgain").click(function(){
		window.location.reload();
	});
});