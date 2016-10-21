/************************************************************************
  @ManBearPigCode
  October 13, 2016

 Hover Shake causes HTML elements to shake on hover.

  Dependencies: jQuery
  Important note: elements must display block or inline-block.

  First parameter is a string that represents an HTML element.
  For example: "#title-header" or ".thoseItems"
  Second parameter is an integer that represents the time in miliseconds
  it will take for the element to oscillate to one side. Start with 100
  for an average speed.
  Third parameter is an integer representing the number of degrees
  the element will oscillate. Start with 1 for average shake.

  An example of a call to hoverShake: hoverShake('myImg', 100, 1);
 ************************************************************************/

function hoverShake(myElement, speed, deg) {
// On mouse enter rotate element on timed interval. For symmetric oscillation,
// speed of outer interval is 2x speed of inner timeout.
 $(myElement).mouseenter(function() {
   myInterval = setInterval(function() {
     $(myElement).css('transform', 'rotate('+deg+'deg)');
     myTimeout = setTimeout(function() {
       $(myElement).css('transform', 'rotate('+(360-deg)+'deg)');
     }, speed);
   }, speed * 2);
 });
 // On mouse exit terminate intervals.
 $(myElement).mouseleave(function() {
   clearInterval(myInterval);
   clearTimeout(myTimeout);
   $(myElement).css('transform', 'rotate(0deg)');
 });
}


hoverShake('#green-leaf', 100, 5);
hoverShake('#nav-title', 100, 1);
hoverShake('#nav-board', 100, 1);
hoverShake('#nav-code', 100, 1);
hoverShake('#nav-draw', 100, 1);
hoverShake('#nav-write', 100, 1);
hoverShake('#intro-img', 200, 1);