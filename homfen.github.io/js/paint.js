var theColor = "#ffffff";
var blackColor = "#000000";
var prevIcon = null;
var lineWidth = 1;
if (window.addEventListener) {
    window.addEventListener('load', function() {
        var canvas, context;

        var started = false;

        function init() {
            canvas = document.getElementById('imageView');
            if (!canvas) {
                alert('Error: I cannot find the canvas element!');
                return;
            }

            if (!canvas.getContext) {
                alert('Error: no canvas.getContext!');
                return;
            }

            context = canvas.getContext('2d');
            if (!context) {
                alert('Error: failed to getContext!');
                return;
            }
            // Attach the mousemove event handler.
            canvas.addEventListener('mousedown',function(){
                document.onselectstart = function(){ return false; }
                context.strokeStyle=theColor;
                context.lineWidth=lineWidth;
                canvas.addEventListener('mousemove', ev_mousemove, false);
            },false);
            canvas.addEventListener('mouseup',function(){
                canvas.removeEventListener('mousemove',ev_mousemove);
                context.closePath();
                started = false;
            },false);
        }
        

        function ev_mousemove(ev) {

            var x, y;

            if (ev.layerX || ev.layerX == 0) { // Firefox
                if(navigator.userAgent.indexOf("Firefox")>=0){
                    x = ev.layerX-32;
                    y = ev.layerY-31;
                }else{
                    x = ev.layerX;
                    y = ev.layerY;
                }
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                x = ev.offsetX;
                y = ev.offsetY;
            }
            if($(".iconclick").attr("id")=="pencil"){
                if (!started) {
                    context.beginPath();
                    context.moveTo(x, y);
                    started = true;
                } else {
                    context.lineTo(x, y);
                    context.stroke();
                }
            }
            if($(".iconclick").attr("id")=="eraser"){
                context.beginPath();
                context.fillStyle=blackColor;
                context.rect(x-8, y-8,16,16);
                context.fill();
            }
        }

        init();
    }, false);
}

var ColorHex=new Array('00','33','66','99','CC','FF') ;
var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF') ;
var current=null ;
function initcolor(evt)
{
var colorTable='' ;
for (i=0;i<2;i++)
{
for (j=0;j<6;j++)
{
colorTable=colorTable+'<tr height=15>' ;
colorTable=colorTable+'<td width=15 style="background-color:#000000">' ;
if (i==0){
colorTable=colorTable+'<td width=15 style="cursor:pointer;background-color:#'+ColorHex[j]+ColorHex[j]+ColorHex[j]+'" onclick="doclick(\''+'#'+ColorHex[j]+ColorHex[j]+ColorHex[j]+'\')">';
}
else{
colorTable=colorTable+'<td width=15 style="cursor:pointer;background-color:#'+SpColorHex[j]+'" onclick="doclick(\''+'#'+SpColorHex[j]+'\')">';
}
colorTable=colorTable+'<td width=15 style="background-color:#000000">' ;
for (k=0;k<3;k++)
{
for (l=0;l<6;l++)
{
colorTable=colorTable+'<td width=15 style="cursor:pointer;background-color:#'+ColorHex[k+i*3]+ColorHex[l]+ColorHex[j]+'" onclick="doclick(\''+'#'+ColorHex[k+i*3]+ColorHex[l]+ColorHex[j]+'\')">' ;
}
}
}
}
colorTable='<table border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse" bordercolor="000000" style="cursor:pointer;">'
+colorTable+'</table>'
+'<table border="0" cellspacing="0" cellpadding="0" style="border:1px #000000 solid;border-bottom:none;border-collapse: collapse;width:337px;" bordercolor="000000">'
+'<tr height=20><td colspan=21 bgcolor=#ffffff style="font:12px tahoma;padding-left:2px;">'
+'<span style="float:left;color:#999999;"></span>'
+'<span style="float:right;padding-right:3px;cursor:pointer;" onclick="colorclose()">×关闭</span>'
+'</td></table>';
document.getElementById("colorpane").innerHTML=colorTable;
var current_x = document.getElementById("color").offsetLeft;
var current_y = document.getElementById("color").offsetTop;
//alert(current_x + "-" + current_y)
document.getElementById("colorpane").style.left = current_x + "px";
document.getElementById("colorpane").style.top = current_y-200 + "px";
}
function doclick(obj){
//alert(obj);
theColor=obj;
document.getElementById("colorpane").style.display = "none";
$(".iconclick").removeClass("iconclick");
prevIcon.addClass("iconclick");
}
function colorclose(){
document.getElementById("colorpane").style.display = "none";
$(".iconclick").removeClass("iconclick");
prevIcon.addClass("iconclick");
//alert("ok");
}
function coloropen(){
document.getElementById("colorpane").style.display = "";
}
window.onload = initcolor;

$(function(){
    prevIcon = $(".iconclick");
    $(".icon").click(function(){
        switch($(this).find("img").attr("id")){
            case "color":
                if(document.getElementById("colorpane").style.display == "none"){
                    coloropen();
                    prevIcon = $(".iconclick");
                }
                break;
            case "pencil":
                $("#imageView").css("cursor","crosshair");
                lineWidth = 1;
                colorclose();
                break;
            case "eraser":
                if(navigator.userAgent.indexOf("Chrome")>=0||navigator.userAgent.indexOf("Safari")>=0){
                    $("#imageView").css("cursor","url('http://homfen.flynotions.com/image/icon/square16.png') 8 8,auto");
                }else{
                    $("#imageView").css("cursor","url('http://homfen.flynotions.com/image/icon/square.ico') 8 8,auto");
                }
                lineWidth = 16;
                colorclose();
                break;
            default:
                colorclose();
                break;

        }
        $(".iconclick").removeClass("iconclick");
        $(this).find("img").addClass("iconclick");
    });
	var image = new Image();
	image.src="../image/helloworld.png";
	$(image).load(function(){
		var canvas = document.getElementById("imageView");
		if(canvas.getContext('2d')){
			var ctx = canvas.getContext('2d');
			ctx.drawImage(image,82,65,430,275,0,0,430,275);
		}
	});
});