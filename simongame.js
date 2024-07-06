var buttonColours=["green","red","yellow","blue"];
var gamePattern = [];
var userclickedpattern= [];

var started= false;
var level= 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " +level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userchosencolour=$(this).attr("id");
    userclickedpattern.push(userchosencolour);
    playsound(userchosencolour);
    animatePress(userchosencolour);
    checkanswer(userclickedpattern.length-1);
});

function checkanswer(currentlevel){
    if(gamePattern[currentlevel] === userclickedpattern[currentlevel]){
        if(userclickedpattern.length === gamePattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any key to Restart");
        setTimeout(function(){
           $("body").removeClass("game-over");
        },200);
        startover();
    }
}

function nextsequence() {
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomchosencolor =buttonColours[randomnumber];
    gamePattern.push(randomchosencolor);
    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchosencolor);
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playsound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}