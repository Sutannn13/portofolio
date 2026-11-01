(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79921,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(89970);
let i,o,a="function"==typeof Symbol?Symbol():"_split",s,l="u">typeof Intl&&"Segmenter"in Intl?new Intl.Segmenter:0,c=e=>e?"string"==typeof e?c(document.querySelectorAll(e)):"length"in e?Array.from(e).reduce((e,t)=>("string"==typeof t?e.push(...c(t)):e.push(t),e),[]):[e]:[],u=e=>c(e).filter(e=>e&&1===e.nodeType),f=[],d=function(){

}
,p={
add:e=>e()
}
,h=/\s+/g,g=RegExp("\\p{
RI
}
\\p{
RI
}
|\\p{
Emoji
}
(\\p{
EMod
}
|\\u{
FE0F
}
\\u{
20E3
}
?|[\\u{
E0020
}
-\\u{
E007E
}
]+\\u{
E007F
}
)?(\\u{
200D
}
\\p{
Emoji
}
(\\p{
EMod
}
|\\u{
FE0F
}
\\u{
20E3
}
?|[\\u{
E0020
}
-\\u{
E007E
}
]+\\u{
E007F
}
)?)*|.","gu"),v={
left:0,top:0,width:0,height:0
}
,m=(e,t)=>{
for(;
++t<e.length&&e[t]===v;);
return e[t]||v
}
,y=({
element:e,html:t,ariaL:r,ariaH:n
}
)=>{
e.innerHTML=t,r?e.setAttribute("aria-label",r):e.removeAttribute("aria-label"),n?e.setAttribute("aria-hidden",n):e.removeAttribute("aria-hidden")
}
,x=(e,t)=>{
if(t){
let r=new Set(e.join("").match(t)||f),n=e.length,i,o,a,s;if(r.size){
for(;--n>-1;)for(a of(o=e[n],r))if(a.startsWith(o)&&a.length>o.length){
for(i=0,s=o;
a.startsWith(s+=e[n+ ++i])&&s.length<a.length;);
if(i&&s.length===a.length){
e[n]=a,e.splice(n+1,i);
break
}

}

}

}
return e
}
,b=e=>"inline"===window.getComputedStyle(e).display&&(e.style.display="inline-block"),w=(e,t,r)=>t.insertBefore("string"==typeof e?document.createTextNode(e):e,r),_=(e,t,r)=>{
let n=t[e+"sClass"]||"",{
tag:i="div",aria:o="auto",propIndex:a=!1
}
=t,s="line"===e?"block":"inline-block",l=n.indexOf("++")>-1,c=t=>{
let c=document.createElement(i),u=r.length+1;
return n&&(c.className=n+(l?" "+n+u:"")),a&&c.style.setProperty("--"+e,u+""),"none"!==o&&c.setAttribute("aria-hidden","true"),"span"!==i&&(c.style.position="relative",c.style.display=s),c.textContent=t,r.push(c),c
}
;
return l&&(n=n.replace("++","")),c.collection=r,c
}
,C=(e,t,r,n,i,o,a,s,c,u)=>{
var d;
let p=Array.from(e.childNodes),g=0,{
wordDelimiter:v,reduceWhiteSpace:m=!0,prepareText:y
}
=t,_=e.getBoundingClientRect(),E=_,T=!m&&"pre"===window.getComputedStyle(e).whiteSpace.substring(0,3),S=0,k=r.collection,P,M,A,O,R,N,D,B,I,Y,z,F,L,W,X,H,U,q;
for("object"==typeof v?(A=v.delimiter||v,M=v.replaceWith||""):M=""===v?"":v||" ",P=" "!==M;g<p.length;g++)if(3===(O=p[g]).nodeType){
for(X=O.textContent||"",m?X=X.replace(h," "):T&&(X=X.replace(/\n/g,M+"\n")),y&&(X=y(X,e)),O.textContent=X,U=(R=M||A?X.split(A||M):X.match(s)||f)[R.length-1],B=P?" "===U.slice(-1):!U,U||R.pop(),E=_,(D=P?" "===R[0].charAt(0):!R[0])&&w(" ",e,O),R[0]||R.shift(),x(R,c),o&&u||(O.textContent=""),I=1;I<=R.length;I++)if(H=R[I-1],!m&&T&&"\n"===H.charAt(0)&&(null==(d=O.previousSibling)||d.remove(),w(document.createElement("br"),e,O),H=H.slice(1)),m||""!==H)if(" "===H)e.insertBefore(document.createTextNode(" "),O);
else{
if(P&&" "===H.charAt(0)&&w(" ",e,O),S&&1===I&&!D&&k.indexOf(S.parentNode)>-1?(N=k[k.length-1]).appendChild(document.createTextNode(n?"":H)):(w(N=r(n?"":H),e,O),S&&1===I&&!D&&N.insertBefore(S,N.firstChild)),n)for(z=l?x([...l.segment(H)].map(e=>e.segment),c):H.match(s)||f,q=0;q<z.length;q++)N.appendChild(" "===z[q]?document.createTextNode(" "):n(z[q]));if(o&&u){
if(X=O.textContent=X.substring(H.length+1,X.length),(Y=N.getBoundingClientRect()).top>E.top&&Y.left<=E.left){
for(F=e.cloneNode(),L=e.childNodes[0];L&&L!==N;)W=L,L=L.nextSibling,F.appendChild(W);
e.parentNode.insertBefore(F,e),i&&b(F)
}
E=Y
}
(I<R.length||B)&&w(I>=R.length?" ":P&&" "===H.slice(-1)?" "+M:M,e,O)
}
else w(M,e,O);e.removeChild(O),S=0
}
else 1===O.nodeType&&(a&&a.indexOf(O)>-1?(k.indexOf(O.previousSibling)>-1&&k[k.length-1].appendChild(O),S=O):(C(O,t,r,n,i,o,a,s,c,!0),S=0),i&&b(O))
}
,E=class e{
constructor(e,t){
this.isSplit=!1,s||T.register(window.gsap),this.elements=u(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(e=>{
var r;
!1!==t.overwrite&&(null==(r=e[a])||r._data.orig.filter(({
element:t
}
)=>t===e).forEach(y)),e[a]=this
}
),this._split=()=>this.isSplit&&this.split(this.vars);let r=[],n,i=()=>{
let e=r.length,t;for(;e--;){
let n=(t=r[e]).element.offsetWidth;if(n!==t.width){
t.width=n,this._split();
return
}

}

}
;
this._data={
orig:r,obs:"u">typeof ResizeObserver&&new ResizeObserver(()=>{
clearTimeout(n),n=setTimeout(i,200)
}
)
}
,d(this),this.split(t)
}
split(e){
return(this._ctx||p).add(()=>{
this.isSplit&&this.revert(),this.vars=e=e||this.vars||{

}
;
let{
type:t="chars,words,lines",aria:r="auto",deepSlice:n=!0,smartWrap:i,onSplit:a,autoSplit:s=!1,specialChars:l,mask:f
}
=this.vars,d=t.indexOf("lines")>-1,p=t.indexOf("chars")>-1,h=t.indexOf("words")>-1,y=p&&!h&&!d,x=l&&("push"in l?RegExp("(?:"+l.join("|")+")","gu"):l),b=x?RegExp(x.source+"|"+g.source,"gu"):g,w=!!e.ignore&&u(e.ignore),{
orig:E,animTime:T,obs:S
}
=this._data,k;(p||h||d)&&(this.elements.forEach((t,o)=>{
E[o]={
element:t,html:t.innerHTML,ariaL:t.getAttribute("aria-label"),ariaH:t.getAttribute("aria-hidden")
}
,"auto"===r?t.setAttribute("aria-label",(t.textContent||"").trim()):"hidden"===r&&t.setAttribute("aria-hidden","true");
let a=[],s=[],l=[],u=p?_("char",e,a):null,f=_("word",e,s),g,T,S,k;
if(C(t,e,f,u,y,n&&(d||y),w,b,x,!1),d){
let r,n,i=c(t.childNodes),o=(r=_("line",e,l),n=window.getComputedStyle(t).textAlign||"left",(e,o)=>{
let a=r("");
for(a.style.textAlign=n,t.insertBefore(a,i[e]);e<o;e++)a.appendChild(i[e]);a.normalize()
}
),a,s=[],u=0,f=i.map(e=>1===e.nodeType?e.getBoundingClientRect():v),d=v,p;
for(g=0;g<i.length;g++)1===(a=i[g]).nodeType&&("BR"===a.nodeName?(g&&"BR"===i[g-1].nodeName||(s.push(a),o(u,g+1)),u=g+1,d=m(f,g)):(p=f[g],g&&p.top>d.top&&p.left<d.left+d.width-1&&(o(u,g),u=g),d=p));u<g&&o(u,g),s.forEach(e=>{
var t;
return null==(t=e.parentNode)?void 0:t.removeChild(e)
}
)
}
if(!h){
for(g=0;g<s.length;g++)if(T=s[g],p||!T.nextSibling||3!==T.nextSibling.nodeType)if(i&&!d){
for((S=document.createElement("span")).style.whiteSpace="nowrap";T.firstChild;)S.appendChild(T.firstChild);T.replaceWith(S)
}
else T.replaceWith(...T.childNodes);else(k=T.nextSibling)&&3===k.nodeType&&(k.textContent=(T.textContent||"")+(k.textContent||""),T.remove());
s.length=0,t.normalize()
}
this.lines.push(...l),this.words.push(...s),this.chars.push(...a)
}
),f&&this[f]&&this.masks.push(...this[f].map(e=>{
let t=e.cloneNode();
return e.replaceWith(t),t.appendChild(e),e.className&&(t.className=e.className.trim().split(" ").map(e=>e+"-mask").join(" ")),t.style.overflow="clip",t
}
))),this.isSplit=!0,o&&d&&s&&o.addEventListener("loadingdone",this._split),(k=a&&a(this))&&k.totalTime&&(this._data.anim=T?k.totalTime(T):k),d&&s&&this.elements.forEach((e,t)=>{
E[t].width=e.offsetWidth,S&&S.observe(e)
}
)
}
),this
}
kill(){
let{
obs:e
}
=this._data;e&&e.disconnect(),null==o||o.removeEventListener("loadingdone",this._split)
}
revert(){
var e,t;if(this.isSplit){
let{
orig:r,anim:n
}
=this._data;this.kill(),r.forEach(y),this.chars.length=this.words.length=this.lines.length=r.length=this.masks.length=0,this.isSplit=!1,n&&(this._data.animTime=n.totalTime(),n.revert()),null==(t=(e=this.vars).onRevert)||t.call(e,this)
}
return this
}
static create(t,r){
return new e(t,r)
}
static register(e){
(i=i||e||window.gsap)&&(c=i.utils.toArray,d=i.core.context||d),!s&&window.innerWidth>0&&(o=document.fonts,s=!0)
}

}
;
E.version="3.15.0";
let T=E;
var S,k,P,M,A,O,R,N,D,B,I,Y,z,F=function(){
return S||"u">typeof window&&(S=window.gsap)&&S.registerPlugin&&S
}
,L=1,W=[],X=[],H=[],U=Date.now,q=function(e,t){
return t
}
,j=function(){
var e=D.core,t=e.bridge||{

}
,r=e._scrollers,n=e._proxies;r.push.apply(r,X),n.push.apply(n,H),X=r,H=n,q=function(e,r){
return t[e](r)
}

}
,V=function(e,t){
return~H.indexOf(e)&&H[H.indexOf(e)+1][t]
}
,G=function(e){
return!!~B.indexOf(e)
}
,$=function(e,t,r,n,i){
return e.addEventListener(t,r,{
passive:!1!==n,capture:!!i
}
)
}
,K=function(e,t,r,n){
return e.removeEventListener(t,r,!!n)
}
,Z="scrollLeft",J="scrollTop",Q=function(){
return I&&I.isPressed||X.cache++
}
,ee=function(e,t){
var r=function r(n){
if(n||0===n){
L&&(P.history.scrollRestoration="manual");
var i=I&&I.isPressed;e(n=r.v=Math.round(n)||(I&&I.iOS?1:0)),r.cacheID=X.cache,i&&q("ss",n)
}
else(t||X.cache!==r.cacheID||q("ref"))&&(r.cacheID=X.cache,r.v=e());
return r.v+r.offset
}
;
return r.offset=0,e&&r
}
,et={
s:Z,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ee(function(e){
return arguments.length?P.scrollTo(e,er.sc()):P.pageXOffset||M[Z]||A[Z]||O[Z]||0
}
)
}
,er={
s:J,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:et,sc:ee(function(e){
return arguments.length?P.scrollTo(et.sc(),e):P.pageYOffset||M[J]||A[J]||O[J]||0
}
)
}
,en=function(e,t){
return(t&&t._ctx&&t._ctx.selector||S.utils.toArray)(e)[0]||("string"==typeof e&&!1!==S.config().nullTargetWarn?console.warn("Element not found:",e):null)
}
,ei=function(e,t){
for(var r=t.length;r--;)if(t[r]===e||t[r].contains(e))return!0;
return!1
}
,eo=function(e,t){
var r=t.s,n=t.sc;G(e)&&(e=M.scrollingElement||A);var i=X.indexOf(e),o=n===er.sc?1:2;~i||(i=X.push(e)-1),X[i+o]||$(e,"scroll",Q);
var a=X[i+o],s=a||(X[i+o]=ee(V(e,r),!0)||(G(e)?n:ee(function(t){
return arguments.length?e[r]=t:e[r]
}
)));
return s.target=e,a||(s.smooth="smooth"===S.getProperty(e,"scrollBehavior")),s
}
,ea=function(e,t,r){
var n=e,i=e,o=U(),a=o,s=t||50,l=Math.max(500,3*s),c=function(e,t){
var l=U();
t||l-o>s?(i=n,n=e,a=o,o=l):r?n+=e:n=i+(e-i)/(l-a)*(o-a)
}
;
return{
update:c,reset:function(){
i=n=r?0:n,a=o=0
}
,getVelocity:function(e){
var t=a,s=i,u=U();return(e||0===e)&&e!==n&&c(e),o===a||u-a>l?0:(n+(r?s:-s))/((r?u:o)-t)*1e3
}

}

}
,es=function(e,t){
return t&&!e._gsapAllow&&!1!==e.cancelable&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e
}
,el=function(e){
var t=Math.max.apply(Math,e),r=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(r)?t:r
}
,ec=function(){
(D=S.core.globals().ScrollTrigger)&&D.core&&j()
}
,eu=function(e){
return S=e||F(),!k&&S&&"u">typeof document&&document.body&&(P=window,A=(M=document).documentElement,O=M.body,B=[P,M,A,O],S.utils.clamp,z=S.core.context||function(){

}
,N="onpointerenter"in O?"pointer":"mouse",R=ef.isTouch=P.matchMedia&&P.matchMedia("(hover: none), (pointer: coarse)").matches?1:2*("ontouchstart"in P||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),Y=ef.eventTypes=("ontouchstart"in A?"touchstart,touchmove,touchcancel,touchend":!("onpointerdown"in A)?"mousedown,mousemove,mouseup,mouseup":"pointerdown,pointermove,pointercancel,pointerup").split(","),setTimeout(function(){
return L=0
}
,500),k=1),D||ec(),k
}
;
et.op=er,X.cache=0;var ef=function(){
var e;function t(e){
this.init(e)
}
return t.prototype.init=function(e){
k||eu(S)||console.warn("Please gsap.registerPlugin(Observer)"),D||ec();
var t=e.tolerance,r=e.dragMinimum,n=e.type,i=e.target,o=e.lineHeight,a=e.debounce,s=e.preventDefault,l=e.onStop,c=e.onStopDelay,u=e.ignore,f=e.wheelSpeed,d=e.event,p=e.onDragStart,h=e.onDragEnd,g=e.onDrag,v=e.onPress,m=e.onRelease,y=e.onRight,x=e.onLeft,b=e.onUp,w=e.onDown,_=e.onChangeX,C=e.onChangeY,E=e.onChange,T=e.onToggleX,B=e.onToggleY,F=e.onHover,L=e.onHoverEnd,X=e.onMove,H=e.ignoreCheck,q=e.isNormalizer,j=e.onGestureStart,V=e.onGestureEnd,Z=e.onWheel,J=e.onEnable,ee=e.onDisable,ef=e.onClick,ed=e.scrollSpeed,ep=e.capture,eh=e.allowClicks,eg=e.lockAxis,ev=e.onLockAxis;this.target=i=en(i)||A,this.vars=e,u&&(u=S.utils.toArray(u)),t=t||1e-9,r=r||0,f=f||1,ed=ed||1,n=n||"wheel,touch,pointer",a=!1!==a,o||(o=parseFloat(P.getComputedStyle(O).lineHeight)||22);
var em,ey,ex,eb,ew,e_,eC,eE=this,eT=0,eS=0,ek=e.passive||!s&&!1!==e.passive,eP=eo(i,et),eM=eo(i,er),eA=eP(),eO=eM(),eR=~n.indexOf("touch")&&!~n.indexOf("pointer")&&"pointerdown"===Y[0],eN=G(i),eD=i.ownerDocument||M,eB=[0,0,0],eI=[0,0,0],eY=0,ez=function(){
return eY=U()
}
,eF=function(e,t){
return(eE.event=e)&&u&&ei(e.target,u)||t&&eR&&"touch"!==e.pointerType||H&&H(e,t)
}
,eL=function(){
var e=eE.deltaX=el(eB),r=eE.deltaY=el(eI),n=Math.abs(e)>=t,i=Math.abs(r)>=t;E&&(n||i)&&E(eE,e,r,eB,eI),n&&(y&&eE.deltaX>0&&y(eE),x&&eE.deltaX<0&&x(eE),_&&_(eE),T&&eE.deltaX<0!=eT<0&&T(eE),eT=eE.deltaX,eB[0]=eB[1]=eB[2]=0),i&&(w&&eE.deltaY>0&&w(eE),b&&eE.deltaY<0&&b(eE),C&&C(eE),B&&eE.deltaY<0!=eS<0&&B(eE),eS=eE.deltaY,eI[0]=eI[1]=eI[2]=0),(eb||ex)&&(X&&X(eE),ex&&(p&&1===ex&&p(eE),g&&g(eE),ex=0),eb=!1),e_&&(e_=!1,1)&&ev&&ev(eE),ew&&(Z(eE),ew=!1),em=0
}
,eW=function(e,t,r){
eB[r]+=e,eI[r]+=t,eE._vx.update(e),eE._vy.update(t),a?em||(em=requestAnimationFrame(eL)):eL()
}
,eX=function(e,t){
eg&&!eC&&(eE.axis=eC=Math.abs(e)>Math.abs(t)?"x":"y",e_=!0),"y"!==eC&&(eB[2]+=e,eE._vx.update(e,!0)),"x"!==eC&&(eI[2]+=t,eE._vy.update(t,!0)),a?em||(em=requestAnimationFrame(eL)):eL()
}
,eH=function(e){
if(!eF(e,1)){
var t=(e=es(e,s)).clientX,n=e.clientY,i=t-eE.x,o=n-eE.y,a=eE.isDragging;
eE.x=t,eE.y=n,(a||(i||o)&&(Math.abs(eE.startX-t)>=r||Math.abs(eE.startY-n)>=r))&&(ex||(ex=a?2:1),a||(eE.isDragging=!0),eX(i,o))
}

}
,eU=eE.onPress=function(e){
eF(e,1)||e&&e.button||(eE.axis=eC=null,ey.pause(),eE.isPressed=!0,e=es(e),eT=eS=0,eE.startX=eE.x=e.clientX,eE.startY=eE.y=e.clientY,eE._vx.reset(),eE._vy.reset(),$(q?i:eD,Y[1],eH,ek,!0),eE.deltaX=eE.deltaY=0,v&&v(eE))
}
,eq=eE.onRelease=function(e){
if(!eF(e,1)){
K(q?i:eD,Y[1],eH,!0);
var t=!isNaN(eE.y-eE.startY),r=eE.isDragging,n=r&&(Math.abs(eE.x-eE.startX)>3||Math.abs(eE.y-eE.startY)>3),o=es(e);
!n&&t&&(eE._vx.reset(),eE._vy.reset(),s&&eh&&S.delayedCall(.08,function(){
if(U()-eY>300&&!e.defaultPrevented){
if(e.target.click)e.target.click();
else if(eD.createEvent){
var t=eD.createEvent("MouseEvents");
t.initMouseEvent("click",!0,!0,P,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)
}

}

}
)),eE.isDragging=eE.isGesturing=eE.isPressed=!1,l&&r&&!q&&ey.restart(!0),ex&&eL(),h&&r&&h(eE),m&&m(eE,n)
}

}
,ej=function(e){
return e.touches&&e.touches.length>1&&(eE.isGesturing=!0)&&j(e,eE.isDragging)
}
,eV=function(){
return eE.isGesturing=!1,V(eE)
}
,eG=function(e){
if(!eF(e)){
var t=eP(),r=eM();eW((t-eA)*ed,(r-eO)*ed,1),eA=t,eO=r,l&&ey.restart(!0)
}

}
,e$=function(e){
if(!eF(e)){
e=es(e,s),Z&&(ew=!0);
var t=(1===e.deltaMode?o:2===e.deltaMode?P.innerHeight:1)*f;
eW(e.deltaX*t,e.deltaY*t,0),l&&!q&&ey.restart(!0)
}

}
,eK=function(e){
if(!eF(e)){
var t=e.clientX,r=e.clientY,n=t-eE.x,i=r-eE.y;
eE.x=t,eE.y=r,eb=!0,l&&ey.restart(!0),(n||i)&&eX(n,i)
}

}
,eZ=function(e){
eE.event=e,F(eE)
}
,eJ=function(e){
eE.event=e,L(eE)
}
,eQ=function(e){
return eF(e)||es(e,s)&&ef(eE)
}
;
ey=eE._dc=S.delayedCall(c||.25,function(){
eE._vx.reset(),eE._vy.reset(),ey.pause(),l&&l(eE)
}
).pause(),eE.deltaX=eE.deltaY=0,eE._vx=ea(0,50,!0),eE._vy=ea(0,50,!0),eE.scrollX=eP,eE.scrollY=eM,eE.isDragging=eE.isGesturing=eE.isPressed=!1,z(this),eE.enable=function(e){
return!eE.isEnabled&&($(eN?eD:i,"scroll",Q),n.indexOf("scroll")>=0&&$(eN?eD:i,"scroll",eG,ek,ep),n.indexOf("wheel")>=0&&$(i,"wheel",e$,ek,ep),(n.indexOf("touch")>=0&&R||n.indexOf("pointer")>=0)&&($(i,Y[0],eU,ek,ep),$(eD,Y[2],eq),$(eD,Y[3],eq),eh&&$(i,"click",ez,!0,!0),ef&&$(i,"click",eQ),j&&$(eD,"gesturestart",ej),V&&$(eD,"gestureend",eV),F&&$(i,N+"enter",eZ),L&&$(i,N+"leave",eJ),X&&$(i,N+"move",eK)),eE.isEnabled=!0,eE.isDragging=eE.isGesturing=eE.isPressed=eb=ex=!1,eE._vx.reset(),eE._vy.reset(),eA=eP(),eO=eM(),e&&e.type&&eU(e),J&&J(eE)),eE
}
,eE.disable=function(){
eE.isEnabled&&(W.filter(function(e){
return e!==eE&&G(e.target)
}
).length||K(eN?eD:i,"scroll",Q),eE.isPressed&&(eE._vx.reset(),eE._vy.reset(),K(q?i:eD,Y[1],eH,!0)),K(eN?eD:i,"scroll",eG,ep),K(i,"wheel",e$,ep),K(i,Y[0],eU,ep),K(eD,Y[2],eq),K(eD,Y[3],eq),K(i,"click",ez,!0),K(i,"click",eQ),K(eD,"gesturestart",ej),K(eD,"gestureend",eV),K(i,N+"enter",eZ),K(i,N+"leave",eJ),K(i,N+"move",eK),eE.isEnabled=eE.isPressed=eE.isDragging=!1,ee&&ee(eE))
}
,eE.kill=eE.revert=function(){
eE.disable();var e=W.indexOf(eE);e>=0&&W.splice(e,1),I===eE&&(I=0)
}
,W.push(eE),q&&G(i)&&(I=eE),eE.enable(d)
}
,e=[{
key:"velocityX",get:function(){
return this._vx.getVelocity()
}

}
,{
key:"velocityY",get:function(){
return this._vy.getVelocity()
}

}
],function(e,t){
for(var r=0;r<t.length;r++){
var n=t[r];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)
}

}
(t.prototype,e),t
}
();
ef.version="3.15.0",ef.create=function(e){
return new ef(e)
}
,ef.register=eu,ef.getAll=function(){
return W.slice()
}
,ef.getById=function(e){
return W.filter(function(t){
return t.vars.id===e
}
)[0]
}
,F()&&S.registerPlugin(ef);
var ed,ep,eh,eg,ev,em,ey,ex,eb,ew,e_,eC,eE,eT,eS,ek,eP,eM,eA,eO,eR,eN,eD,eB,eI,eY,ez,eF,eL,eW,eX,eH,eU,eq,ej,eV,eG,e$,eK=1,eZ=Date.now,eJ=eZ(),eQ=0,e0=0,e1=function(e,t,r){
var n=to(e)&&("clamp("===e.substr(0,6)||e.indexOf("max")>-1);
return r["_"+t+"Clamp"]=n,n?e.substr(6,e.length-7):e
}
,e2=function(e,t){
return t&&(!to(e)||"clamp("!==e.substr(0,6))?"clamp("+e+")":e
}
,e3=function(){
return eT=1
}
,e5=function(){
return eT=0
}
,e9=function(e){
return e
}
,e4=function(e){
return Math.round(1e5*e)/1e5||0
}
,e6=function(){
return"u">typeof window
}
,e7=function(){
return ed||e6()&&(ed=window.gsap)&&ed.registerPlugin&&ed
}
,e8=function(e){
return!!~ey.indexOf(e)
}
,te=function(e){
return("Height"===e?eX:eh["inner"+e])||ev["client"+e]||em["client"+e]
}
,tt=function(e){
return V(e,"getBoundingClientRect")||(e8(e)?function(){
return rl.width=eh.innerWidth,rl.height=eX,rl
}
:function(){
return tk(e)
}
)
}
,tr=function(e,t,r){
var n=r.d,i=r.d2,o=r.a;
return(o=V(e,"getBoundingClientRect"))?function(){
return o()[n]
}
:function(){
return(t?te(i):e["client"+i])||0
}

}
,tn=function(e,t){
var r=t.s,n=t.d2,i=t.d,o=t.a;
return Math.max(0,(o=V(e,r="scroll"+n))?o()-tt(e)()[i]:e8(e)?(ev[r]||em[r])-te(n):e[r]-e["offset"+n])
}
,ti=function(e,t){
for(var r=0;r<eA.length;r+=3)(!t||~t.indexOf(eA[r+1]))&&e(eA[r],eA[r+1],eA[r+2])
}
,to=function(e){
return"string"==typeof e
}
,ta=function(e){
return"function"==typeof e
}
,ts=function(e){
return"number"==typeof e
}
,tl=function(e){
return"object"==typeof e
}
,tc=function(e,t,r){
return e&&e.progress(+!t)&&r&&e.pause()
}
,tu=function(e,t,r){
if(e.enabled){
var n=e._ctx?e._ctx.add(function(){
return t(e,r)
}
):t(e,r);
n&&n.totalTime&&(e.callbackAnimation=n)
}

}
,tf=Math.abs,td="left",tp="right",th="bottom",tg="width",tv="height",tm="Right",ty="Left",tx="Bottom",tb="padding",tw="margin",t_="Width",tC="Height",tE=function(e){
return eh.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)
}
,tT=function(e){
var t=tE(e).position;
e.style.position="absolute"===t||"fixed"===t?t:"relative"
}
,tS=function(e,t){
for(var r in t)r in e||(e[r]=t[r]);
return e
}
,tk=function(e,t){
var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==tE(e)[eS]&&ed.to(e,{
x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0
}
).progress(1),n=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();
return r&&r.progress(0).kill(),n
}
,tP=function(e,t){
var r=t.d2;
return e["offset"+r]||e["client"+r]||0
}
,tM=function(e){
var t,r=[],n=e.labels,i=e.duration();for(t in n)r.push(n[t]/i);
return r
}
,tA=function(e){
var t=ed.utils.snap(e),r=Array.isArray(e)&&e.slice(0).sort(function(e,t){
return e-t
}
);
return r?function(e,n,i){
var o;
if(void 0===i&&(i=.001),!n)return t(e);if(n>0){
for(e-=i,o=0;o<r.length;o++)if(r[o]>=e)return r[o];
return r[o-1]
}
for(o=r.length,e+=i;o--;)if(r[o]<=e)return r[o];
return r[0]
}
:function(r,n,i){
void 0===i&&(i=.001);var o=t(r);
return!n||Math.abs(o-r)<i||o-r<0==n<0?o:t(n<0?r-e:r+e)
}

}
,tO=function(e,t,r,n){
return r.split(",").forEach(function(r){
return e(t,r,n)
}
)
}
,tR=function(e,t,r,n,i){
return e.addEventListener(t,r,{
passive:!n,capture:!!i
}
)
}
,tN=function(e,t,r,n){
return e.removeEventListener(t,r,!!n)
}
,tD=function(e,t,r){
(r=r&&r.wheelHandler)&&(e(t,"wheel",r),e(t,"touchmove",r))
}
,tB={
startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"
}
,tI={
toggleActions:"play",anticipatePin:0
}
,tY={
top:0,left:0,center:.5,bottom:1,right:1
}
,tz=function(e,t){
if(to(e)){
var r=e.indexOf("="),n=~r?(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;~r&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in tY?tY[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)
}
return e
}
,tF=function(e,t,r,n,i,o,a,s){
var l=i.startColor,c=i.endColor,u=i.fontSize,f=i.indent,d=i.fontWeight,p=eg.createElement("div"),h=e8(r)||"fixed"===V(r,"pinType"),g=-1!==e.indexOf("scroller"),v=h?em:"IFRAME"===r.tagName?r.contentDocument.body:r,m=-1!==e.indexOf("start"),y=m?l:c,x="border-color:"+y+";
font-size:"+u+";
color:"+y+";
font-weight:"+d+";
pointer-events:none;
white-space:nowrap;
font-family:sans-serif,Arial;
z-index:1000;
padding:4px 8px;
border-width:0;
border-style:solid;
";
return x+="position:"+((g||s)&&h?"fixed;":"absolute;"),(g||s||!h)&&(x+=(n===er?tp:th)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;
text-align:left;
width:"+a.offsetWidth+"px;"),p._isStart=m,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=x,p.innerText=t||0===t?e+"-"+t:e,v.children[0]?v.insertBefore(p,v.children[0]):v.appendChild(p),p._offset=p["offset"+n.op.d2],tL(p,0,n,m),p
}
,tL=function(e,t,r,n){
var i={
display:"block"
}
,o=r[n?"os2":"p2"],a=r[n?"p2":"os2"];
e._isFlipped=n,i[r.a+"Percent"]=n?-100:0,i[r.a]=n?"1px":0,i["border"+o+t_]=1,i["border"+a+t_]=0,i[r.p]=t+"px",ed.set(e,i)
}
,tW=[],tX={

}
,tH=function(){
return eZ()-eQ>34&&(ej||(ej=requestAnimationFrame(t8)))
}
,tU=function(){
eD&&eD.isPressed&&!(eD.startX>em.clientWidth)||(X.cache++,eD?ej||(ej=requestAnimationFrame(t8)):t8(),eQ||tK("scrollStart"),eQ=eZ())
}
,tq=function(){
eY=eh.innerWidth,eI=eh.innerHeight
}
,tj=function(e){
X.cache++,(!0===e||!eE&&!eN&&!eg.fullscreenElement&&!eg.webkitFullscreenElement&&(!eB||eY!==eh.innerWidth||Math.abs(eh.innerHeight-eI)>.25*eh.innerHeight))&&ex.restart(!0)
}
,tV={

}
,tG=[],t$=function e(){
return tN(rg,"scrollEnd",e)||t4(!0)
}
,tK=function(e){
return tV[e]&&tV[e].map(function(e){
return e()
}
)||tG
}
,tZ=[],tJ=function(e){
for(var t=0;t<tZ.length;t+=5)(!e||tZ[t+4]&&tZ[t+4].query===e)&&(tZ[t].style.cssText=tZ[t+1],tZ[t].getBBox&&tZ[t].setAttribute("transform",tZ[t+2]||""),tZ[t+3].uncache=1)
}
,tQ=function(){
return X.forEach(function(e){
return ta(e)&&++e.cacheID&&(e.rec=e())
}
)
}
,t0=function(e,t){
var r;
for(ek=0;ek<tW.length;ek++)(r=tW[ek])&&(!t||r._ctx===t)&&(e?r.kill(1):r.revert(!0,!0));eH=!0,t&&tJ(t),t||tK("revert")
}
,t1=function(e,t){
X.cache++,(t||!eV)&&X.forEach(function(e){
return ta(e)&&e.cacheID++&&(e.rec=0)
}
),to(e)&&(eh.history.scrollRestoration=eL=e)
}
,t2=0,t3=function(){
if(eG!==t2){
var e=eG=t2;
requestAnimationFrame(function(){
return e===t2&&t4(!0)
}
)
}

}
,t5=function(){
em.appendChild(eW),eX=!eD&&eW.offsetHeight||eh.innerHeight,em.removeChild(eW)
}
,t9=function(e){
return eb(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){
return t.style.display=e?"none":"block"
}
)
}
,t4=function(e,t){
if(ev=eg.documentElement,em=eg.body,ey=[eh,eg,ev,em],eQ&&!e&&!eH)return void tR(rg,"scrollEnd",t$);t5(),eV=rg.isRefreshing=!0,eH||tQ();
var r=tK("refreshInit");eO&&rg.sort(),t||t0(),X.forEach(function(e){
ta(e)&&(e.smooth&&(e.target.style.scrollBehavior="auto"),e(0))
}
),tW.slice(0).forEach(function(e){
return e.refresh()
}
),eH=!1,tW.forEach(function(e){
if(e._subPinOffset&&e.pin){
var t=e.vars.horizontal?"offsetWidth":"offsetHeight",r=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-r),e.refresh()
}

}
),eU=1,t9(!0),tW.forEach(function(e){
var t=tn(e.scroller,e._dir),r="max"===e.vars.end||e._endClamp&&e.end>t,n=e._startClamp&&e.start>=t;(r||n)&&e.setPositions(n?t-1:e.start,r?Math.max(n?t:e.start+1,t):e.end,!0)
}
),t9(!1),eU=0,r.forEach(function(e){
return e&&e.render&&e.render(-1)
}
),X.forEach(function(e){
ta(e)&&(e.smooth&&requestAnimationFrame(function(){
return e.target.style.scrollBehavior="smooth"
}
),e.rec&&e(e.rec))
}
),t1(eL,1),ex.pause(),t2++,eV=2,t8(2),tW.forEach(function(e){
return ta(e.vars.onRefresh)&&e.vars.onRefresh(e)
}
),eV=rg.isRefreshing=!1,tK("refresh")
}
,t6=0,t7=1,t8=function(e){
if(2===e||!eV&&!eH){
rg.isUpdating=!0,e$&&e$.update(0);
var t=tW.length,r=eZ(),n=r-eJ>=50,i=t&&tW[0].scroll();
if(t7=t6>i?-1:1,eV||(t6=i),n&&(eQ&&!eT&&r-eQ>200&&(eQ=0,tK("scrollEnd")),e_=eJ,eJ=r),t7<0){
for(ek=t;ek-- >0;)tW[ek]&&tW[ek].update(0,n);
t7=1
}
else for(ek=0;ek<t;ek++)tW[ek]&&tW[ek].update(0,n);
rg.isUpdating=!1
}
ej=0
}
,re=[td,"top",th,tp,tw+tx,tw+tm,tw+"Top",tw+ty,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],rt=re.concat([tg,tv,"boxSizing","max"+t_,"max"+tC,"position",tw,tb,tb+"Top",tb+tm,tb+tx,tb+ty]),rr=function(e,t,r){
ro(r);
var n=e._gsap;if(n.spacerIsNative)ro(n.spacerState);
else if(e._gsap.swappedIn){
var i=t.parentNode;
i&&(i.insertBefore(e,t),i.removeChild(t))
}
e._gsap.swappedIn=!1
}
,rn=function(e,t,r,n){
if(!e._gsap.swappedIn){
for(var i,o=re.length,a=t.style,s=e.style;o--;)a[i=re[o]]=r[i];
a.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(a.display="inline-block"),s[th]=s[tp]="auto",a.flexBasis=r.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[tg]=tP(e,et)+"px",a[tv]=tP(e,er)+"px",a[tb]=s[tw]=s.top=s[td]="0",ro(n),s[tg]=s["max"+t_]=r[tg],s[tv]=s["max"+tC]=r[tv],s[tb]=r[tb],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0
}

}
,ri=/([A-Z])/g,ro=function(e){
if(e){
var t,r,n=e.t.style,i=e.length,o=0;
for((e.t._gsap||ed.core.getCache(e.t)).uncache=1;o<i;o+=2)r=e[o+1],t=e[o],r?n[t]=r:n[t]&&n.removeProperty(t.replace(ri,"-$1").toLowerCase())
}

}
,ra=function(e){
for(var t=rt.length,r=e.style,n=[],i=0;i<t;i++)n.push(rt[i],r[rt[i]]);
return n.t=e,n
}
,rs=function(e,t,r){
for(var n,i=[],o=e.length,a=8*!!r;a<o;a+=2)n=e[a],i.push(n,n in t?t[n]:e[a+1]);
return i.t=e.t,i
}
,rl={
left:0,top:0
}
,rc=function(e,t,r,n,i,o,a,s,l,c,u,f,d,p){
ta(e)&&(e=e(s)),to(e)&&"max"===e.substr(0,3)&&(e=f+("="===e.charAt(4)?tz("0"+e.substr(3),r):0));
var h,g,v,m=d?d.time():0;if(d&&d.seek(0),isNaN(e)||(e*=1),ts(e))d&&(e=ed.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&tL(a,r,n,!0);else{
ta(t)&&(t=t(s));
var y,x,b,w,_=(e||"0").split(" ");(y=tk(v=en(t,s)||em)||{

}
).left||y.top||"none"!==tE(v).display||(w=v.style.display,v.style.display="block",y=tk(v),w?v.style.display=w:v.style.removeProperty("display")),x=tz(_[0],y[n.d]),b=tz(_[1]||"0",r),e=y[n.p]-l[n.p]-c+x+i-b,a&&tL(a,b,n,r-b<20||a._isStart&&b>20),r-=r-b
}
if(p&&(s[p]=e||-.001,e<0&&(e=0)),o){
var C=e+r,E=o._isStart;
h="scroll"+n.d2,tL(o,C,n,E&&C>20||!E&&(u?Math.max(em[h],ev[h]):o.parentNode[h])<=C+1),u&&(l=tk(a),u&&(o.style[n.op.p]=l[n.op.p]-n.op.m-o._offset+"px"))
}
return d&&v&&(h=tk(v),d.seek(f),g=tk(v),d._caScrollDist=h[n.p]-g[n.p],e=e/d._caScrollDist*f),d&&d.seek(m),d?e:Math.round(e)
}
,ru=/(webkit|moz|length|cssText|inset)/i,rf=function(e,t,r,n){
if(e.parentNode!==t){
var i,o,a=e.style;if(t===em){
for(i in e._stOrig=a.cssText,o=tE(e))+i||ru.test(i)||!o[i]||"string"!=typeof a[i]||"0"===i||(a[i]=o[i]);
a.top=r,a.left=n
}
else a.cssText=e._stOrig;ed.core.getCache(e).uncache=1,t.appendChild(e)
}

}
,rd=function(e,t,r){
var n=t,i=n;return function(t){
var o=Math.round(e());
return o!==n&&o!==i&&Math.abs(o-n)>3&&Math.abs(o-i)>3&&(t=o,r&&r()),i=n,n=Math.round(t)
}

}
,rp=function(e,t,r){
var n={

}
;
n[t.p]="+="+r,ed.set(e,n)
}
,rh=function(e,t){
var r=eo(e,t),n="_scroll"+t.p2,i=function t(i,o,a,s,l){
var c=t.tween,u=o.onComplete,f={

}
;a=a||r();
var d=rd(r,a,function(){
c.kill(),t.tween=0
}
);
return l=s&&l||0,s=s||i-a,c&&c.kill(),o[n]=i,o.inherit=!1,o.modifiers=f,f[n]=function(){
return d(a+s*c.ratio+l*c.ratio*c.ratio)
}
,o.onUpdate=function(){
X.cache++,t.tween&&t8()
}
,o.onComplete=function(){
t.tween=0,u&&u.call(c)
}
,c=t.tween=ed.to(e,o)
}
;
return e[n]=r,r.wheelHandler=function(){
return i.tween&&i.tween.kill()&&(i.tween=0)
}
,tR(e,"wheel",r.wheelHandler),rg.isTouch&&tR(e,"touchmove",r.wheelHandler),i
}
,rg=function(){
function e(t,r){
ep||e.register(ed)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),eF(this),this.init(t,r)
}
return e.prototype.init=function(t,r){
if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!e0){
this.update=this.refresh=this.kill=e9;
return
}
var n,i,o,a,s,l,c,u,f,d,p,h,g,v,m,y,x,b,w,_,C,E,T,S,k,P,M,A,O,R,N,D,B,I,Y,z,F,L,W,U,q,j=t=tS(to(t)||ts(t)||t.nodeType?{
trigger:t
}
:t,tI),G=j.onUpdate,$=j.toggleClass,K=j.id,Z=j.onToggle,J=j.onRefresh,Q=j.scrub,ee=j.trigger,ei=j.pin,ea=j.pinSpacing,es=j.invalidateOnRefresh,el=j.anticipatePin,ec=j.onScrubComplete,eu=j.onSnapComplete,ef=j.once,ep=j.snap,ey=j.pinReparent,ex=j.pinSpacer,eC=j.containerAnimation,eS=j.fastScrollEnd,eP=j.preventOverlaps,eM=t.horizontal||t.containerAnimation&&!1!==t.horizontal?et:er,eA=!Q&&0!==Q,eN=en(t.scroller||eh),eD=ed.core.getCache(eN),eB=e8(eN),eI=("pinType"in t?t.pinType:V(eN,"pinType")||eB&&"fixed")==="fixed",eY=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],ez=eA&&t.toggleActions.split(" "),eF="markers"in t?t.markers:tI.markers,eL=eB?0:parseFloat(tE(eN)["border"+eM.p2+t_])||0,eW=this,eX=t.onRefreshInit&&function(){
return t.onRefreshInit(eW)
}
,eH=tr(eN,eB,eM),ej=!eB||~H.indexOf(eN)?tt(eN):function(){
return rl
}
,eG=0,eJ=0,e3=0,e5=eo(eN,eM);
if(eW._startClamp=eW._endClamp=!1,eW._dir=eM,el*=45,eW.scroller=eN,eW.scroll=eC?eC.time.bind(eC):e5,l=e5(),eW.vars=t,r=r||t.animation,"refreshPriority"in t&&(eO=1,-9999===t.refreshPriority&&(e$=eW)),eD.tweenScroll=eD.tweenScroll||{
top:rh(eN,er),left:rh(eN,et)
}
,eW.tweenTo=o=eD.tweenScroll[eM.p],eW.scrubDuration=function(e){
(Y=ts(e)&&e)?I?I.duration(e):I=ed.to(r,{
ease:"expo",totalProgress:"+=0",inherit:!1,duration:Y,paused:!0,onComplete:function(){
return ec&&ec(eW)
}

}
):(I&&I.progress(1).kill(),I=0)
}
,r&&(r.vars.lazy=!1,r._initted&&!eW.isReverted||!1!==r.vars.immediateRender&&!1!==t.immediateRender&&r.duration()&&r.render(0,!0,!0),eW.animation=r.pause(),r.scrollTrigger=eW,eW.scrubDuration(Q),D=0,K||(K=r.vars.id)),ep&&((!tl(ep)||ep.push)&&(ep={
snapTo:ep
}
),"scrollBehavior"in em.style&&ed.set(eB?[em,ev]:eN,{
scrollBehavior:"auto"
}
),X.forEach(function(e){
return ta(e)&&e.target===(eB?eg.scrollingElement||ev:eN)&&(e.smooth=!1)
}
),s=ta(ep.snapTo)?ep.snapTo:"labels"===ep.snapTo?(n=r,function(e){
return ed.utils.snap(tM(n),e)
}
):"labelsDirectional"===ep.snapTo?(i=r,function(e,t){
return tA(tM(i))(e,t.direction)
}
):!1!==ep.directional?function(e,t){
return tA(ep.snapTo)(e,eZ()-eJ<500?0:t.direction)
}
:ed.utils.snap(ep.snapTo),z=tl(z=ep.duration||{
min:.1,max:2
}
)?ew(z.min,z.max):ew(z,z),F=ed.delayedCall(ep.delay||Y/2||.1,function(){
var e=e5(),t=eZ()-eJ<500,n=o.tween;
if((t||10>Math.abs(eW.getVelocity()))&&!n&&!eT&&eG!==e){
var i,a,l=(e-u)/y,c=r&&!eA?r.totalProgress():l,d=t?0:(c-B)/(eZ()-e_)*1e3||0,p=ed.utils.clamp(-l,1-l,tf(d/2)*d/.185),h=l+(!1===ep.inertia?0:p),g=ep,v=g.onStart,m=g.onInterrupt,x=g.onComplete;if(ts(i=s(h,eW))||(i=h),a=Math.max(0,Math.round(u+i*y)),e<=f&&e>=u&&a!==e){
if(n&&!n._initted&&n.data<=tf(a-e))return;
!1===ep.inertia&&(p=i-l),o(a,{
duration:z(tf(.185*Math.max(tf(h-c),tf(i-c))/d/.05||0)),ease:ep.ease||"power3",data:tf(a-e),onInterrupt:function(){
return F.restart(!0)&&m&&tu(eW,m)
}
,onComplete:function(){
eW.update(),eG=e5(),r&&!eA&&(I?I.resetTo("totalProgress",i,r._tTime/r._tDur):r.progress(i)),D=B=r&&!eA?r.totalProgress():eW.progress,eu&&eu(eW),x&&tu(eW,x)
}

}
,e,p*y,a-e-p*y),v&&tu(eW,v,o.tween)
}

}
else eW.isActive&&eG!==e&&F.restart(!0)
}
).pause()),K&&(tX[K]=eW),(q=(ee=eW.trigger=en(ee||!0!==ei&&ei))&&ee._gsap&&ee._gsap.stRevert)&&(q=q(eW)),ei=!0===ei?ee:en(ei),to($)&&($={
targets:ee,className:$
}
),ei&&(!1===ea||ea===tw||(ea=(!!ea||!ei.parentNode||!ei.parentNode.style||"flex"!==tE(ei.parentNode).display)&&tb),eW.pin=ei,(a=ed.core.getCache(ei)).spacer?x=a.pinState:(ex&&((ex=en(ex))&&!ex.nodeType&&(ex=ex.current||ex.nativeElement),a.spacerIsNative=!!ex,ex&&(a.spacerState=ra(ex))),a.spacer=_=ex||eg.createElement("div"),_.classList.add("pin-spacer"),K&&_.classList.add("pin-spacer-"+K),a.pinState=x=ra(ei)),!1!==t.force3D&&ed.set(ei,{
force3D:!0
}
),eW.spacer=_=a.spacer,P=(N=tE(ei))[ea+eM.os2],E=ed.getProperty(ei),T=ed.quickSetter(ei,eM.a,"px"),rn(ei,_,N),w=ra(ei)),eF){
v=tl(eF)?tS(eF,tB):tB,h=tF("scroller-start",K,eN,eM,v,0),g=tF("scroller-end",K,eN,eM,v,0,h),C=h["offset"+eM.op.d2];
var e6=en(V(eN,"content")||eN);
d=this.markerStart=tF("start",K,e6,eM,v,C,0,eC),p=this.markerEnd=tF("end",K,e6,eM,v,C,0,eC),eC&&(U=ed.quickSetter([d,p],eM.a,"px")),eI||H.length&&!0===V(eN,"fixedMarkers")||(tT(eB?em:eN),ed.set([h,g],{
force3D:!0
}
),A=ed.quickSetter(h,eM.a,"px"),R=ed.quickSetter(g,eM.a,"px"))
}
if(eC){
var e7=eC.vars.onUpdate,te=eC.vars.onUpdateParams;
eC.eventCallback("onUpdate",function(){
eW.update(0,0,1),e7&&e7.apply(eC,te||[])
}
)
}
if(eW.previous=function(){
return tW[tW.indexOf(eW)-1]
}
,eW.next=function(){
return tW[tW.indexOf(eW)+1]
}
,eW.revert=function(e,t){
if(!t)return eW.kill(!0);
var n=!1!==e||!eW.enabled,i=eE;
n!==eW.isReverted&&(n&&(L=Math.max(e5(),eW.scroll.rec||0),e3=eW.progress,W=r&&r.progress()),d&&[d,p,h,g].forEach(function(e){
return e.style.display=n?"none":"block"
}
),n&&(eE=eW,eW.update(n)),!ei||ey&&eW.isActive||(n?rr(ei,_,x):rn(ei,_,tE(ei),M)),n||eW.update(n),eE=i,eW.isReverted=n)
}
,eW.refresh=function(n,i,a,s){
if(!eE&&eW.enabled||i){
if(ei&&n&&eQ)return void tR(e,"scrollEnd",t$);!eV&&eX&&eX(eW),eE=eW,o.tween&&!a&&(o.tween.kill(),o.tween=0),I&&I.pause(),es&&r&&(r.revert({
kill:!1
}
).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(e){
return e.vars.immediateRender&&e.render(0,!0,!0)
}
):r.vars.immediateRender&&r.render(0,!0,!0)),eW.isReverted||eW.revert(!0,!0),eW._subPinOffset=!1;
var v,C,T,P,A,R,N,D,B,Y,z,X,H,U=eH(),q=ej(),j=eC?eC.duration():tn(eN,eM),V=y<=.01||!y,G=0,$=s||0,K=tl(a)?a.end:t.end,Z=t.endTrigger||ee,Q=tl(a)?a.start:t.start||(0!==t.start&&ee?ei?"0 0":"0 100%":0),el=eW.pinnedContainer=t.pinnedContainer&&en(t.pinnedContainer,eW),ec=ee&&Math.max(0,tW.indexOf(eW))||0,eu=ec;for(eF&&tl(a)&&(X=ed.getProperty(h,eM.p),H=ed.getProperty(g,eM.p));eu-- >0;)(R=tW[eu]).end||R.refresh(0,1)||(eE=eW),(N=R.pin)&&(N===ee||N===ei||N===el)&&!R.isReverted&&(Y||(Y=[]),Y.unshift(R),R.revert(!0,!0)),R!==tW[eu]&&(ec--,eu--);for(ta(Q)&&(Q=Q(eW)),u=rc(Q=e1(Q,"start",eW),ee,U,eM,e5(),d,h,eW,q,eL,eI,j,eC,eW._startClamp&&"_startClamp")||(ei?-.001:0),ta(K)&&(K=K(eW)),to(K)&&!K.indexOf("+=")&&(~K.indexOf(" ")?K=(to(Q)?Q.split(" ")[0]:"")+K:(G=tz(K.substr(2),U),K=to(Q)?Q:(eC?ed.utils.mapRange(0,eC.duration(),eC.scrollTrigger.start,eC.scrollTrigger.end,u):u)+G,Z=ee)),K=e1(K,"end",eW),f=Math.max(u,rc(K||(Z?"100% 0":j),Z,U,eM,e5()+G,p,g,eW,q,eL,eI,j,eC,eW._endClamp&&"_endClamp"))||-.001,G=0,eu=ec;eu--;)(N=(R=tW[eu]||{

}
).pin)&&R.start-R._pinPush<=u&&!eC&&R.end>0&&(v=R.end-(eW._startClamp?Math.max(0,R.start):R.start),(N===ee&&R.start-R._pinPush<u||N===el)&&isNaN(Q)&&(G+=v*(1-R.progress)),N===ei&&($+=v));
if(u+=G,f+=G,eW._startClamp&&(eW._startClamp+=G),eW._endClamp&&!eV&&(eW._endClamp=f||-.001,f=Math.min(f,tn(eN,eM))),y=f-u||(u-=.01)&&.001,V&&(e3=ed.utils.clamp(0,1,ed.utils.normalize(u,f,L))),eW._pinPush=$,d&&G&&((v={

}
)[eM.a]="+="+G,el&&(v[eM.p]="-="+e5()),ed.set([d,p],v)),ei&&!(eU&&eW.end>=tn(eN,eM)))v=tE(ei),P=eM===er,T=e5(),S=parseFloat(E(eM.a))+$,!j&&f>1&&(z={
style:z=(eB?eg.scrollingElement||ev:eN).style,value:z["overflow"+eM.a.toUpperCase()]
}
,eB&&"scroll"!==tE(em)["overflow"+eM.a.toUpperCase()]&&(z.style["overflow"+eM.a.toUpperCase()]="scroll")),rn(ei,_,v),w=ra(ei),C=tk(ei,!0),D=eI&&eo(eN,P?et:er)(),ea?((M=[ea+eM.os2,y+$+"px"]).t=_,(eu=ea===tb?tP(ei,eM)+y+$:0)&&(M.push(eM.d,eu+"px"),"auto"!==_.style.flexBasis&&(_.style.flexBasis=eu+"px")),ro(M),el&&tW.forEach(function(e){
e.pin===el&&!1!==e.vars.pinSpacing&&(e._subPinOffset=!0)
}
),eI&&e5(L)):(eu=tP(ei,eM))&&"auto"!==_.style.flexBasis&&(_.style.flexBasis=eu+"px"),eI&&((A={
top:C.top+(P?T-u:D)+"px",left:C.left+(P?D:T-u)+"px",boxSizing:"border-box",position:"fixed"
}
)[tg]=A["max"+t_]=Math.ceil(C.width)+"px",A[tv]=A["max"+tC]=Math.ceil(C.height)+"px",A[tw]=A[tw+"Top"]=A[tw+tm]=A[tw+tx]=A[tw+ty]="0",A[tb]=v[tb],A[tb+"Top"]=v[tb+"Top"],A[tb+tm]=v[tb+tm],A[tb+tx]=v[tb+tx],A[tb+ty]=v[tb+ty],b=rs(x,A,ey),eV&&e5(0)),r?(B=r._initted,eR(1),r.render(r.duration(),!0,!0),k=E(eM.a)-S+y+$,O=Math.abs(y-k)>1,eI&&O&&b.splice(b.length-2,2),r.render(0,!0,!0),B||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),eR(0)):k=y,z&&(z.value?z.style["overflow"+eM.a.toUpperCase()]=z.value:z.style.removeProperty("overflow-"+eM.a));else if(ee&&e5()&&!eC)for(C=ee.parentNode;C&&C!==em;)C._pinOffset&&(u-=C._pinOffset,f-=C._pinOffset),C=C.parentNode;
Y&&Y.forEach(function(e){
return e.revert(!1,!0)
}
),eW.start=u,eW.end=f,l=c=eV?L:e5(),eC||eV||(l<L&&e5(L),eW.scroll.rec=0),eW.revert(!1,!0),eJ=eZ(),F&&(eG=-1,F.restart(!0)),eE=0,r&&eA&&(r._initted||W)&&r.progress()!==W&&r.progress(W||0,!0).render(r.time(),!0,!0),(V||e3!==eW.progress||eC||es||r&&!r._initted)&&(r&&!eA&&(r._initted||e3||!1!==r.vars.immediateRender)&&r.totalProgress(eC&&u<-.001&&!e3?ed.utils.normalize(u,f,0):e3,!0),eW.progress=V||(l-u)/y===e3?0:e3),ei&&ea&&(_._pinOffset=Math.round(eW.progress*k)),I&&I.invalidate(),isNaN(X)||(X-=ed.getProperty(h,eM.p),H-=ed.getProperty(g,eM.p),rp(h,eM,X),rp(d,eM,X-(s||0)),rp(g,eM,H),rp(p,eM,H-(s||0))),V&&!eV&&eW.update(),!J||eV||m||(m=!0,J(eW),m=!1)
}

}
,eW.getVelocity=function(){
return(e5()-c)/(eZ()-e_)*1e3||0
}
,eW.endAnimation=function(){
tc(eW.callbackAnimation),r&&(I?I.progress(1):r.paused()?eA||tc(r,eW.direction<0,1):tc(r,r.reversed()))
}
,eW.labelToScroll=function(e){
return r&&r.labels&&(u||eW.refresh()||u)+r.labels[e]/r.duration()*y||0
}
,eW.getTrailing=function(e){
var t=tW.indexOf(eW),r=eW.direction>0?tW.slice(0,t).reverse():tW.slice(t+1);return(to(e)?r.filter(function(t){
return t.vars.preventOverlaps===e
}
):r).filter(function(e){
return eW.direction>0?e.end<=u:e.start>=f
}
)
}
,eW.update=function(e,t,n){
if(!eC||n||e){
var i,a,s,d,p,g,v,m=!0===eV?L:eW.scroll(),x=e?0:(m-u)/y,C=x<0?0:x>1?1:x||0,E=eW.progress;if(t&&(c=l,l=eC?e5():m,ep&&(B=D,D=r&&!eA?r.totalProgress():C)),el&&ei&&!eE&&!eK&&eQ&&(!C&&u<m+(m-c)/(eZ()-e_)*el?C=1e-4:1===C&&f>m+(m-c)/(eZ()-e_)*el&&(C=.9999)),C!==E&&eW.enabled){
if(d=(p=(i=eW.isActive=!!C&&C<1)!=(!!E&&E<1))||!!C!=!!E,eW.direction=C>E?1:-1,eW.progress=C,d&&!eE&&(a=C&&!E?0:1===C?1:1===E?2:3,eA&&(s=!p&&"none"!==ez[a+1]&&ez[a+1]||ez[a],v=r&&("complete"===s||"reset"===s||s in r))),eP&&(p||v)&&(v||Q||!r)&&(ta(eP)?eP(eW):eW.getTrailing(eP).forEach(function(e){
return e.endAnimation()
}
)),!eA&&(!I||eE||eK?r&&r.totalProgress(C,!!(eE&&(eJ||e))):(I._dp._time-I._start!==I._time&&I.render(I._dp._time-I._start),I.resetTo?I.resetTo("totalProgress",C,r._tTime/r._tDur):(I.vars.totalProgress=C,I.invalidate().restart()))),ei)if(e&&ea&&(_.style[ea+eM.os2]=P),eI){
if(d){
if(g=!e&&C>E&&f+1>m&&m+1>=tn(eN,eM),ey)if(!e&&(i||g)){
var M=tk(ei,!0),N=m-u;
rf(ei,em,M.top+(eM===er?N:0)+"px",M.left+(eM===er?0:N)+"px")
}
else rf(ei,_);ro(i||g?b:w),O&&C<1&&i||T(S+(1!==C||g?0:k))
}

}
else T(e4(S+k*C));
!ep||o.tween||eE||eK||F.restart(!0),$&&(p||ef&&C&&(C<1||!eq))&&eb($.targets).forEach(function(e){
return e.classList[i||ef?"add":"remove"]($.className)
}
),!G||eA||e||G(eW),d&&!eE?(eA&&(v&&("complete"===s?r.pause().totalProgress(1):"reset"===s?r.restart(!0).pause():"restart"===s?r.restart(!0):r[s]()),G&&G(eW)),(p||!eq)&&(Z&&p&&tu(eW,Z),eY[a]&&tu(eW,eY[a]),ef&&(1===C?eW.kill(!1,1):eY[a]=0),!p&&eY[a=1===C?1:3]&&tu(eW,eY[a])),eS&&!i&&Math.abs(eW.getVelocity())>(ts(eS)?eS:2500)&&(tc(eW.callbackAnimation),I?I.progress(1):tc(r,"reverse"===s?1:!C,1))):eA&&G&&!eE&&G(eW)
}
if(R){
var Y=eC?m/eC.duration()*(eC._caScrollDist||0):m;A(Y+ +!!h._isFlipped),R(Y)
}
U&&U(-m/eC.duration()*(eC._caScrollDist||0))
}

}
,eW.enable=function(t,r){
eW.enabled||(eW.enabled=!0,tR(eN,"resize",tj),eB||tR(eN,"scroll",tU),eX&&tR(e,"refreshInit",eX),!1!==t&&(eW.progress=e3=0,l=c=eG=e5()),!1!==r&&eW.refresh())
}
,eW.getTween=function(e){
return e&&o?o.tween:I
}
,eW.setPositions=function(e,t,r,n){
if(eC){
var i=eC.scrollTrigger,o=eC.duration(),a=i.end-i.start;
e=i.start+a*e/o,t=i.start+a*t/o
}
eW.refresh(!1,!1,{
start:e2(e,r&&!!eW._startClamp),end:e2(t,r&&!!eW._endClamp)
}
,n),eW.update()
}
,eW.adjustPinSpacing=function(e){
if(M&&e){
var t=M.indexOf(eM.d)+1;M[t]=parseFloat(M[t])+e+"px",M[1]=parseFloat(M[1])+e+"px",ro(M)
}

}
,eW.disable=function(t,r){
if(!1!==t&&eW.revert(!0,!0),eW.enabled&&(eW.enabled=eW.isActive=!1,r||I&&I.pause(),L=0,a&&(a.uncache=1),eX&&tN(e,"refreshInit",eX),F&&(F.pause(),o.tween&&o.tween.kill()&&(o.tween=0)),!eB)){
for(var n=tW.length;n--;)if(tW[n].scroller===eN&&tW[n]!==eW)return;tN(eN,"resize",tj),eB||tN(eN,"scroll",tU)
}

}
,eW.kill=function(e,n){
eW.disable(e,n),I&&!n&&I.kill(),K&&delete tX[K];var i=tW.indexOf(eW);i>=0&&tW.splice(i,1),i===ek&&t7>0&&ek--,i=0,tW.forEach(function(e){
return e.scroller===eW.scroller&&(i=1)
}
),i||eV||(eW.scroll.rec=0),r&&(r.scrollTrigger=null,e&&r.revert({
kill:!1
}
),n||r.kill()),d&&[d,p,h,g].forEach(function(e){
return e.parentNode&&e.parentNode.removeChild(e)
}
),e$===eW&&(e$=0),ei&&(a&&(a.uncache=1),i=0,tW.forEach(function(e){
return e.pin===ei&&i++
}
),i||(a.spacer=0)),t.onKill&&t.onKill(eW)
}
,tW.push(eW),eW.enable(!1,!1),q&&q(eW),r&&r.add&&!y){
var ti=eW.update;eW.update=function(){
eW.update=ti,X.cache++,u||f||eW.refresh()
}
,ed.delayedCall(.01,eW.update),y=.01,u=f=0
}
else eW.refresh();ei&&t3()
}
,e.register=function(t){
return ep||(ed=t||e7(),e6()&&window.document&&e.enable(),ep=e0),ep
}
,e.defaults=function(e){
if(e)for(var t in e)tI[t]=e[t];
return tI
}
,e.disable=function(e,t){
e0=0,tW.forEach(function(r){
return r[t?"kill":"disable"](e)
}
),tN(eh,"wheel",tU),tN(eg,"scroll",tU),clearInterval(eC),tN(eg,"touchcancel",e9),tN(em,"touchstart",e9),tO(tN,eg,"pointerdown,touchstart,mousedown",e3),tO(tN,eg,"pointerup,touchend,mouseup",e5),ex.kill(),ti(tN);
for(var r=0;r<X.length;r+=3)tD(tN,X[r],X[r+1]),tD(tN,X[r],X[r+2])
}
,e.enable=function(){
if(eh=window,ev=(eg=document).documentElement,em=eg.body,ed)if(eb=ed.utils.toArray,ew=ed.utils.clamp,eF=ed.core.context||e9,eR=ed.core.suppressOverwrites||e9,eL=eh.history.scrollRestoration||"auto",t6=eh.pageYOffset||0,ed.core.globals("ScrollTrigger",e),em){
e0=1,(eW=document.createElement("div")).style.height="100vh",eW.style.position="absolute",t5(),function e(){
return e0&&requestAnimationFrame(e)
}
(),ef.register(ed),e.isTouch=ef.isTouch,ez=ef.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),eB=1===ef.isTouch,tR(eh,"wheel",tU),ey=[eh,eg,ev,em],ed.matchMedia?(e.matchMedia=function(e){
var t,r=ed.matchMedia();for(t in e)r.add(t,e[t]);
return r
}
,ed.addEventListener("matchMediaInit",function(){
tQ(),t0()
}
),ed.addEventListener("matchMediaRevert",function(){
return tJ()
}
),ed.addEventListener("matchMedia",function(){
t4(0,1),tK("matchMedia")
}
),ed.matchMedia().add("(orientation: portrait)",function(){
return tq(),tq
}
)):console.warn("Requires GSAP 3.11.0 or later"),tq(),tR(eg,"scroll",tU);
var t,r,n=em.hasAttribute("style"),i=em.style,o=i.borderTopStyle,a=ed.core.Animation.prototype;
for(a.revert||Object.defineProperty(a,"revert",{
value:function(){
return this.time(-.01,!0)
}

}
),i.borderTopStyle="solid",er.m=Math.round((t=tk(em)).top+er.sc())||0,et.m=Math.round(t.left+et.sc())||0,o?i.borderTopStyle=o:i.removeProperty("border-top-style"),n||(em.setAttribute("style",""),em.removeAttribute("style")),eC=setInterval(tH,250),ed.delayedCall(.5,function(){
return eK=0
}
),tR(eg,"touchcancel",e9),tR(em,"touchstart",e9),tO(tR,eg,"pointerdown,touchstart,mousedown",e3),tO(tR,eg,"pointerup,touchend,mouseup",e5),eS=ed.utils.checkPrefix("transform"),rt.push(eS),ep=eZ(),ex=ed.delayedCall(.2,t4).pause(),eA=[eg,"visibilitychange",function(){
var e=eh.innerWidth,t=eh.innerHeight;eg.hidden?(eP=e,eM=t):(eP!==e||eM!==t)&&tj()
}
,eg,"DOMContentLoaded",t4,eh,"load",t4,eh,"resize",tj],ti(tR),tW.forEach(function(e){
return e.enable(0,1)
}
),r=0;r<X.length;r+=3)tD(tN,X[r],X[r+1]),tD(tN,X[r],X[r+2])
}
else eg&&eg.addEventListener("DOMContentLoaded",function t(){
e.enable(),eg.removeEventListener("DOMContentLoaded",t)
}
)
}
,e.config=function(t){
"limitCallbacks"in t&&(eq=!!t.limitCallbacks);
var r=t.syncInterval;r&&clearInterval(eC)||(eC=r)&&setInterval(tH,r),"ignoreMobileResize"in t&&(eB=1===e.isTouch&&t.ignoreMobileResize),"autoRefreshEvents"in t&&(ti(tN)||ti(tR,t.autoRefreshEvents||"none"),eN=-1===(t.autoRefreshEvents+"").indexOf("resize"))
}
,e.scrollerProxy=function(e,t){
var r=en(e),n=X.indexOf(r),i=e8(r);~n&&X.splice(n,i?6:2),t&&(i?H.unshift(eh,t,em,t,ev,t):H.unshift(r,t))
}
,e.clearMatchMedia=function(e){
tW.forEach(function(t){
return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)
}
)
}
,e.isInViewport=function(e,t,r){
var n=(to(e)?en(e):e).getBoundingClientRect(),i=n[r?tg:tv]*t||0;
return r?n.right-i>0&&n.left+i<eh.innerWidth:n.bottom-i>0&&n.top+i<eh.innerHeight
}
,e.positionInViewport=function(e,t,r){
to(e)&&(e=en(e));
var n=e.getBoundingClientRect(),i=n[r?tg:tv],o=null==t?i/2:t in tY?tY[t]*i:~t.indexOf("%")?parseFloat(t)*i/100:parseFloat(t)||0;return r?(n.left+o)/eh.innerWidth:(n.top+o)/eh.innerHeight
}
,e.killAll=function(e){
if(tW.slice(0).forEach(function(e){
return"ScrollSmoother"!==e.vars.id&&e.kill()
}
),!0!==e){
var t=tV.killAll||[];
tV={

}
,t.forEach(function(e){
return e()
}
)
}

}
,e
}
();
rg.version="3.15.0",rg.saveStyles=function(e){
return e?eb(e).forEach(function(e){
if(e&&e.style){
var t=tZ.indexOf(e);t>=0&&tZ.splice(t,5),tZ.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),ed.core.getCache(e),eF())
}

}
):tZ
}
,rg.revert=function(e,t){
return t0(!e,t)
}
,rg.create=function(e,t){
return new rg(e,t)
}
,rg.refresh=function(e){
return e?tj(!0):(ep||rg.register())&&t4(!0)
}
,rg.update=function(e){
return++X.cache&&t8(2*(!0===e))
}
,rg.clearScrollMemory=t1,rg.maxScroll=function(e,t){
return tn(e,t?et:er)
}
,rg.getScrollFunc=function(e,t){
return eo(en(e),t?et:er)
}
,rg.getById=function(e){
return tX[e]
}
,rg.getAll=function(){
return tW.filter(function(e){
return"ScrollSmoother"!==e.vars.id
}
)
}
,rg.isScrolling=function(){
return!!eQ
}
,rg.snapDirectional=tA,rg.addEventListener=function(e,t){
var r=tV[e]||(tV[e]=[]);~r.indexOf(t)||r.push(t)
}
,rg.removeEventListener=function(e,t){
var r=tV[e],n=r&&r.indexOf(t);n>=0&&r.splice(n,1)
}
,rg.batch=function(e,t){
var r,n=[],i={

}
,o=t.interval||.016,a=t.batchMax||1e9,s=function(e,t){
var r=[],n=[],i=ed.delayedCall(o,function(){
t(r,n),r=[],n=[]
}
).pause();return function(e){
r.length||i.restart(!0),r.push(e.trigger),n.push(e),a<=r.length&&i.progress(1)
}

}
;for(r in t)i[r]="on"===r.substr(0,2)&&ta(t[r])&&"onRefreshInit"!==r?s(r,t[r]):t[r];return ta(a)&&(a=a(),tR(rg,"refresh",function(){
return a=t.batchMax()
}
)),eb(e).forEach(function(e){
var t={

}
;for(r in i)t[r]=i[r];
t.trigger=e,n.push(rg.create(t))
}
),n
}
;
var rv,rm=function(e,t,r,n){
return t>n?e(n):t<0&&e(0),r>n?(n-t)/(r-t):r<0?t/(t-r):1
}
,ry=function e(t,r){
!0===r?t.style.removeProperty("touch-action"):t.style.touchAction=!0===r?"auto":r?"pan-"+r+(ef.isTouch?" pinch-zoom":""):"none",t===ev&&e(em,r)
}
,rx={
auto:1,scroll:1
}
,rb=function(e){
var t,r=e.event,n=e.target,i=e.axis,o=(r.changedTouches?r.changedTouches[0]:r).target,a=o._gsap||ed.core.getCache(o),s=eZ();
if(!a._isScrollT||s-a._isScrollT>2e3){
for(;
o&&o!==em&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!(rx[(t=tE(o)).overflowY]||rx[t.overflowX]));)o=o.parentNode;
a._isScroll=o&&o!==n&&!e8(o)&&(rx[(t=tE(o)).overflowY]||rx[t.overflowX]),a._isScrollT=s
}
(a._isScroll||"x"===i)&&(r.stopPropagation(),r._gsapAllow=!0)
}
,rw=function(e,t,r,n){
return ef.create({
target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:n=n&&rb,onPress:n,onDrag:n,onScroll:n,onEnable:function(){
return r&&tR(eg,ef.eventTypes[0],rC,!1,!0)
}
,onDisable:function(){
return tN(eg,ef.eventTypes[0],rC,!0)
}

}
)
}
,r_=/(input|label|select|textarea)/i,rC=function(e){
var t=r_.test(e.target.tagName);(t||rv)&&(e._gsapAllow=!0,rv=t)
}
,rE=function(e){
tl(e)||(e={

}
),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";
var t,r,n,i,o,a,s,l,c=e,u=c.normalizeScrollX,f=c.momentum,d=c.allowNestedScroll,p=c.onRelease,h=en(e.target)||ev,g=ed.core.globals().ScrollSmoother,v=g&&g.get(),m=ez&&(e.content&&en(e.content)||v&&!1!==e.content&&!v.smooth()&&v.content()),y=eo(h,er),x=eo(h,et),b=1,w=(ef.isTouch&&eh.visualViewport?eh.visualViewport.scale*eh.visualViewport.width:eh.outerWidth)/eh.innerWidth,_=0,C=ta(f)?function(){
return f(t)
}
:function(){
return f||2.8
}
,E=rw(h,e.type,!0,d),T=function(){
return i=!1
}
,S=e9,k=e9,P=function(){
r=tn(h,er),k=ew(+!!ez,r),u&&(S=ew(0,tn(h,et))),n=t2
}
,M=function(){
m._gsap.y=e4(parseFloat(m._gsap.y)+y.offset)+"px",m.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(m._gsap.y)+", 0, 1)",y.offset=y.cacheID=0
}
,A=function(){
if(i){
requestAnimationFrame(T);var e=e4(t.deltaY/2),r=k(y.v-e);
if(m&&r!==y.v+y.offset){
y.offset=r-y.v;
var n=e4((parseFloat(m&&m._gsap.y)||0)-y.offset);
m.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+n+", 0, 1)",m._gsap.y=n+"px",y.cacheID=X.cache,t8()
}
return!0
}
y.offset&&M(),i=!0
}
,O=function(){
P(),o.isActive()&&o.vars.scrollY>r&&(y()>r?o.progress(1)&&y(r):o.resetTo("scrollY",r))
}
;
return m&&ed.set(m,{
y:"+=0"
}
),e.ignoreCheck=function(e){
return ez&&"touchmove"===e.type&&A()||b>1.05&&"touchstart"!==e.type||t.isGesturing||e.touches&&e.touches.length>1
}
,e.onPress=function(){
i=!1;
var e=b;
b=e4((eh.visualViewport&&eh.visualViewport.scale||1)/w),o.pause(),e!==b&&ry(h,b>1.01||!u&&"x"),a=x(),s=y(),P(),n=t2
}
,e.onRelease=e.onGestureStart=function(e,t){
if(y.offset&&M(),t){
X.cache++;var n,i,a=C();u&&(i=(n=x())+-(.05*a*e.velocityX)/.227,a*=rm(x,n,i,tn(h,et)),o.vars.scrollX=S(i)),i=(n=y())+-(.05*a*e.velocityY)/.227,a*=rm(y,n,i,tn(h,er)),o.vars.scrollY=k(i),o.invalidate().duration(a).play(.01),(ez&&o.vars.scrollY>=r||n>=r-1)&&ed.to({

}
,{
onUpdate:O,duration:a
}
)
}
else l.restart(!0);p&&p(e)
}
,e.onWheel=function(){
o._ts&&o.pause(),eZ()-_>1e3&&(n=0,_=eZ())
}
,e.onChange=function(e,t,r,i,o){
if(t2!==n&&P(),t&&u&&x(S(i[2]===t?a+(e.startX-e.x):x()+t-i[1])),r){
y.offset&&M();
var l=o[2]===r,c=l?s+e.startY-e.y:y()+r-o[1],f=k(c);l&&c!==f&&(s+=f-c),y(f)
}
(r||t)&&t8()
}
,e.onEnable=function(){
ry(h,!u&&"x"),rg.addEventListener("refresh",O),tR(eh,"resize",O),y.smooth&&(y.target.style.scrollBehavior="auto",y.smooth=x.smooth=!1),E.enable()
}
,e.onDisable=function(){
ry(h,!0),tN(eh,"resize",O),rg.removeEventListener("refresh",O),E.kill()
}
,e.lockAxis=!1!==e.lockAxis,(t=new ef(e)).iOS=ez,ez&&!y()&&y(1),ez&&ed.ticker.add(e9),l=t._dc,o=ed.to(t,{
ease:"power4",paused:!0,inherit:!1,scrollX:u?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{
scrollY:rd(y,y(),function(){
return o.pause()
}
)
}
,onUpdate:t8,onComplete:l.vars.onComplete
}
),t
}
;rg.sort=function(e){
if(ta(e))return tW.sort(e);
var t=eh.pageYOffset||0;return rg.getAll().forEach(function(e){
return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+eh.innerHeight
}
),tW.sort(e||function(e,t){
return -1e6*(e.vars.refreshPriority||0)+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+-1e6*(t.vars.refreshPriority||0))
}
)
}
,rg.observe=function(e){
return new ef(e)
}
,rg.normalizeScroll=function(e){
if(void 0===e)return eD;if(!0===e&&eD)return eD.enable();if(!1===e){
eD&&eD.kill(),eD=e;
return
}
var t=e instanceof ef?e:rE(e);
return eD&&eD.target===t.target&&eD.kill(),e8(t.target)&&(eD=t),t
}
,rg.core={
_getVelocityProp:ea,_inputObserver:rw,_scrollers:X,_proxies:H,bridge:{
ss:function(){
eQ||tK("scrollStart"),eQ=eZ()
}
,ref:function(){
return eE
}

}

}
,e7()&&ed.registerPlugin(rg),n.default.registerPlugin(T,rg);
let rT={
top:{
yPercent:-100,xPercent:0,rotate:0
}
,bottom:{
yPercent:100,xPercent:0,rotate:0
}
,left:{
yPercent:0,xPercent:-100,rotate:0
}
,right:{
yPercent:0,xPercent:100,rotate:0
}

}
,rS=(0,t.jsx)("p",{
children:"Characters rise from below."
}
);
e.s(["default",0,function({
children:e=rS,animateOnScroll:i=!0,delay:o=0,className:a="",scrub:s=!1,direction:l="bottom",splitBy:c="chars",stagger:u,duration:f=.5,onComplete:d,completeOverlap:p=0,start:h=!0
}
){
let g=(0,r.useRef)(null),v=(0,r.useRef)([]),m=(0,r.useRef)([]);return(0,r.useEffect)(()=>{
let e,t;if(!g.current||!h)return;
v.current=[],m.current=[];
let r=g.current.hasAttribute("data-copy-wrapper")?Array.from(g.current.children):[g.current],a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,y=null,x=!1,b=()=>{
!x&&g.current&&(e=n.default.context(()=>{
if(r.forEach(e=>{
if("lines"===c){
let t=T.create(e,{
type:"lines",mask:"lines",linesClass:"line++",reduceWhiteSpace:!1
}
);v.current.push(t),m.current.push(...t.lines);
return
}
let t=T.create(e,{
type:"lines,chars",mask:"chars",charsClass:"char++",reduceWhiteSpace:!1
}
);
t.masks?.forEach(e=>{
e.style.paddingInline="0.04em",e.style.marginInline="-0.04em",e.style.boxSizing="content-box"
}
),v.current.push(t),m.current.push(...t.chars)
}
),a){
n.default.set(m.current,{
yPercent:0,xPercent:0,rotate:0,opacity:1
}
),n.default.set(g.current,{
opacity:0,y:24
}
);
let e={
opacity:1,y:0,duration:.8,ease:"power2.out",delay:o
}
;if(d){
let e=o+.8;
n.default.delayedCall(Math.max(e-p,0),d)
}
i?n.default.to(g.current,{
...e,scrollTrigger:{
trigger:g.current,start:"top 85%",once:!0
}

}
):n.default.to(g.current,e);
return
}
let e=rT[l]??rT.bottom;
n.default.set(g.current,{
opacity:1
}
);
let t={
...e,willChange:"transform"
}
,h=u??("lines"===c?.1:.03),y={
yPercent:0,xPercent:0,rotate:0,opacity:1,duration:f,stagger:h,ease:"power3.out",delay:o
}
;if(d){
let e=o+h*Math.max(m.current.length-1,0)+f;
n.default.delayedCall(Math.max(e-p,0),d)
}
i?n.default.fromTo(m.current,t,{
...y,scrollTrigger:{
trigger:g.current,start:"top 85%",end:"bottom 68%",scrub:s
}

}
):n.default.fromTo(m.current,t,y)
}
,g))
}
,w=()=>{
let e=!1,r=()=>{
e||(e=!0,window.clearTimeout(t),b())
}
,n=document.fonts;if(!n)return void b();
let{
fontFamily:i,fontWeight:o,fontSize:a
}
=getComputedStyle(g.current);
try{
n.load(`${
o
}
 ${
a
}
 ${
i
}
`).then(r,r)
}
catch{
n.ready.then(r,r)
}
t=window.setTimeout(r,300)
}
,_=g.current.getBoundingClientRect();
return _.top<1.5*window.innerHeight&&_.bottom>-window.innerHeight?w():(y=new IntersectionObserver(([e],t)=>{
e.isIntersecting&&(t.disconnect(),y=null,w())
}
,{
rootMargin:"200% 0px"
}
)).observe(g.current),()=>{
x=!0,window.clearTimeout(t),y?.disconnect(),e&&e.revert(),v.current.forEach(e=>e?.revert())
}

}
,[i,o,s,l,c,u,f,d,p,h]),(0,t.jsx)("div",{
ref:g,"data-copy-wrapper":"true",className:`opacity-0 ${
a
}
`,children:e
}
)
}
],79921)
}
]);
