var winX,winY;
var foundCount = 0;

$(function(){ init(); });
$(window).resize(function(){ init(); initPixel(); })

function init(){
	winX=$(window).width();
	winY=$(window).height();
	initPixel();
}
	
$(window).mousemove(function(e){
//	$('#distance').text('x='+e.pageX+' y='+e.pageY);
	if(e.pageY>winY/2) {
		var distanceposY = e.pageY-50;
		}
		else {
		var distanceposY = e.pageY+50;
		}
	if(e.pageX<winX/2) {
		var distanceposX = e.pageX + 60;
		}
		else {
		var distanceposX = e.pageX - 50;			
		}
	if(pixelPos){
	$('#distance').css({'top':distanceposY,'left':distanceposX});
	$('#distance').text(' xΔ='+ (e.pageX-pixelPos.left) + ' yΔ='+ (e.pageY-pixelPos.top) ) ;
	}
	else {
	$('#distance').text('');
	}
	if(e.pageX-pixelPos.left == 0 && e.pageY-pixelPos.top == 0){
		alert('Found it!');
		foundCount++;
		initPixel();
	}
});

/*
var pixelPos;
$('#pixel').mouseover(function(e){
	pixelPos = {
		top: e.pageY,
		left: e.pageX,
	}
	$('#distance').text(' xΔ='+ (e.pageX-pixelPos.left) + ' yΔ='+ (e.pageY-pixelPos.top) ) 
});
*/

function initPixel(){
	$('#counter .score').text(foundCount);
	pixelPos = {
		top: Math.floor(Math.random()*(winY-20))+20,
		left: Math.floor(Math.random()*winX),
	}
	console.log('x:'+pixelPos.left+' y:'+pixelPos.top )
}