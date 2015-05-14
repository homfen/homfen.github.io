$(function(){
    var player = $("#player");
    var songs = ["Tennis Elbow","Feels Like Rain"];
    var songsLen = songs.length;
    var musicBtn = $("#music > a");
    var play = $("#play");
    var pause = $("#pause");
    var next = $("#next");
    var index = 0;
    player.on("ended",function(){
        nextSong();
    });
    play.on("click",function(){
        if(!play.hasClass("active")){
            play.addClass("active");
            pause.removeClass("active");
            player[0].play();
        }
    });
    pause.on("click",function(){
        if(!pause.hasClass("active")){
            play.removeClass("active");
            pause.addClass("active");
            player[0].pause();
        }
    });
    next.on("click",function(){
        nextSong();
    })
    musicBtn.on("click",function(){
        if(play.hasClass("active")){
            play.removeClass("active");
            pause.addClass("active");
            player[0].pause();
        }else{
            play.addClass("active");
            pause.removeClass("active");
            player[0].play();
        }
    });
    function nextSong(){
        var current = player.attr("title");
        var name = songs[++index%songsLen];
        while(current==name){
            name = songs[++index%songsLen];
        }
        player.attr("title",name);
        player.attr("src","./songs/"+name+".mp3");
        player[0].play();
        if(!play.hasClass("active")){
            play.addClass("active");
            pause.removeClass("active");
        }
    }
});