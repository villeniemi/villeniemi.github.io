/* 
**
**	t h e
**	H I D D E N   P I X E L
**
**  Ville Niemi 2015
**
**  A game to find pixels on screen, complete waste of time, yet a great way to kill it.
**  Übersimple technics, set a pixel position and if mouse is at the same spot - congrats.
**
**	Version 0.5, initial release with difficulty levels
**
**	Development ideas:
**	- timer
**		- certain time limit to find pixel
**		- +20sec from each find
**
*/


// Global variables
var winX,winY;
var foundCount = 0;
var levelNames;

// Using jQuery "document ready", init everything.
$(function(){ init(); });
// Also initialise (or reset) everything after each resize [to prevent window size issues]
$(window).resize(function(){ initPixel(); })

// Practically find the size and set the pixel
function init(){
	winX=$(window).width();
	winY=$(window).height();
	initPixel();
	initLevels();
}


// Initiate the hidden pixel.
function initPixel(){
	// How many have we found?
	$('#counter .score').text(foundCount);
	// Give object "pixelPos" (the hidden pixel) random values top and left.
	pixelPos = {
		top: Math.floor(Math.random()*(winY-20))+20,
		left: Math.floor(Math.random()*winX),
	}
	$('.seeme').css({
			'left':pixelPos.left,
			'top':pixelPos.top
	});
//	console.log('x:'+pixelPos.left+' y:'+pixelPos.top )
}

function initLevels(){
	levelNames = [
					"I see you",		// level zero
					"I see you both",	// level one
					"I know you",		// level two
					"I still know you",	// level three
					"Shine like a star",	// level four
					"Maths I",
					"Maths II",
					"Hot or Not?", 
					"Minesweeping I", 
					"Minesweeping II", 
					"Minesweeping III", 
					"Vauxhall"
					];
	levelChange();
}

var l;
function levelChange(){
	l = foundCount; // foundCount equals the level we are on
	$('.lvName').text('"'+levelNames[l]+'"');
	if(l>=0 && l<4){ // I see you -modes, where pixel is visible
		$('<span class="seeme"></span>').appendTo($("content")).css({
			'left':pixelPos.left,
			'top':pixelPos.top
		});
		}
	// Shine like a star
	if(l==4){
		$('.seeme').remove();
		$('<span class="seeme"></span>').appendTo($("content")).css({
			'left':pixelPos.left,
			'top':pixelPos.top
		}).addClass('fader');
		}
	// Maths
	if(l==5){
		$('.seeme').remove();
		$('#distance').animate({'opacity':1},1000)
		}
	// Hot or Cold
	if(l==7){
		$('#distance').html('<b class="xD"> X </b> <b class="yD"> Y </b> ') ;
		}
	// Minesweepers
	if(l>=8 && l<=10){
		$('#distance').animate({'opacity':0},1000);
		$('.seeme').remove();
		$('<span class="seeme"></span>').appendTo($("content")).css({
			'left':pixelPos.left,
			'top':pixelPos.top
		});
	}
	// Vauxhall
	if(l==11){
		$('.seeme').remove();
		$('<span class="seeme"></span>').appendTo($("content")).css({
			'left':pixelPos.left,
			'top':pixelPos.top
		}).addClass('vauxhall');
		$('body').addClass('vauxhall');
	}
	if(l==levelNames.length){
		$('body').animate({'background-color':'#000000'},500,function(){
			$('body, .seeme').removeClass('vauxhall');
		});
			$('#win').addClass('win');
	}
}

// The main functionality. When mouse is moved, show tooltip and count distance and act if found.	
$(window).mousemove(function(e){
	// Tooltop calculations according to where on each quarter of screen
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
	// Position tooltip
	$('#distance').css({'top':distanceposY,'left':distanceposX});
// Level-dependent variables on mousemove
	// Levels where the distance is shown
	if(l==5 || l==6 || l==8){
			$('#distance').text(' xΔ='+ (e.pageX-pixelPos.left) + ' yΔ='+ (e.pageY-pixelPos.top) ) ;
	}
	// Hot or Not? 
	if(l==7){ 	// Monster-script, CBA optimising
		if(e.pageX-pixelPos.left < 800 && pixelPos.left-e.pageX < 800) { $('.xD').css('background-color','#5477F0'); }
		if(e.pageX-pixelPos.left < 500 && pixelPos.left-e.pageX < 500) { $('.xD').css('background-color','#002BBF'); }
		if(e.pageX-pixelPos.left < 400 && pixelPos.left-e.pageX < 400) { $('.xD').css('background-color','#2E1493'); }
		if(e.pageX-pixelPos.left < 300 && pixelPos.left-e.pageX < 300) { $('.xD').css('background-color','#402174'); }
		if(e.pageX-pixelPos.left < 200 && pixelPos.left-e.pageX < 200) { $('.xD').css('background-color','#480542'); }
		if(e.pageX-pixelPos.left < 100 && pixelPos.left-e.pageX < 100) { $('.xD').css('background-color','#470023'); }
		if(e.pageX-pixelPos.left < 50 && pixelPos.left-e.pageX < 50) { $('.xD').css('background-color','#510112'); }
		if(e.pageX-pixelPos.left < 25 && pixelPos.left-e.pageX < 25) { $('.xD').css('background-color','#7A001A'); }
		if(e.pageX-pixelPos.left < 12 && pixelPos.left-e.pageX < 12) { $('.xD').css('background-color','#AE0025'); }
		if(e.pageX-pixelPos.left < 6 && pixelPos.left-e.pageX < 6 ) { $('.xD').css('background-color','#CF0000'); }
		if(e.pageX-pixelPos.left < 3 && pixelPos.left-e.pageX < 3 ) { $('.xD').css('background-color','#FF2B08'); }
		if(e.pageX-pixelPos.left < 1 && pixelPos.left-e.pageX < 1 ) { $('.xD').css('background-color','#FF9308'); }
		if(e.pageY-pixelPos.top < 800 && pixelPos.top-e.pageY < 800) { $('.yD').css('background-color','#5477F0'); }
		if(e.pageY-pixelPos.top < 500 && pixelPos.top-e.pageY < 500) { $('.yD').css('background-color','#002BBF'); }
		if(e.pageY-pixelPos.top < 400 && pixelPos.top-e.pageY < 400) { $('.yD').css('background-color','#2E1493'); }
		if(e.pageY-pixelPos.top < 300 && pixelPos.top-e.pageY < 300) { $('.yD').css('background-color','#402174'); }
		if(e.pageY-pixelPos.top < 200 && pixelPos.top-e.pageY < 200) { $('.yD').css('background-color','#480542'); }
		if(e.pageY-pixelPos.top < 100 && pixelPos.top-e.pageY < 100) { $('.yD').css('background-color','#470023'); }
		if(e.pageY-pixelPos.top < 50 && pixelPos.top-e.pageY < 50) { $('.yD').css('background-color','#510112'); }
		if(e.pageY-pixelPos.top < 25 && pixelPos.top-e.pageY < 25) { $('.yD').css('background-color','#7A001A'); }
		if(e.pageY-pixelPos.top < 12 && pixelPos.top-e.pageY < 12 ) { $('.yD').css('background-color','#AE0025'); }
		if(e.pageY-pixelPos.top < 6 && pixelPos.top-e.pageY < 6 ) { $('.yD').css('background-color','#CF0000'); }
		if(e.pageY-pixelPos.top < 3 && pixelPos.top-e.pageY < 3 ) { $('.yD').css('background-color','#FF2B08'); }
		if(e.pageY-pixelPos.top < 1 && pixelPos.top-e.pageY < 1 ) { $('.yD').css('background-color','#FF9308'); }
	}
	// Minesweeping I
	if(l==8){
		if(e.pageY-pixelPos.top < 12 && pixelPos.top-e.pageY < 12 && e.pageX-pixelPos.left < 12 && pixelPos.left-e.pageX < 12 ){
			$('.seeme').css('opacity',0);
			}
			else {
			$('.seeme').css('opacity',1);
			}
	}
	// Minesweeping II
	if(l==9){
		if(e.pageY-pixelPos.top < 50 && pixelPos.top-e.pageY < 50 && e.pageX-pixelPos.left < 50 && pixelPos.left-e.pageX < 50 ){
			$('.seeme').css('opacity',0);
			}
			else {
			$('.seeme').css('opacity',1);
			}
	}
	// Minesweeping III
	if(l==10){
		if(e.pageY-pixelPos.top < 250 && pixelPos.top-e.pageY < 250 && e.pageX-pixelPos.left < 250 && pixelPos.left-e.pageX < 250 ){
			$('.seeme').css('opacity',0);
			}
			else {
			$('.seeme').css('opacity',1);
			}
	}
	// If distance is zero aka the pixel is found, act accordingly, aka WIN the level.
	if(e.pageX-pixelPos.left == 0 && e.pageY-pixelPos.top == 0){
		if(l!=levelNames.length-1){
			alert('Found it!\n\nThe next level is called \n\n"'+levelNames[l]+'"');
			}
		foundCount++;
		initPixel(); 
		levelChange();
	}
});
	function devWin(){
		console.log('Found it!');
		foundCount++;
		initPixel();
		levelChange();
	}