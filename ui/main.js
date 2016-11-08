

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
// SmoothScroll for websites v1.2.1
// Licensed under the terms of the MIT license.

// People involved
//  - Balazs Galambosi (maintainer)  
//  - Michael Herf     (Pulse Algorithm)

(function(){function B(){if(document.body){var a=document.body,b=document.documentElement,c=window.innerHeight,e=a.scrollHeight;n=0<=document.compatMode.indexOf("CSS")?b:a;t=a;f.keyboardSupport&&window.addEventListener("keydown",J,!1);C=!0;top!=self?D=!0:e>c&&(a.offsetHeight<=c||b.offsetHeight<=c)&&(b.style.height="auto",n.offsetHeight<=c&&(c=document.createElement("div"),c.style.clear="both",a.appendChild(c)));f.fixedBackground||(a.style.backgroundAttachment="scroll",b.style.backgroundAttachment=
"scroll")}}function E(a,b,c,e){e||(e=1E3);K(b,c);if(1!=f.accelerationMax){var d=+new Date-w;d<f.accelerationDelta&&(d=(1+30/d)/2,1<d&&(d=Math.min(d,f.accelerationMax),b*=d,c*=d));w=+new Date}p.push({x:b,y:c,lastX:0>b?.99:-.99,lastY:0>c?.99:-.99,start:+new Date});if(!x){var g=a===document.body,h=function(d){d=+new Date;for(var q=0,r=0,s=0;s<p.length;s++){var k=p[s],l=d-k.start,n=l>=f.animationTime,m=n?1:l/f.animationTime;f.pulseAlgorithm&&(l=m,1<=l?m=1:0>=l?m=0:(1==f.pulseNormalize&&(f.pulseNormalize/=
F(1)),m=F(l)));l=k.x*m-k.lastX>>0;m=k.y*m-k.lastY>>0;q+=l;r+=m;k.lastX+=l;k.lastY+=m;n&&(p.splice(s,1),s--)}g?window.scrollBy(q,r):(q&&(a.scrollLeft+=q),r&&(a.scrollTop+=r));b||c||(p=[]);p.length?G(h,a,e/f.frameRate+1):x=!1};G(h,a,0);x=!0}}function L(a){C||B();var b=a.target,c=H(b);if(!c||a.defaultPrevented||"embed"===(t.nodeName||"").toLowerCase()||"embed"===(b.nodeName||"").toLowerCase()&&/\.pdf/i.test(b.src))return!0;var b=a.wheelDeltaX||0,e=a.wheelDeltaY||0;b||e||(e=a.wheelDelta||0);var d;if(d=
!f.touchpadSupport)if(d=e){d=Math.abs(d);h.push(d);h.shift();clearTimeout(M);d=h[0]==h[1]&&h[1]==h[2];var g=y(h[0],120)&&y(h[1],120)&&y(h[2],120);d=!(d||g)}else d=void 0;if(d)return!0;1.2<Math.abs(b)&&(b*=f.stepSize/120);1.2<Math.abs(e)&&(e*=f.stepSize/120);E(c,-b,-e);a.preventDefault()}function J(a){var b=a.target,c=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey&&a.keyCode!==g.spacebar;if(/input|textarea|select|embed/i.test(b.nodeName)||b.isContentEditable||a.defaultPrevented||c||"button"===(b.nodeName||
"").toLowerCase()&&a.keyCode===g.spacebar)return!0;var e;e=b=0;var c=H(t),d=c.clientHeight;c==document.body&&(d=window.innerHeight);switch(a.keyCode){case g.up:e=-f.arrowScroll;break;case g.down:e=f.arrowScroll;break;case g.spacebar:e=a.shiftKey?1:-1;e=-e*d*.9;break;case g.pageup:e=.9*-d;break;case g.pagedown:e=.9*d;break;case g.home:e=-c.scrollTop;break;case g.end:d=c.scrollHeight-c.scrollTop-d;e=0<d?d+10:0;break;case g.left:b=-f.arrowScroll;break;case g.right:b=f.arrowScroll;break;default:return!0}E(c,
b,e);a.preventDefault()}function N(a){t=a.target}function z(a,b){for(var c=a.length;c--;)A[I(a[c])]=b;return b}function H(a){var b=[],c=n.scrollHeight;do{var e=A[I(a)];if(e)return z(b,e);b.push(a);if(c===a.scrollHeight){if(!D||n.clientHeight+10<c)return z(b,document.body)}else if(a.clientHeight+10<a.scrollHeight&&(overflow=getComputedStyle(a,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return z(b,a)}while(a=a.parentNode)}function K(a,b){a=0<a?1:-1;b=0<b?1:-1;if(u.x!==
a||u.y!==b)u.x=a,u.y=b,p=[],w=0}function y(a,b){return Math.floor(a/b)==a/b}function F(a){var b;a*=f.pulseScale;1>a?b=a-(1-Math.exp(-a)):(b=Math.exp(-1),a=1-Math.exp(-(a-1)),b+=a*(1-b));return b*f.pulseNormalize}var v={frameRate:150,animationTime:500,stepSize:150,pulseAlgorithm:!0,pulseScale:6,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!0,fixedBackground:!0,excluded:""},f=v,D=!1,u={x:0,y:0},C=!1,n=document.documentElement,t,h=[120,120,
120],g={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},f=v,p=[],x=!1,w=+new Date,A={};setInterval(function(){A={}},1E4);var I=function(){var a=0;return function(b){return b.uniqueID||(b.uniqueID=a++)}}(),M,G=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a,b,c){window.setTimeout(a,c||1E3/60)}}(),v=/chrome/i.test(window.navigator.userAgent);"onmousewheel"in document&&v&&(window.addEventListener("mousedown",N,!1),window.addEventListener("mousewheel",
L,!1),window.addEventListener("load",B,!1))})();