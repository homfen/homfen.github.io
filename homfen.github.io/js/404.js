var i = 0;
$(function(){
	$(".demo span:last").bind("click",function(){
		i++;
		if(i==4){
			$(".post").show();
		}
	});
	$(".demo span:eq(0)").bind("click",function(){
		i=0;
		$(".post").hide();
	});
});