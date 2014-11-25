$(function(){       
      
    var num1 = setRotate('.menuItemFirst');
    var num2 = setRotate('.menuItem');
    $('.menuItemFirst').bind('mouseenter',function(){
        clearRotate(num1);
        $('.menuItemFirst').css("transform", "rotate(0deg)");
    }).bind('mouseleave',function(){
        num1 = setRotate('.menuItemFirst');
    });
    $('.menuItem').bind('mouseenter',function(){
        clearRotate(num2);
        $('.menuItem').css("transform", "rotate(0deg)");
    }).bind('mouseleave',function(){
        num2 = setRotate('.menuItem');
    });
    var x = 3;
    var canvas = document.getElementById("blogCanvas");
	if(canvas.getContext){
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.fillStyle = '#fff';
		ctx.fill();
	
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.stroke();
	
		ctx.beginPath();
		ctx.arc(50,50,43,0,2*Math.PI,true);
		ctx.fillStyle = '#000';
		ctx.fill();
	
		ctx.fillStyle = '#f00';
		ctx.shadowColor = "#707070";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.font = 'italic bold 25px sans-serif';
		ctx.textBaseline = 'middle';
		ctx.fillText('Blog', x+17, 50);
	
	}

	var canvas2 = document.getElementById("weiboCanvas");
	if(canvas2.getContext){
		var ctx = canvas2.getContext("2d");
		ctx.beginPath();
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.fillStyle = '#fff';
		ctx.fill();
	
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.stroke();
	
		ctx.beginPath();
		ctx.arc(50,50,43,0,2*Math.PI,true);
		ctx.fillStyle = '#000';
		ctx.fill();
	
		ctx.fillStyle = '#f00';
		ctx.shadowColor = "#707070";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.font = 'italic bold 25px sans-serif';
		ctx.textBaseline = 'middle';
		ctx.fillText('Weibo', x+7, 50);
	
	}
	
	var canvas3 = document.getElementById("pictureCanvas");
	if(canvas3.getContext){
		var ctx = canvas3.getContext("2d");
		ctx.beginPath();
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.fillStyle = '#fff';
		ctx.fill();
	
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.arc(50,50,49,0,2*Math.PI,true);
		ctx.stroke();
	
		ctx.beginPath();
		ctx.arc(50,50,43,0,2*Math.PI,true);
		ctx.fillStyle = '#000';
		ctx.fill();
	
		ctx.fillStyle = '#f00';
		ctx.shadowColor = "#707070";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.font = 'italic bold 25px sans-serif';
		ctx.textBaseline = 'middle';
		ctx.fillText('Twitter', x, 50);
	
	}
	
	var num3 = setRotate('#blogCanvas');
	var num4 = setRotate('#weiboCanvas');
	var num5 = setRotate('#pictureCanvas');
	$('#blogCanvas').bind('mouseenter',function(){
        clearRotate(num3);
        $('#blogCanvas').css("transform", "rotate(0deg)");
    }).bind('mouseleave',function(){
        num3 = setRotate('#blogCanvas');
    }).bind("click",function(){
    	window.open("http://homfen.github.io/jekyll","_blank");
    });
    $('#weiboCanvas').bind('mouseenter',function(){
        clearRotate(num4);
        $('#weiboCanvas').css("transform", "rotate(0deg)");
    }).bind('mouseleave',function(){
        num4 = setRotate('#weiboCanvas');
    }).bind("click",function(){
    	window.open("http://weibo.com/homfen","_blank");
    });
    $('#pictureCanvas').bind('mouseenter',function(){
        clearRotate(num5);
        $('#pictureCanvas').css("transform", "rotate(0deg)");
    }).bind('mouseleave',function(){
        num5 = setRotate('#pictureCanvas');
    }).bind("click",function(){
    	window.open("https://twitter.com/homfen","_blank");
    });

    /*$('.sidebar .hidden').load('xiami.php .track_list',function(){
        var str='<div class="xiamitop"></div><embed src="http://www.xiami.com/widget/5850808_';
        var ar = new Array();
        $('.sidebar .hidden .track_list tr').each(function(){
            var id = $(this).attr('id');
            id = id.substring(9);
            ar.push(id);
        });
        ar.sort(randomSort);
        for(var i=ar.length-1;i>=0;i--){
            str+=ar[i]+',';
        }
        str+='_180_140_FF8719_000000_1/multiPlayer.swf" type="application/x-shockwave-flash" width="180" height="140" wmode="opaque"></embed><div class="xiamibottom"></div><div class="hidden"></div>';
        $('.xiami').html('');
        $(str).appendTo($('.xiami'));

    });*/
    var listIndex = Math.floor(Math.random()*2);
    var songsArr = songList[listIndex].split(',');
    songsArr = songsArr.sort(randomSort);
    var songStr = songsArr.join(',');
    $(".xiamicontent").html('<embed src="http://www.xiami.com/widget/5850808_'+songStr+',_180_140_FF8719_000000_1/multiPlayer.swf" type="application/x-shockwave-flash" width="180" height="140" wmode="opaque">');
	
});
function setRotate(node){
    var index1 = 0;
    var direct1 = -1;
    var deg = 0;
    var round1 = Math.floor(Math.random()*10+1)*100;
    return setInterval(function(){
        index1 =index1+1;
        if(index1%round1==0){
            index1 = 0;
            direct1 = direct1*(-1);
            round1 = Math.floor(Math.random()*10+1)*100;
        }
        deg = deg+direct1*round1/2000;
        $(node).css("transform", "rotate(" + (deg) + "deg)");
    },2);
}
function clearRotate(num){
    clearInterval(num);
}
function randomSort(a,b){ //数组元素随机排列
    return Math.random()>.5 ? -1:1;
}
document.oncontextmenu=function(){return false;}