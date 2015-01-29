$(".category").bind("click",function(event){
    event = event||window.event;
    var target = $(event.target||event.srcElement);
    var ul = target.siblings("ul");
    ul.css("display",ul.css("display")=="none"?"block":"none");
});