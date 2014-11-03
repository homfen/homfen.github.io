var pCls = "percent";
var pUnitCls = "unit";
var pTopCls = "top";
var pBtmCls = "btm";
var pSpeed = 180;//翻页速度，毫秒

function transform(obj,tran) {
	try{
		obj.style.WebkitTransform = tran;
		obj.style.MozTransform = tran;
		obj.style.msTransform = tran;
		obj.style.OTransform = tran;
		obj.style.transform = tran;
	}catch (e){
	}
}
		

var pUnit = function(val, minVal, maxVal){
	this.stop = false;
	this.update = function() {
		this.updateTxt(); 
		if(this.val>=this.maxVal){this.stop = true;}
	}
	this.incVal = function() { this.val++; this.update(); }
	this.decVal = function() { this.val--; this.update(); }
	this.updateTxt = function() { this.text = this.val; }
	this.setVal = function(v) { this.val = v; 
		this.updateTxt(); 
	} 
	
	this.pane = document.createElement("div");
	this.pane.className = pUnitCls;
	this.setVal(val);
	this.minVal = minVal;
	this.maxVal = maxVal;
	this.topbak = document.createElement("div");this.topbak.txt = document.createElement("span");this.topbak.className = pTopCls;
	this.topfnt = document.createElement("div");this.topfnt.txt = document.createElement("span");this.topfnt.className = pTopCls;
	this.btmbak = document.createElement("div");this.btmbak.txt = document.createElement("span");this.btmbak.className = pBtmCls;
	this.btmfnt = document.createElement("div");this.btmfnt.txt = document.createElement("span");this.btmfnt.className = pBtmCls;
	this.pane.appendChild(this.topbak); this.topbak.appendChild(this.topbak.txt);
	this.pane.appendChild(this.topfnt); this.topfnt.appendChild(this.topfnt.txt);
	this.pane.appendChild(this.btmbak); this.btmbak.appendChild(this.btmbak.txt);
	this.pane.appendChild(this.btmfnt); this.btmfnt.appendChild(this.btmfnt.txt);
	this.mtx = false;
	
	this.animateReset = function(){
		transform(this.btmfnt,"");
		transform(this.btmbak,"");
		
		this.btmfnt.txt.innerHTML=this.text;
		this.topbak.txt.innerHTML=this.text;
		this.topfnt.txt.innerHTML=this.text;
		this.btmbak.txt.innerHTML=this.text;
		
		transform(this.topfnt,"");
		transform(this.topbak,"");
	}
	
	
	this.turnDown = function(){
		var u = this;
		if(this.mtx) return; //this.mtx = true;
		if(!this.stop&&this.minVal<this.maxVal){
			this.incVal();
		
			var topDeg = 0;var btmDeg = 90;
			
			this.topbak.txt.innerHTML=this.text;
			
			transform(u.topfnt,"rotateX(0deg)");
			
			var timer1 = setInterval(function(){
							transform(u.topfnt,"rotateX("+topDeg+"deg)"); topDeg-=10;
							if(topDeg<=-90){
								transform(u.topfnt,"rotateX(0deg)");
								u.topfnt.txt.innerHTML=u.text;
								transform(u.btmfnt,"rotateX(90deg)");
								u.btmfnt.txt.innerHTML=u.text;
								var timer2 = setInterval(function(){
												if(btmDeg<=0) { clearInterval(timer2);u.animateReset(); u.mtx=false; }
												transform(u.btmfnt,"rotateX("+btmDeg+"deg)"); btmDeg-=10;},30);
								clearInterval(timer1);
							}},30);
		}
	}
	
	this.animateReset();
}

var Percent = function(id,p,sp,width,fontColor,paneColor,ifBr){
	prt = document.getElementById(id);
	prt.innerHTML = "";
	this.pane = document.createElement("div");
	this.pane.className = pCls;
	var p1,p2,p3;
	if(p){
		p1 = parseInt(p);
		p2 = Math.floor(p*10)%10;
		p3 = Math.floor(p*100)%10;
	}else{
		var date = new Date();
		p1 = date.getMonth()+1;
		p2 = date.getDate();
		p3 = 0;
		if(p2<10){
			p3=p2;
			p2=0;
		}else{
			p3 = p2%10;
			p2 = Math.floor(p2/10);
		}
	}
	var p11 = parseInt(p1/10);
	var p12 = p1%10;
	
	this.ge1 = new pUnit(0, 0, p11);
	this.pane.appendChild(this.ge1.pane);
	this.ge2 = new pUnit(0, 0, p12);
	this.pane.appendChild(this.ge2.pane);
	this.fen = new pUnit(0, 0, p2);
	this.bai = new pUnit(0, 0, p3);
	var dot = document.createElement("div");
	dot.style.width = "10px";
	dot.style.height = "10px";
	dot.style.marginTop = "64px";
	if(document.all){
		dot.style.styleFloat = "left";
	}else{
		dot.style.cssFloat = "left";
	}
	dot.style.background = "#000000";
	this.pane.appendChild(dot);
	if(ifBr){
		dot.style.display = "none";
		var br = document.createElement("br");
		this.pane.appendChild(br);
	}
	this.pane.appendChild(this.fen.pane);
	this.pane.appendChild(this.bai.pane);
	prt.appendChild(this.pane);
	var percent = this;
	this.timer = null;
	
	var i = 1;
	if(sp){
		pSpeed = sp;
	}

	var scale = 1;
	if(width){
		var unit = document.getElementsByClassName("unit");
		setElementsStyle(unit,"width",width+"px");
		setElementsStyle(unit,"height",width+"px");
		setElementsStyle(unit,"margin",width/8+"px");
		var unitSpan = getChildrenByTag(unit,"span");
		setElementsStyle(unitSpan,"width",width+"px");
		setElementsStyle(unitSpan,"font",width*3/4+"px/"+width+"px"+" Microsoft YaHei, Tahoma, Geneva, sans-serif");
		setElementsStyle(unitSpan,"fontWeight","bold");
		var btm = document.getElementsByClassName("btm");
		setElementsStyle(btm,"top",width/2+1+"px");
		setElementsStyle(btm,"width",width+"px");
		setElementsStyle(btm,"height",width/2+"px");
		var btmSpan = getChildrenByTag(btm,"span");
		setElementsStyle(btmSpan,"top","-"+width/2+"px");
		var top = document.getElementsByClassName("top");
		setElementsStyle(top,"width",width+"px");
		setElementsStyle(top,"height",width/2+"px");
		setElementsStyle(dot,"width",width/6+"px");
		setElementsStyle(dot,"height",width/6+"px");
		setElementsStyle(dot,"marginTop",width/2+width/8-width/12+"px");
		scale = width/64+1;
	}
	if(fontColor){
		var unit = document.getElementsByClassName("unit");
		var unitSpan = getChildrenByTag(unit,"span");
		setElementsStyle(unitSpan,"color",fontColor);

	}
	if(paneColor){
		var top = document.getElementsByClassName("top");
		setElementsStyle(top,"background",paneColor);
		var btm = document.getElementsByClassName("btm");
		setElementsStyle(btm,"background",paneColor);
		setElementsStyle(dot,"background",paneColor);
		
	}

	var units = document.getElementsByClassName("unit");
	var top1 = units[0].getElementsByClassName("top");
	var btm1 = units[0].getElementsByClassName("btm");
	setElementsStyle(top1,"boxShadow",1*scale+"px "+1*scale+"px 0 #878787,"+2*scale+"px "+2*scale+"px 0 #ababab,"+3*scale+"px "+3*scale+"px 0 #c6c6c6");
	setElementsStyle(btm1,"boxShadow",1*scale+"px "+1*scale+"px 0 #878787,"+2*scale+"px "+2*scale+"px 0 #ababab,"+3*scale+"px "+3*scale+"px 0 #c6c6c6");
	var top4 = units[3].getElementsByClassName("top");	
	var btm4 = units[3].getElementsByClassName("btm");
	setElementsStyle(top4,"boxShadow",-1*scale+"px "+1*scale+"px 0 #878787,"+(-2*scale)+"px "+2*scale+"px 0 #ababab,"+(-3*scale)+"px "+3*scale+"px 0 #c6c6c6");
	setElementsStyle(btm4,"boxShadow",-1*scale+"px "+1*scale+"px 0 #878787,"+(-2*scale)+"px "+2*scale+"px 0 #ababab,"+(-3*scale)+"px "+3*scale+"px 0 #c6c6c6");
	if(ifBr){
		var top1 = units[0].getElementsByClassName("top");
		setElementsStyle(top1,"borderRadius","0 10px 0 0");

		var top2 = units[1].getElementsByClassName("top"); 
		var btm2 = units[1].getElementsByClassName("btm"); 
		setElementsStyle(top2,"boxShadow",-1*scale+"px "+1*scale+"px 0 #878787,"+(-2*scale)+"px "+2*scale+"px 0 #ababab,"+(-3*scale)+"px "+3*scale+"px 0 #c6c6c6");
		setElementsStyle(top2,"borderRadius","10px 0 0 0");
		setElementsStyle(btm2,"boxShadow",-1*scale+"px "+1*scale+"px 0 #878787,"+(-2*scale)+"px "+2*scale+"px 0 #ababab,"+(-3*scale)+"px "+3*scale+"px 0 #c6c6c6");

		var top3 = units[2].getElementsByClassName("top"); 
		var btm3 = units[2].getElementsByClassName("btm"); 
		setElementsStyle(top3,"boxShadow",1*scale+"px "+1*scale+"px 0 #878787,"+2*scale+"px "+2*scale+"px 0 #ababab,"+3*scale+"px "+3*scale+"px 0 #c6c6c6");
		setElementsStyle(btm3,"boxShadow",1*scale+"px "+1*scale+"px 0 #878787,"+2*scale+"px "+2*scale+"px 0 #ababab,"+3*scale+"px "+3*scale+"px 0 #c6c6c6");
		setElementsStyle(btm3,"borderRadius","0 0 10px 0");

		var btm4 = units[3].getElementsByClassName("btm"); 
		setElementsStyle(btm4,"borderRadius","0 0 0 10px");
	}else{
		var btm2 = units[1].getElementsByClassName("btm"); 
		setElementsStyle(btm2,"boxShadow","0px "+1*scale+"px 0 #878787,0px "+2*scale+"px 0 #ababab,0px "+3*scale+"px 0 #c6c6c6");
		var btm3 = units[2].getElementsByClassName("btm"); 
		setElementsStyle(btm3,"boxShadow","0px "+1*scale+"px 0 #878787,0px "+2*scale+"px 0 #ababab,0px "+3*scale+"px 0 #c6c6c6");
	}


	var speed = pSpeed;
	this.start = function(){ 
		this.timer = setInterval(function(){
			percent.bai.turnDown();
			percent.fen.turnDown();
			percent.ge1.turnDown();
			percent.ge2.turnDown();
			speed += ++i*pSpeed;
		},speed); 
	}

	this.pause = function(){ 
		clearInterval(this.timer); 
	}
	
	this.start();

	return percent;
}

function setElementsStyle(elements,style,value){
	if(elements.length>=0){
		for(var i=0;i<elements.length;i++){
			elements[i].style[style] = value;
		}
	}else{
		elements.style[style] = value;
	}
}

function getChildrenByTag(elements,tag){
	var arr = [];
	for(var i=0;i<elements.length;i++){
		var child = elements[i].getElementsByTagName(tag);
		for(var j=0;j<child.length;j++){
			arr.push(child[j]);
		}
	}
	return arr;
}
