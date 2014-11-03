$(function(){
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  if(hour>=12){hour-=12;}
  var hourRotate = ((hour*60+minute)*360/(12*60))-180;
  var minuteRotate = ((minute*60+second+3)*360/(60*60))-180;
  animateHandRotate("hours-hand",hourRotate);
  animateHandRotate("minutes-hand",minuteRotate);
  //$('.hours-hand').css("transform",'rotate('+hourRotate+'deg)');
  //$('.minutes-hand').css("transform",'rotate('+minuteRotate+'deg)');
  setTimeout(function(){
    setInterval(function(){
      hourRotate = hourRotate+(1*360/(12*60*60));
      minuteRotate = minuteRotate+(1*360/(60*60));
      $('.hours-hand').css('transform','rotate('+hourRotate+'deg)');
      $('.minutes-hand').css('transform','rotate('+minuteRotate+'deg)');
    },1000);
  },3000);
});

function animateHandRotate(className,degNum){
  var degnum = -180;
  var timer = setInterval(function(){
    if(degnum<degNum){
      $("."+className).css("transform",'rotate('+degnum+'deg)');
      if(degNum-degnum>15){
        degnum+=5;
      }else{
        degnum+=1;
      }
    }else{
      clearInterval(timer);
      $("."+className).css("transform",'rotate('+degNum+'deg)');
      /*var degnum2 = 10;
      var dir1 = -1;
      var dir2 = -1;
      var timer2 = setInterval(function(){
        dir2 = dir2*dir1;
        if(degnum2!=0){
          $("."+className).css("transform",'rotate('+degnum+degnum2*dir2+'deg)');
          degnum2-=1;
        }else{
          clearInterval(timer2);
        }
      },20);*/
    }
  },10);
}