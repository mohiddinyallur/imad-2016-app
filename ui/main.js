

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