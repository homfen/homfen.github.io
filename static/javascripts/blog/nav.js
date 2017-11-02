var aside = $("aside");
var menu = $(".menu");
var container = $(".container");

menu.on("click",function(){
	var left = aside.offset().left;
	if(left<0){
		aside.animate({left:0});
		container.animate({paddingLeft:"200px"});
	}else{
		aside.animate({left:-200});
		container.animate({paddingLeft:0});
	}
});

$(window).on("scroll",function(){
	var scrollTop = $(window).scrollTop();
	var topnav= $(".container>nav");
	if(scrollTop>250){
		if(topnav.css("display")=="none"){
			topnav.show();
		}
	}else{
		if(topnav.css("display")=="block"){
			topnav.hide();	
		}
	}
});
