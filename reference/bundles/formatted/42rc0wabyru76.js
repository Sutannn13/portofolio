(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,65747,e=>{
"use strict";var t=e.i(71645),r=e.i(89970);
let i="u">typeof document?t.useLayoutEffect:t.useEffect,n=e=>e&&!Array.isArray(e)&&"object"==typeof e,s=[],a={

}
,l=r.default,o=(e,r=s)=>{
let o=a;n(e)?(o=e,e=null,r="dependencies"in o?o.dependencies:s):n(r)&&(r="dependencies"in(o=r)?o.dependencies:s),e&&"function"!=typeof e&&console.warn("First parameter must be a function or config object");
let{
scope:c,revertOnUpdate:u
}
=o,d=(0,t.useRef)(!1),h=(0,t.useRef)(l.context(()=>{

}
,c)),f=(0,t.useRef)(e=>h.current.add(null,e)),A=r&&r.length&&!u;return A&&i(()=>(d.current=!0,()=>h.current.revert()),s),i(()=>{
if(e&&h.current.add(e,c),!A||!d.current)return()=>h.current.revert()
}
,r),{
context:h.current,contextSafe:f.current
}

}
;
o.register=e=>{
l=e
}
,o.headless=!0,e.s(["useGSAP",0,o])
}
,55667,e=>{
"use strict";
var t="1.3.26";function r(e,t,r){
return Math.max(e,Math.min(t,r))
}
var i=class{
isRunning=!1;
value=0;
from=0;
to=0;
currentTime=0;
lerp;
duration;
easing;onUpdate;advance(e){
if(!this.isRunning)return;
let t=!1;
if(this.duration&&this.easing){
this.currentTime+=e;
let i=r(0,this.currentTime/this.duration,1),n=(t=i>=1)?1:this.easing(i);
this.value=this.from+(this.to-this.from)*n
}
else if(this.lerp){
var i,n,s,a;
this.value=(i=this.value,n=this.to,s=60*this.lerp,(1-(a=1-Math.exp(-s*e)))*i+a*n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)
}
else this.value=this.to,t=!0;t&&this.stop(),this.onUpdate?.(this.value,t)
}
stop(){
this.isRunning=!1
}
fromTo(e,t,{
lerp:r,duration:i,easing:n,onStart:s,onUpdate:a
}
){
this.from=this.value=e,this.to=t,this.lerp=r,this.duration=i,this.easing=n,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a
}

}
,n=class{
width=0;
height=0;
scrollHeight=0;
scrollWidth=0;
debouncedResize;
wrapperResizeObserver;
contentResizeObserver;
constructor(e,t,{
autoResize:r=!0,debounce:i=250
}
={

}
){
this.wrapper=e,this.content=t,r&&(this.debouncedResize=function(e,t){
let r;return function(...i){
clearTimeout(r),r=setTimeout(()=>{
r=void 0,e.apply(this,i)
}
,t)
}

}
(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()
}
destroy(){
this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)
}
resize=()=>{
this.onWrapperResize(),this.onContentResize()
}
;onWrapperResize=()=>{
this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)
}
;onContentResize=()=>{
this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)
}
;get limit(){
return{
x:this.scrollWidth-this.width,y:this.scrollHeight-this.height
}

}

}
,s=class{
events={

}
;emit(e,...t){
let r=this.events[e]||[];
for(let e=0,i=r.length;e<i;e++)r[e]?.(...t)
}
on(e,t){
return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{
this.events[e]=this.events[e]?.filter(e=>t!==e)
}

}
off(e,t){
this.events[e]=this.events[e]?.filter(e=>t!==e)
}
destroy(){
this.events={

}

}

}
;
let a=100/6,l={
passive:!1
}
;function o(e,t){
return 1===e?a:2===e?t:1
}
var c=class{
touchStart={
x:0,y:0
}
;
lastDelta={
x:0,y:0
}
;
window={
width:0,height:0
}
;
emitter=new s;
constructor(e,t={
wheelMultiplier:1,touchMultiplier:1
}
){
this.element=e,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,l),this.element.addEventListener("touchstart",this.onTouchStart,l),this.element.addEventListener("touchmove",this.onTouchMove,l),this.element.addEventListener("touchend",this.onTouchEnd,l)
}
on(e,t){
return this.emitter.on(e,t)
}
destroy(){
this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,l),this.element.removeEventListener("touchstart",this.onTouchStart,l),this.element.removeEventListener("touchmove",this.onTouchMove,l),this.element.removeEventListener("touchend",this.onTouchEnd,l)
}
onTouchStart=e=>{
let{
clientX:t,clientY:r
}
=e.targetTouches?e.targetTouches[0]:e;
this.touchStart.x=t,this.touchStart.y=r,this.lastDelta={
x:0,y:0
}
,this.emitter.emit("scroll",{
deltaX:0,deltaY:0,event:e
}
)
}
;
onTouchMove=e=>{
let{
clientX:t,clientY:r
}
=e.targetTouches?e.targetTouches[0]:e,i=-(t-this.touchStart.x)*this.options.touchMultiplier,n=-(r-this.touchStart.y)*this.options.touchMultiplier;
this.touchStart.x=t,this.touchStart.y=r,this.lastDelta={
x:i,y:n
}
,this.emitter.emit("scroll",{
deltaX:i,deltaY:n,event:e
}
)
}
;
onTouchEnd=e=>{
this.emitter.emit("scroll",{
deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e
}
)
}
;
onWheel=e=>{
let{
deltaX:t,deltaY:r,deltaMode:i
}
=e,n=o(i,this.window.width),s=o(i,this.window.height);
t*=n,r*=s,t*=this.options.wheelMultiplier,r*=this.options.wheelMultiplier,this.emitter.emit("scroll",{
deltaX:t,deltaY:r,event:e
}
)
}
;onWindowResize=()=>{
this.window={
width:window.innerWidth,height:window.innerHeight
}

}

}
;
let u=e=>Math.min(1,1.001-2**(-10*e));
var d=class{
_isScrolling=!1;
_isStopped=!1;
_isLocked=!1;
_preventNextNativeScrollEvent=!1;
_resetVelocityTimeout=null;
_rafId=null;
_isDraggingSelection=!1;
reducedMotionMediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");
isTouching;
isIos;
time=0;
userData={

}
;
lastVelocity=0;
velocity=0;
direction=0;
options;
targetScroll;
animatedScroll;
animate=new i;
emitter=new s;
dimensions;
virtualScroll;
constructor({
wrapper:e=window,content:r=document.documentElement,eventsTarget:i=e,smoothWheel:s=!0,syncTouch:a=!1,syncTouchLerp:l=.075,touchInertiaExponent:o=1.7,duration:d,easing:h,lerp:f=.1,infinite:A=!1,orientation:m="vertical",gestureOrientation:p="horizontal"===m?"both":"vertical",touchMultiplier:g=1,wheelMultiplier:x=1,autoResize:w=!0,prevent:v,virtualScroll:b,overscroll:y=!0,autoRaf:j=!1,anchors:E=!1,autoToggle:S=!1,allowNestedScroll:C=!1,__experimental__naiveDimensions:N=!1,naiveDimensions:k=N,stopInertiaOnNavigate:R=!1,respectReducedMotion:M=!0
}
={

}
){
window.lenisVersion=t,window.lenis||(window.lenis={

}
),window.lenis.version=t,"horizontal"===m&&(window.lenis.horizontal=!0),!0===a&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),e&&e!==document.documentElement||(e=window),"number"==typeof d&&"function"!=typeof h?h=u:"function"==typeof h&&"number"!=typeof d&&(d=1),this.options={
wrapper:e,content:r,eventsTarget:i,smoothWheel:s,syncTouch:a,syncTouchLerp:l,touchInertiaExponent:o,duration:d,easing:h,lerp:f,infinite:A,gestureOrientation:p,orientation:m,touchMultiplier:g,wheelMultiplier:x,autoResize:w,prevent:v,virtualScroll:b,overscroll:y,autoRaf:j,anchors:E,autoToggle:S,allowNestedScroll:C,naiveDimensions:k,stopInertiaOnNavigate:R,respectReducedMotion:M
}
,this.dimensions=new n(e,r,{
autoResize:w
}
),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{
capture:!0
}
),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new c(i,{
touchMultiplier:g,wheelMultiplier:x
}
),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))
}
destroy(){
this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{
capture:!0
}
),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)
}
on(e,t){
return this.emitter.on(e,t)
}
off(e,t){
return this.emitter.off(e,t)
}
onScrollEnd=e=>{
e instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||e.stopPropagation()
}
;
dispatchScrollendEvent=()=>{
this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{
bubbles:this.options.wrapper===window,detail:{
lenisScrollEnd:!0
}

}
))
}
;get overflow(){
let e=this.isHorizontal?"overflow-x":"overflow-y";
return getComputedStyle(this.rootElement)[e]
}
checkOverflow(){
["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()
}
onTransitionEnd=e=>{
e.propertyName?.includes("overflow")&&e.target===this.rootElement&&this.checkOverflow()
}
;setScroll(e){
this.isHorizontal?this.options.wrapper.scrollTo({
left:e,behavior:"instant"
}
):this.options.wrapper.scrollTo({
top:e,behavior:"instant"
}
)
}
onClick=e=>{
let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),r=new URL(window.location.href);
if(this.options.anchors){
let e=t.find(e=>r.host===e.host&&r.pathname===e.pathname&&e.hash);if(e){
let t="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(e.hash);this.scrollTo(r,t);
return
}

}
if(this.options.stopInertiaOnNavigate&&t.some(e=>r.host===e.host&&r.pathname!==e.pathname))return void this.reset()
}
;
onPointerDown=e=>{
1===e.button&&this.reset()
}
;
isTouchOnSelectionHandle(e){
let t=window.getSelection();
if(!t||t.isCollapsed||0===t.rangeCount)return!1;
let r=e.targetTouches[0]??e.changedTouches[0];if(!r)return!1;let i=t.getRangeAt(0).getClientRects();if(0===i.length)return!1;
let n=i[0],s=i[i.length-1],a=40>=Math.hypot(r.clientX-n.left,r.clientY-n.top),l=40>=Math.hypot(r.clientX-s.right,r.clientY-s.bottom);
return a||l
}
onVirtualScroll=e=>{
if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(e))return;
let{
deltaX:t,deltaY:r,event:i
}
=e;
if(this.emitter.emit("virtual-scroll",{
deltaX:t,deltaY:r,event:i
}
),i.ctrlKey||i.lenisStopPropagation)return;
let n=i.type.includes("touch"),s=i.type.includes("wheel");
if(n&&this.isIos&&("touchstart"===i.type&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){
"touchend"===i.type&&(this._isDraggingSelection=!1);
return
}
this.isTouching="touchstart"===i.type||"touchmove"===i.type;
let a=0===t&&0===r;
if(this.options.syncTouch&&n&&"touchstart"===i.type&&a&&!this.isStopped&&!this.isLocked)return void this.reset();
let l="vertical"===this.options.gestureOrientation&&0===r||"horizontal"===this.options.gestureOrientation&&0===t;if(a||l)return;
let o=i.composedPath();
o=o.slice(0,o.indexOf(this.rootElement));
let c=this.options.prevent,u=Math.abs(t)>=Math.abs(r)?"horizontal":"vertical";
if(o.find(e=>e instanceof HTMLElement&&("function"==typeof c&&c?.(e)||e.hasAttribute?.("data-lenis-prevent")||"vertical"===u&&e.hasAttribute?.("data-lenis-prevent-vertical")||"horizontal"===u&&e.hasAttribute?.("data-lenis-prevent-horizontal")||n&&e.hasAttribute?.("data-lenis-prevent-touch")||s&&e.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(e,{
deltaX:t,deltaY:r
}
))))return;
if(this.isStopped||this.isLocked){
i.cancelable&&i.preventDefault();
return
}
if(!(this.options.syncTouch&&n||this.options.smoothWheel&&s)){
this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;
return
}
let d=r;
"both"===this.options.gestureOrientation?d=Math.abs(r)>Math.abs(t)?r:t:"horizontal"===this.options.gestureOrientation&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&r>0||this.animatedScroll===this.limit&&r<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();
let h=n&&this.options.syncTouch,f=n&&"touchend"===i.type;f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{
programmatic:!1,...h?{
lerp:f?this.options.syncTouchLerp:1
}
:{
lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing
}

}
)
}
;resize(){
this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()
}
emit(){
this.emitter.emit("scroll",this)
}
onNativeScroll=()=>{
if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){
this._preventNextNativeScrollEvent=!1;
return
}
if(!1===this.isScrolling||"native"===this.isScrolling){
let e=this.animatedScroll;
this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout(()=>{
this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()
}
,400))
}

}
;reset(){
this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()
}
start(){
if(this.isStopped){
if(this.options.autoToggle)return void this.rootElement.style.removeProperty("overflow");this.internalStart()
}

}
internalStart(){
this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())
}
stop(){
if(!this.isStopped){
if(this.options.autoToggle)return void this.rootElement.style.setProperty("overflow","clip");this.internalStop()
}

}
internalStop(){
this.isStopped||(this.reset(),this.isStopped=!0,this.emit())
}
raf=e=>{
let t=e-(this.time||e);
this.time=e,this.animate.advance(.001*t),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))
}
;
scrollTo(e,{
offset:t=0,immediate:i=!1,lock:n=!1,programmatic:s=!0,lerp:a=s?this.options.lerp:void 0,duration:l=s?this.options.duration:void 0,easing:o=s?this.options.easing:void 0,onStart:c,onComplete:d,force:h=!1,userData:f
}
={

}
){
if(this.prefersReducedMotion&&(s?i=!0:(a=1,l=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!h)return;
let A=e,m=t;
if("string"==typeof A&&["top","left","start","#"].includes(A))A=0;
else if("string"==typeof A&&["bottom","right","end"].includes(A))A=this.limit;
else{
let e=null;
if("string"==typeof A?(e=A.startsWith("#")?document.getElementById(A.slice(1)):document.querySelector(A))||("#top"===A?A=0:console.warn("Lenis: Target not found",A)):A instanceof HTMLElement&&A?.nodeType&&(e=A),e){
if(this.options.wrapper!==window){
let e=this.rootElement.getBoundingClientRect();
m-=this.isHorizontal?e.left:e.top
}
let t=e.getBoundingClientRect(),r=getComputedStyle(e),i=this.isHorizontal?Number.parseFloat(r.scrollMarginLeft):Number.parseFloat(r.scrollMarginTop),n=getComputedStyle(this.rootElement),s=this.isHorizontal?Number.parseFloat(n.scrollPaddingLeft):Number.parseFloat(n.scrollPaddingTop);
A=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(i)?0:i)-(Number.isNaN(s)?0:s)
}

}
if("number"==typeof A){
if(A+=m,this.options.infinite){
if(s){
this.targetScroll=this.animatedScroll=this.scroll;
let e=A-this.animatedScroll;
e>this.limit/2?A-=this.limit:e<-this.limit/2&&(A+=this.limit)
}

}
else A=r(0,A,this.limit);
if(A===this.targetScroll){
c?.(this),d?.(this);
return
}
if(this.userData=f??{

}
,i){
this.animatedScroll=this.targetScroll=A,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),d?.(this),this.userData={

}
,requestAnimationFrame(()=>{
this.dispatchScrollendEvent()
}
);
return
}
s||(this.targetScroll=A),"number"==typeof l&&"function"!=typeof o?o=u:"function"==typeof o&&"number"!=typeof l&&(l=1),this.animate.fromTo(this.animatedScroll,A,{
duration:l,easing:o,lerp:a,onStart:()=>{
n&&(this.isLocked=!0),this.isScrolling="smooth",c?.(this)
}
,onUpdate:(e,t)=>{
this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),s&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),d?.(this),this.userData={

}
,requestAnimationFrame(()=>{
this.dispatchScrollendEvent()
}
),this.preventNextNativeScrollEvent())
}

}
)
}

}
preventNextNativeScrollEvent(){
this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{
this._preventNextNativeScrollEvent=!1
}
)
}
hasNestedScroll(e,{
deltaX:t,deltaY:r
}
){
let i,n,s,a,l,o,c,u,d,h,f,A,m,p,g,x,w=Date.now();
e._lenis||(e._lenis={

}
);
let v=e._lenis;if(w-(v.time??0)>2e3){
v.time=Date.now();
let t=window.getComputedStyle(e);
if(v.computedStyle=t,i=["auto","overlay","scroll"].includes(t.overflowX),n=["auto","overlay","scroll"].includes(t.overflowY),l=["auto"].includes(t.overscrollBehaviorX),o=["auto"].includes(t.overscrollBehaviorY),v.hasOverflowX=i,v.hasOverflowY=n,!(i||n))return!1;
c=e.scrollWidth,u=e.scrollHeight,d=e.clientWidth,h=e.clientHeight,s=c>d,a=u>h,v.isScrollableX=s,v.isScrollableY=a,v.scrollWidth=c,v.scrollHeight=u,v.clientWidth=d,v.clientHeight=h,v.hasOverscrollBehaviorX=l,v.hasOverscrollBehaviorY=o
}
else s=v.isScrollableX,a=v.isScrollableY,i=v.hasOverflowX,n=v.hasOverflowY,c=v.scrollWidth,u=v.scrollHeight,d=v.clientWidth,h=v.clientHeight,l=v.hasOverscrollBehaviorX,o=v.hasOverscrollBehaviorY;if(!(i&&s||n&&a))return!1;let b=Math.abs(t)>=Math.abs(r)?"horizontal":"vertical";if("horizontal"===b)f=Math.round(e.scrollLeft),A=c-d,m=t,p=i,g=s,x=l;
else{
if("vertical"!==b)return!1;
f=Math.round(e.scrollTop),A=u-h,m=r,p=n,g=a,x=o
}
return!x&&(f>=A||f<=0)||(m>0?f<A:f>0)&&p&&g
}
get rootElement(){
return this.options.wrapper===window?document.documentElement:this.options.wrapper
}
get limit(){
return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]
}
get isHorizontal(){
return"horizontal"===this.options.orientation
}
get actualScroll(){
let e=this.options.wrapper;
return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop
}
get scroll(){
var e;
return this.options.infinite?(this.animatedScroll%(e=this.limit)+e)%e:this.animatedScroll
}
get progress(){
return 0===this.limit?1:this.scroll/this.limit
}
get isScrolling(){
return this._isScrolling
}
set isScrolling(e){
this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())
}
get isStopped(){
return this._isStopped
}
set isStopped(e){
this._isStopped!==e&&(this._isStopped=e,this.updateClassName())
}
get isLocked(){
return this._isLocked
}
set isLocked(e){
this._isLocked!==e&&(this._isLocked=e,this.updateClassName())
}
get isSmooth(){
return"smooth"===this.isScrolling
}
get prefersReducedMotion(){
return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches
}
get className(){
let e="lenis";
return this.options.autoToggle&&(e+=" lenis-autoToggle"),this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),"smooth"===this.isScrolling&&(e+=" lenis-smooth"),e
}
updateClassName(){
this.cleanUpClassName(),this.className.split(" ").forEach(e=>{
this.rootElement.classList.add(e)
}
)
}
cleanUpClassName(){
for(let e of Array.from(this.rootElement.classList))("lenis"===e||e.startsWith("lenis-"))&&this.rootElement.classList.remove(e)
}

}
,h=e.i(71645),f=e.i(43476);
let A=(0,h.createContext)(null),m=new class{
listeners=[];constructor(e){
this.state=e
}
set(e){
for(let t of(this.state=e,this.listeners))t(this.state)
}
subscribe(e){
return this.listeners=[...this.listeners,e],()=>{
this.listeners=this.listeners.filter(t=>t!==e)
}

}
get(){
return this.state
}

}
(null),p=(0,h.forwardRef)(({
children:e,root:t=!1,options:r={

}
,autoRaf:i=!0,className:n="",...s
}
,a)=>{
let l=(0,h.useRef)(null),o=(0,h.useRef)(null),[c,u]=(0,h.useState)(void 0);
(0,h.useImperativeHandle)(a,()=>({
wrapper:l.current,content:o.current,lenis:c
}
),[c]),(0,h.useEffect)(()=>{
let e=new d({
...r,...l.current&&o.current&&{
wrapper:l.current,content:o.current
}
,autoRaf:r?.autoRaf??i
}
);return u(e),()=>{
e.destroy(),u(void 0)
}

}
,[i,JSON.stringify({
...r,wrapper:null,content:null
}
)]);let p=(0,h.useRef)([]),g=(0,h.useCallback)((e,t)=>{
p.current.push({
callback:e,priority:t
}
),p.current.sort((e,t)=>e.priority-t.priority)
}
,[]),x=(0,h.useCallback)(e=>{
p.current=p.current.filter(t=>t.callback!==e)
}
,[]);
return((0,h.useEffect)(()=>{
if(t&&c)return m.set({
lenis:c,addCallback:g,removeCallback:x
}
),()=>m.set(null)
}
,[t,c,g,x]),(0,h.useEffect)(()=>{
if(!c)return;
let e=e=>{
for(let{
callback:t
}
of p.current)t(e)
}
;
return c.on("scroll",e),()=>{
c.off("scroll",e)
}

}
,[c]),e)?(0,f.jsx)(A.Provider,{
value:{
lenis:c,addCallback:g,removeCallback:x
}
,children:t&&"asChild"!==t?e:(0,f.jsx)("div",{
ref:l,className:`${
n
}
 ${
c?.className??""
}
`.trim(),...s,children:(0,f.jsx)("div",{
ref:o,children:e
}
)
}
)
}
):null
}
),g={

}
;
e.s(["Lenis",0,p,"LenisContext",0,A,"ReactLenis",0,p,"default",0,p,"useLenis",0,function(e,t=[],r=0){
let i=(0,h.useContext)(A),n=function(e){
let[t,r]=(0,h.useState)(e.get());return(0,h.useEffect)(()=>e.subscribe(e=>r(e)),[e]),t
}
(m),{
lenis:s,addCallback:a,removeCallback:l
}
=i??n??g;return(0,h.useEffect)(()=>{
if(e&&a&&l&&s)return a(e,r),e(s),()=>{
l(e)
}

}
,[s,a,l,r,...t,e]),s
}
],55667)
}
,75254,e=>{
"use strict";var t=e.i(71645);let r=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),i=e=>{
let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)
}
;
var n={
xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"
}
;
let s=(0,t.forwardRef)(({
color:e="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:l="",children:o,iconNode:c,...u
}
,d)=>(0,t.createElement)("svg",{
ref:d,...n,width:i,height:i,stroke:e,strokeWidth:a?24*Number(s)/Number(i):s,className:r("lucide",l),...!o&&!(e=>{
for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1
}
)(u)&&{
"aria-hidden":"true"
}
,...u
}
,[...c.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(o)?o:[o]]));
e.s(["default",0,(e,n)=>{
let a=(0,t.forwardRef)(({
className:a,...l
}
,o)=>(0,t.createElement)(s,{
ref:o,iconNode:n,className:r(`lucide-${
i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()
}
`,`lucide-${
e
}
`,a),...l
}
));
return a.displayName=i(e),a
}
],75254)
}
,22016,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
default:function(){
return g
}
,useLinkStatus:function(){
return w
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);let s=e.r(90809),a=e.r(43476),l=s._(e.r(71645)),o=e.r(95057),c=e.r(8372),u=e.r(18581),d=e.r(18967),h=e.r(5550),f=e.r(88540),A=e.r(91949),m=e.r(73668),p=e.r(9396);function g(t){
var r;
let i,n,s,[g,w]=(0,l.useOptimistic)(A.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{
href:b,as:y,children:j,prefetch:E=null,passHref:S,replace:C,shallow:N,scroll:k,onClick:R,onMouseEnter:M,onTouchStart:T,legacyBehavior:P=!1,onNavigate:I,transitionTypes:_,ref:B,unstable_dynamicOnHover:z,...O
}
=t;
i=j,P&&("string"==typeof i||"number"==typeof i)&&(i=(0,a.jsx)("a",{
children:i
}
));
let L=l.default.useContext(c.AppRouterContext),D=!1!==E,W=!1===E?"none":!0===E?"full":"auto",q="none"!==W?"auto"===W?p.FetchStrategy.PPR:p.FetchStrategy.Full:p.FetchStrategy.PPR,F="string"==typeof(r=y||b)?r:(0,o.formatUrl)(r);if(P){
if(i?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{
value:"E863",enumerable:!1,configurable:!0
}
);
n=l.default.Children.only(i)
}
let Q=P?n&&"object"==typeof n&&n.ref:B,U,H=l.default.useCallback(e=>(null!==L&&(v.current=(0,A.mountLinkInstance)(e,F,L,q,D,w,U)),()=>{
v.current&&((0,A.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,A.unmountPrefetchableInstance)(e)
}
),[D,F,L,q,w,U]),Y={
ref:(0,u.useMergedRef)(H,Q),onClick(t){
P||"function"!=typeof R||R(t),P&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!L||t.defaultPrevented||function(t,r,i,n,s,a,o,c="none"){
if("u">typeof window){
let u,{
nodeName:d
}
=t.currentTarget;
if("A"===d.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){
n&&(t.preventDefault(),location.replace(r));
return
}
if(t.preventDefault(),a){
let e=!1;
if(a({
preventDefault:()=>{
e=!0
}

}
),e)return
}
let{
dispatchNavigateAction:h
}
=e.r(99781);
l.default.startTransition(()=>{
h(r,n?"replace":"push",!1===s?f.ScrollBehavior.NoScroll:f.ScrollBehavior.Default,i.current,o,c)
}
)
}

}
(t,F,v,C,k,I,_,W)
}
,onMouseEnter(e){
P||"function"!=typeof M||M(e),P&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),L&&D&&(0,A.onNavigationIntent)(e.currentTarget,!0===z)
}
,onTouchStart:function(e){
P||"function"!=typeof T||T(e),P&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),L&&D&&(0,A.onNavigationIntent)(e.currentTarget,!0===z)
}

}
;
return(0,d.isAbsoluteUrl)(F)?Y.href=F:P&&!S&&("a"!==n.type||"href"in n.props)||(Y.href=(0,h.addBasePath)(F)),s=P?l.default.cloneElement(n,Y):(0,a.jsx)("a",{
...O,...Y,children:i
}
),(0,a.jsx)(x.Provider,{
value:g,children:s
}
)
}
let x=(0,l.createContext)(A.IDLE_LINK_STATUS),w=()=>(0,l.useContext)(x);
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{
value:!0
}
),Object.assign(r.default,r),t.exports=r.default)
}
,85437,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"Image",{
enumerable:!0,get:function(){
return b
}

}
);let i=e.r(55682),n=e.r(90809),s=e.r(43476),a=n._(e.r(71645)),l=i._(e.r(74080)),o=i._(e.r(25633)),c=e.r(8927),u=e.r(87690),d=e.r(18556),h=e.r(65856),f=i._(e.r(1948)),A=e.r(18581),m={
deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0
}
;
function p(e,t,r,i,n,s,a){
let l=e?.src;
e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{

}
).then(()=>{
if(e.parentElement&&e.isConnected){
if("empty"!==t&&n(!0),r?.current){
let t=new Event("load");
Object.defineProperty(t,"target",{
writable:!1,value:e
}
);
let i=!1,n=!1;
r.current({
...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>n,persist:()=>{

}
,preventDefault:()=>{
i=!0,t.preventDefault()
}
,stopPropagation:()=>{
n=!0,t.stopPropagation()
}

}
)
}
i?.current&&i.current(e)
}

}
))
}
function g(e){
return a.use?{
fetchPriority:e
}
:{
fetchpriority:e
}

}
"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);
let x="u"<typeof window?a.useEffect:a.useLayoutEffect,w=(0,a.forwardRef)(({
src:e,srcSet:t,sizes:r,height:i,width:n,decoding:l,className:o,style:c,fetchPriority:u,placeholder:d,loading:h,unoptimized:f,fill:m,onLoadRef:w,onLoadingCompleteRef:v,setBlurComplete:b,setShowAltText:y,sizesInput:j,onLoad:E,onError:S,...C
}
,N)=>{
let k=(0,a.useRef)(!1),R=(0,a.useRef)(null);x(()=>{
let{
current:e
}
=k,{
current:t
}
=R;
e||null===t||(S&&(t.src=t.src),t.complete&&p(t,d,w,v,b,f,j),k.current=!0)
}
,[e,d,w,v,S,f,j]);
let M=(0,A.useMergedRef)(N,R);return(0,s.jsx)("img",{
...C,...g(u),loading:h,width:n,height:i,decoding:l,"data-nimg":m?"fill":"1",className:o,style:c,sizes:r,srcSet:t,src:e,ref:M,onLoad:e=>{
p(e.currentTarget,d,w,v,b,f,j)
}
,onError:e=>{
y(!0),"empty"!==d&&b(!0),S&&S(e)
}

}
)
}
);
function v({
isAppRouter:e,imgAttributes:t
}
){
let r={
as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)
}
;
return e&&l.default.preload?(l.default.preload(t.src,r),null):(0,s.jsx)(o.default,{
children:(0,s.jsx)("link",{
rel:"preload",href:t.srcSet?void 0:t.src,...r
}
,"__nimg-"+t.src+t.srcSet+t.sizes)
}
)
}
let b=(0,a.forwardRef)((e,t)=>{
let r=(0,a.useContext)(h.RouterContext),i=(0,a.useContext)(d.ImageConfigContext),n=(0,a.useMemo)(()=>{
let e=m||i||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),n=e.qualities?.sort((e,t)=>e-t);
return{
...e,allSizes:t,deviceSizes:r,qualities:n,localPatterns:"u"<typeof window?i?.localPatterns:e.localPatterns
}

}
,[i]),{
onLoad:l,onLoadingComplete:o
}
=e,A=(0,a.useRef)(l);(0,a.useEffect)(()=>{
A.current=l
}
,[l]);let p=(0,a.useRef)(o);(0,a.useEffect)(()=>{
p.current=o
}
,[o]);
let[g,x]=(0,a.useState)(!1),[b,y]=(0,a.useState)(!1),{
props:j,meta:E
}
=(0,c.getImgProps)(e,{
defaultLoader:f.default,imgConf:n,blurComplete:g,showAltText:b
}
);return(0,s.jsxs)(s.Fragment,{
children:[(0,s.jsx)(w,{
...j,unoptimized:E.unoptimized,placeholder:E.placeholder,fill:E.fill,onLoadRef:A,onLoadingCompleteRef:p,setBlurComplete:x,setShowAltText:y,sizesInput:e.sizes,ref:t
}
),E.preload?(0,s.jsx)(v,{
isAppRouter:!r,imgAttributes:j
}
):null]
}
)
}
);
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{
value:!0
}
),Object.assign(r.default,r),t.exports=r.default)
}
,94909,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
default:function(){
return u
}
,getImageProps:function(){
return c
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);let s=e.r(55682),a=e.r(8927),l=e.r(85437),o=s._(e.r(1948));function c(e){
let{
props:t
}
=(0,a.getImgProps)(e,{
defaultLoader:o.default,imgConf:{
deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0
}

}
);
for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];
return{
props:t
}

}
let u=l.Image
}
,57688,(e,t,r)=>{
t.exports=e.r(94909)
}
,18581,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"useMergedRef",{
enumerable:!0,get:function(){
return n
}

}
);let i=e.r(71645);function n(e,t){
let r=(0,i.useRef)(null),n=(0,i.useRef)(null);
return(0,i.useCallback)(i=>{
if(null===i){
let e=r.current;
e&&(r.current=null,e());
let t=n.current;
t&&(n.current=null,t())
}
else e&&(r.current=s(e,i)),t&&(n.current=s(t,i))
}
,[e,t])
}
function s(e,t){
if("function"!=typeof e)return e.current=t,()=>{
e.current=null
}
;{
let r=e(t);
return"function"==typeof r?r:()=>e(null)
}

}
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{
value:!0
}
),Object.assign(r.default,r),t.exports=r.default)
}
,90317,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
bindSnapshot:function(){
return c
}
,createAsyncLocalStorage:function(){
return o
}
,createSnapshot:function(){
return u
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);
let s=Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),"__NEXT_ERROR_CODE",{
value:"E504",enumerable:!1,configurable:!0
}
);class a{
disable(){
throw s
}
getStore(){

}
run(){
throw s
}
exit(){
throw s
}
enterWith(){
throw s
}
static bind(e){
return e
}

}
let l="u">typeof globalThis&&globalThis.AsyncLocalStorage;function o(){
return l?new l:new a
}
function c(e){
return l?l.bind(e):a.bind(e)
}
function u(){
return l?l.snapshot():function(e,...t){
return e(...t)
}

}

}
,42344,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"workAsyncStorageInstance",{
enumerable:!0,get:function(){
return i
}

}
);let i=(0,e.r(90317).createAsyncLocalStorage)()
}
,63599,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"workAsyncStorage",{
enumerable:!0,get:function(){
return i.workAsyncStorageInstance
}

}
);let i=e.r(42344)
}
,9885,(e,t,r)=>{
"use strict";function i(e){
return e.split("/").map(e=>encodeURIComponent(e)).join("/")
}
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"encodeURIPath",{
enumerable:!0,get:function(){
return i
}

}
)
}
,25633,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
default:function(){
return m
}
,defaultHead:function(){
return d
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);let s=e.r(55682),a=e.r(90809),l=e.r(43476),o=a._(e.r(71645)),c=s._(e.r(98879)),u=e.r(42732);function d(){
return[(0,l.jsx)("meta",{
charSet:"utf-8"
}
,"charset"),(0,l.jsx)("meta",{
name:"viewport",content:"width=device-width"
}
,"viewport")]
}
function h(e,t){
return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)
}
let f=["name","httpEquiv","charSet","itemProp"];function A(e){
let t,r,i,n;return e.reduce(h,[]).reverse().concat(d().reverse()).filter((t=new Set,r=new Set,i=new Set,n={

}
,e=>{
let s=!0,a=!1;
if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){
a=!0;
let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?s=!1:t.add(r)
}
switch(e.type){
case"title":case"base":r.has(e.type)?s=!1:r.add(e.type);
break;
case"meta":for(let t=0,r=f.length;t<r;t++){
let r=f[t];
if(e.props.hasOwnProperty(r))if("charSet"===r)i.has(r)?s=!1:i.add(r);
else{
let t=e.props[r],i=n[r]||new Set;("name"!==r||!a)&&i.has(t)?s=!1:(i.add(t),n[r]=i)
}

}

}
return s
}
)).reverse().map((e,t)=>{
let r=e.key||t;
return o.default.cloneElement(e,{
key:r
}
)
}
)
}
let m=function({
children:e
}
){
let t=(0,o.useContext)(u.HeadManagerContext);return(0,l.jsx)(c.default,{
reduceComponentsToState:A,headManager:t,children:e
}
)
}
;
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{
value:!0
}
),Object.assign(r.default,r),t.exports=r.default)
}
,18556,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"ImageConfigContext",{
enumerable:!0,get:function(){
return s
}

}
);let i=e.r(55682)._(e.r(71645)),n=e.r(87690),s=i.default.createContext(n.imageConfigDefault)
}
,65856,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"RouterContext",{
enumerable:!0,get:function(){
return i
}

}
);let i=e.r(55682)._(e.r(71645)).default.createContext(null)
}
,70965,(e,t,r)=>{
"use strict";function i(e,t){
let r=e||75;
return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,t.qualities[0]):r
}
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"findClosestQuality",{
enumerable:!0,get:function(){
return i
}

}
)
}
,1948,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"default",{
enumerable:!0,get:function(){
return a
}

}
);let i=e.r(70965),n=e.r(43369);
function s({
config:e,src:t,width:r,quality:a
}
){
let l=(0,n.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//"))if(t.includes("/_next/static/immutable")&&!(0,n.getAssetToken)())l=void 0;
else{
let e=t.indexOf("?");if(-1!==e){
let r=new URLSearchParams(t.slice(e+1)),i=r.get("dpl");if(i){
l=i,r.delete("dpl");let n=r.toString();t=t.slice(0,e)+(n?"?"+n:"")
}

}

}
if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${
t
}
" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{
value:"E871",enumerable:!1,configurable:!0
}
);
let o=(0,i.findClosestQuality)(a,e);
return`${
e.path
}
?url=${
encodeURIComponent(t)
}
&w=${
r
}
&q=${
o
}
${
t.startsWith("/")&&l?`&dpl=${
l
}
`:""
}
`
}
s.__next_img_default=!0;
let a=s
}
,88143,(e,t,r)=>{
"use strict";
function i({
widthInt:e,heightInt:t,blurWidth:r,blurHeight:n,blurDataURL:s,objectFit:a
}
){
let l=r?40*r:e,o=n?40*n:t,c=l&&o?`viewBox='0 0 ${
l
}
 ${
o
}
'`:"";
return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${
c
}
%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${
c?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none"
}
' style='filter: url(%23b);
' href='${
s
}
'/%3E%3C/svg%3E`
}
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"getImageBlurSvg",{
enumerable:!0,get:function(){
return i
}

}
)
}
,87690,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
VALID_LOADERS:function(){
return s
}
,imageConfigDefault:function(){
return a
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);
let s=["default","imgix","cloudinary","akamai","custom"],a={
deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none';
 frame-src 'none';
 sandbox;
",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1
}

}
,8927,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"getImgProps",{
enumerable:!0,get:function(){
return c
}

}
);let i=e.r(43369),n=e.r(88143),s=e.r(87690),a=["-moz-initial","fill","none","scale-down",void 0];function l(e){
return void 0!==e.default
}
function o(e){
return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN
}
function c({
src:e,sizes:t,unoptimized:r=!1,priority:u=!1,preload:d=!1,loading:h,className:f,quality:A,width:m,height:p,fill:g=!1,style:x,overrideSrc:w,onLoad:v,onLoadingComplete:b,placeholder:y="empty",blurDataURL:j,fetchPriority:E,decoding:S="async",layout:C,objectFit:N,objectPosition:k,lazyBoundary:R,lazyRoot:M,...T
}
,P){
var I;
let _,B,z,{
imgConf:O,showAltText:L,blurComplete:D,defaultLoader:W
}
=P,q=O||s.imageConfigDefault;if("allSizes"in q)_=q;
else{
let e=[...q.deviceSizes,...q.imageSizes].sort((e,t)=>e-t),t=q.deviceSizes.sort((e,t)=>e-t),r=q.qualities?.sort((e,t)=>e-t);
_={
...q,allSizes:e,deviceSizes:t,qualities:r
}

}
if(void 0===W)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{
value:"E163",enumerable:!1,configurable:!0
}
);
let F=T.loader||W;
delete T.loader,delete T.srcSet;
let Q="__next_img_default"in F;if(Q){
if("custom"===_.loader)throw Object.defineProperty(Error(`Image with src "${
e
}
" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{
value:"E252",enumerable:!1,configurable:!0
}
)
}
else{
let e=F;
F=t=>{
let{
config:r,...i
}
=t;return e(i)
}

}
if(C){
"fill"===C&&(g=!0);
let e={
intrinsic:{
maxWidth:"100%",height:"auto"
}
,responsive:{
width:"100%",height:"auto"
}

}
[C];e&&(x={
...x,...e
}
);
let r={
responsive:"100vw",fill:"100vw"
}
[C];r&&!t&&(t=r)
}
let U="",H=o(m),Y=o(p);if((I=e)&&"object"==typeof I&&(l(I)||void 0!==I.src)){
let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${
JSON.stringify(t)
}
`),"__NEXT_ERROR_CODE",{
value:"E460",enumerable:!1,configurable:!0
}
);
if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${
JSON.stringify(t)
}
`),"__NEXT_ERROR_CODE",{
value:"E48",enumerable:!1,configurable:!0
}
);
if(B=t.blurWidth,z=t.blurHeight,j=j||t.blurDataURL,U=t.src,!g)if(H||Y){
if(H&&!Y){
let e=H/t.width;
Y=Math.round(t.height*e)
}
else if(!H&&Y){
let e=Y/t.height;
H=Math.round(t.width*e)
}

}
else H=t.width,Y=t.height
}
let G=!u&&!d&&("lazy"===h||void 0===h);
(!(e="string"==typeof e?e:U)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,G=!1),_.unoptimized&&(r=!0),Q&&!_.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let X=o(A),$=Object.assign(g?{
position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:N,objectPosition:k
}
:{

}
,L?{

}
:{
color:"transparent"
}
,x),V=D||"empty"===y?null:"blur"===y?`url("data:image/svg+xml;
charset=utf-8,${
(0,n.getImageBlurSvg)({
widthInt:H,heightInt:Y,blurWidth:B,blurHeight:z,blurDataURL:j||"",objectFit:$.objectFit
}
)
}
")`:`url("${
y
}
")`,J=a.includes($.objectFit)?"fill"===$.objectFit?"100% 100%":"cover":$.objectFit,K=V?{
backgroundSize:J,backgroundPosition:$.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:V
}
:{

}
,Z=function({
config:e,src:t,unoptimized:r,width:n,quality:s,sizes:a,loader:l
}
){
if(r){
if(t.startsWith("/")&&!t.startsWith("//")){
let e=(0,i.getDeploymentId)();
if(t.includes("/_next/static/immutable")&&!(0,i.getAssetToken)())e=void 0;else if(e){
let r=t.indexOf("?");if(-1!==r){
let i=new URLSearchParams(t.slice(r+1));i.get("dpl")||(i.append("dpl",e),t=t.slice(0,r)+"?"+i.toString())
}
else t+=`?dpl=${
e
}
`
}

}
return{
src:t,srcSet:void 0,sizes:void 0
}

}
let{
widths:o,kind:c
}
=function({
deviceSizes:e,allSizes:t
}
,r,i){
if(i){
let r=/(^|\s)(1?\d?\d)vw/g,n=[];for(let e;e=r.exec(i);)n.push(parseInt(e[2]));if(n.length){
let r=.01*Math.min(...n);
return{
widths:t.filter(t=>t>=e[0]*r),kind:"w"
}

}
return{
widths:t,kind:"w"
}

}
return"number"!=typeof r?{
widths:e,kind:"w"
}
:{
widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"
}

}
(e,n,a),u=o.length-1;
return{
sizes:a||"w"!==c?a:"100vw",srcSet:o.map((r,i)=>`${
l({
config:e,src:t,quality:s,width:r
}
)
}
 ${
"w"===c?r:i+1
}
${
c
}
`).join(", "),src:l({
config:e,src:t,quality:s,width:o[u]
}
)
}

}
({
config:_,src:e,unoptimized:r,width:H,quality:X,sizes:t,loader:F
}
),ee=G?"lazy":h;
return{
props:{
...T,loading:ee,fetchPriority:E,width:H,height:Y,decoding:S,className:f,style:{
...$,...K
}
,sizes:Z.sizes,srcSet:Z.srcSet,src:w||Z.src
}
,meta:{
unoptimized:r,preload:d||u,placeholder:y,fill:g
}

}

}

}
,67585,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"BailoutToCSR",{
enumerable:!0,get:function(){
return n
}

}
);let i=e.r(32061);
function n({
reason:e,children:t
}
){
if("u"<typeof window)throw Object.defineProperty(new i.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{
value:"E394",enumerable:!1,configurable:!0
}
);
return t
}

}
,69093,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"default",{
enumerable:!0,get:function(){
return c
}

}
);let i=e.r(43476),n=e.r(71645),s=e.r(67585),a=e.r(52157);function l(e){
return{
default:e&&"default"in e?e.default:e
}

}
let o={
loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0
}
,c=function(e){
let t={
...o,...e
}
,r=(0,n.lazy)(()=>t.loader().then(l)),c=t.loading;function u(e){
let l=c?(0,i.jsx)(c,{
isLoading:!0,pastDelay:!0,error:null
}
):null,o=!t.ssr||!!t.loading,u=o?n.Suspense:n.Fragment,d=t.ssr?(0,i.jsxs)(i.Fragment,{
children:["u"<typeof window?(0,i.jsx)(a.PreloadChunks,{
moduleIds:t.modules
}
):null,(0,i.jsx)(r,{
...e
}
)]
}
):(0,i.jsx)(s.BailoutToCSR,{
reason:"next/dynamic",children:(0,i.jsx)(r,{
...e
}
)
}
);return(0,i.jsx)(u,{
...o?{
fallback:l
}
:{

}
,children:d
}
)
}
return u.displayName="LoadableComponent",u
}

}
,70703,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"default",{
enumerable:!0,get:function(){
return n
}

}
);let i=e.r(55682)._(e.r(69093));function n(e,t){
let r={

}
;
"function"==typeof e&&(r.loader=e);
let n={
...r,...t
}
;return(0,i.default)({
...n,modules:n.loadableGenerated?.modules
}
)
}
("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{
value:!0
}
),Object.assign(r.default,r),t.exports=r.default)
}
,52157,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"PreloadChunks",{
enumerable:!0,get:function(){
return o
}

}
);let i=e.r(43476),n=e.r(74080),s=e.r(63599),a=e.r(9885),l=e.r(43369);
function o({
moduleIds:e
}
){
if("u">typeof window)return null;
let t=s.workAsyncStorage.getStore();if(void 0===t)return null;
let r=[];
if(t.reactLoadableManifest&&e){
let i=t.reactLoadableManifest;for(let t of e){
if(!i[t])continue;
let e=i[t].files;r.push(...e)
}

}
if(0===r.length)return null;
let c=(0,l.getAssetTokenQuery)();return(0,i.jsx)(i.Fragment,{
children:r.map(e=>{
let r=`${
t.assetPrefix
}
/_next/${
(0,a.encodeURIPath)(e)
}
${
c
}
`;
return e.endsWith(".css")?(0,i.jsx)("link",{
precedence:"dynamic",href:r,rel:"stylesheet",as:"style",nonce:t.nonce
}
,e):((0,n.preload)(r,{
as:"script",fetchPriority:"low",nonce:t.nonce
}
),null)
}
)
}
)
}

}
,73668,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"isLocalURL",{
enumerable:!0,get:function(){
return s
}

}
);let i=e.r(18967),n=e.r(52817);function s(e){
if(!(0,i.isAbsoluteUrl)(e))return!0;
try{
let t=(0,i.getLocationOrigin)(),r=new URL(e,t);
return r.origin===t&&(0,n.hasBasePath)(r.pathname)
}
catch(e){
return!1
}

}

}
,98183,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
assign:function(){
return o
}
,searchParamsToUrlQuery:function(){
return s
}
,urlQueryToSearchParams:function(){
return l
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);function s(e){
let t={

}
;
for(let[r,i]of e.entries()){
let e=t[r];
void 0===e?t[r]=i:Array.isArray(e)?e.push(i):t[r]=[e,i]
}
return t
}
function a(e){
return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)
}
function l(e){
let t=new URLSearchParams;
for(let[r,i]of Object.entries(e))if(Array.isArray(i))for(let e of i)t.append(r,a(e));else t.set(r,a(i));
return t
}
function o(e,...t){
for(let r of t){
for(let t of r.keys())e.delete(t);
for(let[t,i]of r.entries())e.append(t,i)
}
return e
}

}
,95057,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
formatUrl:function(){
return l
}
,formatWithValidation:function(){
return c
}
,urlObjectKeys:function(){
return o
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);let s=e.r(90809)._(e.r(98183)),a=/https?|ftp|gopher|file/;function l(e){
let{
auth:t,hostname:r
}
=e,i=e.protocol||"",n=e.pathname||"",l=e.hash||"",o=e.query||"",c=!1;
t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${
r
}
]`:r),e.port&&(c+=":"+e.port)),o&&"object"==typeof o&&(o=String(s.urlQueryToSearchParams(o)));
let u=e.search||o&&`?${
o
}
`||"";
return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||a.test(i))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),u&&"?"!==u[0]&&(u="?"+u),n=n.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${
i
}
${
c
}
${
n
}
${
u
}
${
l
}
`
}
let o=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){
return l(e)
}

}
,98879,(e,t,r)=>{
"use strict";
Object.defineProperty(r,"__esModule",{
value:!0
}
),Object.defineProperty(r,"default",{
enumerable:!0,get:function(){
return l
}

}
);let i=e.r(71645),n="u"<typeof window,s=n?()=>{

}
:i.useLayoutEffect,a=n?()=>{

}
:i.useEffect;function l(e){
let{
headManager:t,reduceComponentsToState:r
}
=e;function l(){
if(t&&t.mountedInstances){
let e=i.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))
}

}
return n&&(t?.mountedInstances?.add(e.children),l()),s(()=>(t?.mountedInstances?.add(e.children),()=>{
t?.mountedInstances?.delete(e.children)
}
)),s(()=>(t&&(t._pendingUpdate=l),()=>{
t&&(t._pendingUpdate=l)
}
)),a(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{
t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)
}
)),null
}

}
,18967,(e,t,r)=>{
"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{
value:!0
}
);
var i={
DecodeError:function(){
return g
}
,MiddlewareNotFoundError:function(){
return b
}
,MissingStaticPage:function(){
return v
}
,NormalizeError:function(){
return x
}
,PageNotFoundError:function(){
return w
}
,SP:function(){
return m
}
,ST:function(){
return p
}
,WEB_VITALS:function(){
return s
}
,execOnce:function(){
return a
}
,getDisplayName:function(){
return d
}
,getLocationOrigin:function(){
return c
}
,getURL:function(){
return u
}
,isAbsoluteUrl:function(){
return o
}
,isResSent:function(){
return h
}
,loadGetInitialProps:function(){
return A
}
,normalizeRepeatedSlashes:function(){
return f
}
,stringifyError:function(){
return y
}

}
;for(var n in i)Object.defineProperty(r,n,{
enumerable:!0,get:i[n]
}
);
let s=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){
let t,r=!1;return(...i)=>(r||(r=!0,t=e(...i)),t)
}
let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,o=e=>{
let t=e.charCodeAt(0);
return!!(t>=65&&t<=90||t>=97&&t<=122)&&l.test(e)
}
;function c(){
let{
protocol:e,hostname:t,port:r
}
=window.location;
return`${
e
}
//${
t
}
${
r?":"+r:""
}
`
}
function u(){
let{
href:e
}
=window.location,t=c();
return e.substring(t.length)
}
function d(e){
return"string"==typeof e?e:e.displayName||e.name||"Unknown"
}
function h(e){
return e.finished||e.headersSent
}
function f(e){
let t=e.split("?");
return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${
t.slice(1).join("?")
}
`:"")
}
async function A(e,t){
let r=t.res||t.ctx&&t.ctx.res;
if(!e.getInitialProps)return t.ctx&&t.Component?{
pageProps:await A(t.Component,t.ctx)
}
:{

}
;
let i=await e.getInitialProps(t);if(r&&h(r))return i;if(!i)throw Object.defineProperty(Error(`"${
d(e)
}
.getInitialProps()" should resolve to an object. But found "${
i
}
" instead.`),"__NEXT_ERROR_CODE",{
value:"E1025",enumerable:!1,configurable:!0
}
);
return i
}
let m="u">typeof performance,p=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);
class g extends Error{

}
class x extends Error{

}
class w extends Error{
constructor(e){
super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${
e
}
`
}

}
class v extends Error{
constructor(e,t){
super(),this.message=`Failed to load static file for page: ${
e
}
 ${
t
}
`
}

}
class b extends Error{
constructor(){
super(),this.code="ENOENT",this.message="Cannot find the middleware module"
}

}
function y(e){
return JSON.stringify({
message:e.message,stack:e.stack
}
)
}

}
,11774,e=>{
e.q("/_next/static/media/clients-1.2x6o6jq8f5_bm.webp")
}
,41267,e=>{
e.q("/_next/static/media/clients-2.1l6jm5-3cnwvg.webp")
}
,3722,e=>{
e.q("/_next/static/media/clients-3.0-x8av3q__ih4.webp")
}
,51197,e=>{
e.q("/_next/static/media/clients-4.1tgn231h0a-zf.webp")
}
,92506,e=>{
e.q("/_next/static/media/clients-5.1h0spsdpfo9zr.webp")
}
,33495,e=>{
e.q("/_next/static/media/clients-6.1_xtm6aakyuxq.webp")
}
,61043,e=>{
e.q("/_next/static/media/elena-voss.1bwgasvm4oh6t.svg")
}
,68993,e=>{
"use strict";let t={
src:e.i(61043).default,width:445,height:77,blurWidth:0,blurHeight:0
}
;e.s(["default",0,t])
}
,41683,e=>{
e.q("/_next/static/media/facebook.28b69odb44qoi.svg")
}
,2130,e=>{
e.q("/_next/static/media/footer-bg.2y6ggh6bp2suk.svg")
}
,41543,e=>{
e.q("/_next/static/media/hero-bg-full-img.0ymicntlhm1vj.webp")
}
,93075,e=>{
e.q("/_next/static/media/instagram.44_o2mpfxt9wp.svg")
}
,39860,e=>{
e.q("/_next/static/media/linkedIn.3zxx2oqth41cz.svg")
}
,36290,e=>{
e.q("/_next/static/media/portfolio-img-1.006uvpvyjl7kz.webp")
}
,55702,53649,75241,9921,e=>{
"use strict";let t={
src:e.i(36290).default,width:1920,height:1080,blurWidth:8,blurHeight:5,blurDataURL:"data:image/webp;
base64,UklGRuIAAABXRUJQVlA4TNYAAAAvBwABAM1VICICHgiACQMAAADrFsIPzBWNAMIBAAAAAAAAAAAAAAAAAAABEA4AAAAgwDk/AUCJJQAAgAeCdgIBAABw/u8XKIBwIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBG7arZsHgnYCAQAAcP5vqw4ScIADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANN1V+ZC1LCwVTenqWWuEWPhdEhwYCpWV+Zpr/PfzH3rQvbWAS7/meaEH+EAqSlxDH7ztMvELvZgBhbchGXt5djP3f"
}
;
e.s(["default",0,t],55702);let r={
src:e.i(71512).default,width:1920,height:1080,blurWidth:8,blurHeight:5,blurDataURL:"data:image/webp;
base64,UklGRuAAAABXRUJQVlA4TNMAAAAvBwABAM1VICICHgiACQMAAIAN1CZNEAcABAAAAAAAAAAAAAAIAAAAAAAAAAAEUAQACEAooqcAAAB4IAAnEAAAAOe/Af62W0nlAxEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAyDwTYBAAAAOD8FwACAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqkLVt6Ei4y2QQAEqUD4kQNMfmWB2s5khhrWbIHlNnI4hDEuaiP0vtYc/9UHn0yCnaZmonrD6N2cbOzeWflN1Leow6LsCAA=="
}
;
e.s(["default",0,r],53649);let i={
src:e.i(14915).default,width:1920,height:1136,blurWidth:8,blurHeight:5,blurDataURL:"data:image/webp;
base64,UklGRugAAABXRUJQVlA4TNwAAAAvBwABAM1VICICHgiACQMAAIDawAgAAAAAAAAAAAAAAAAAAAAAACAAcBDgBfroIAAwflwOFxQgOwAAgAcCcAIBAABw/ruyX+nh4QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARa2VUeCMAJBAAAwPnvtqoFBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHhektZa5EexIMSzCE0BAiX/gtD77nrYLe33oE3AkXm0Qe7Jk2sGzlUjWepqB/iP9/vumWuUsTF3kivu2Y/ZVczo0+xUjNSXHXgn"
}
;
e.s(["default",0,i],75241);let n={
src:e.i(24374).default,width:1920,height:1080,blurWidth:8,blurHeight:5,blurDataURL:"data:image/webp;
base64,UklGRt4AAABXRUJQVlA4TNEAAAAvBwABAM1VICICHgiADQIAAIA5HDSC/Q4AeAAAAAJAAIADAAAAAAAAAAAAAAEAAEAc3oHjTgRLWgMAAPBACE4AAAAAzv9eCwEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAEI0DwQEhQEAAOD8761sAEIAFAAAAAACAAAAAAAAAAAAAAAAAMAAAAAAmAGAIij47yMDFAbIbThbDKUeM3egsFrpz4V64UrG/rpd2vP9v/PC64wfR8rtEVJX3XdrMw08EJeSKecdkeveymIMAAA="
}
;
e.s(["default",0,n],9921)
}
,71512,e=>{
e.q("/_next/static/media/portfolio-img-2.2ys49j7gkfz7j.webp")
}
,14915,e=>{
e.q("/_next/static/media/portfolio-img-3.04bada5ydkt1h.webp")
}
,24374,e=>{
e.q("/_next/static/media/portfolio-img-4.0wnkqlz-f5rcj.webp")
}
,11936,e=>{
e.q("/_next/static/media/testimonial-1.1n9zd7_gpp9li.webp")
}
,38186,e=>{
e.q("/_next/static/media/testimonial-2.2mihuvuv56utd.webp")
}
,41575,e=>{
e.q("/_next/static/media/testimonial-3.25i3vd2ma4kps.webp")
}
,66073,e=>{
e.q("/_next/static/media/testimonial-4.0mqg9hibqoxgk.webp")
}
,89439,e=>{
e.q("/_next/static/media/testimonial-5.1p4twu_lvqrj9.webp")
}
,79768,e=>{
e.q("/_next/static/media/twitter.0pg43yq6t12uk.svg")
}
,15278,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(57688),n=e.i(89970),s=e.i(33809),a=e.i(55702),l=e.i(53649),o=e.i(75241),c=e.i(9921),u=e.i(79921);
let d=null,h=null,f=null,A=[146.83,164.81,196,220,261.63,293.66,329.63,392],m=[{
frequency:100,q:1.2,gain:.5
}
,{
frequency:220,q:2,gain:.3
}
],p=0,g=function({
strokeColor:e="#111111",strokeWidth:i=2,sound:n=!0
}
){
let s=(0,r.useRef)(null),a=(0,r.useRef)(null),l=(0,r.useRef)(0),o=(0,r.useRef)(null),c=(0,r.useRef)(Math.PI/2),[u,g]=(0,r.useState)(!1);(0,r.useEffect)(()=>{
let e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=window.requestAnimationFrame(()=>g(e.matches)),r=e=>g(e.matches);
return e.addEventListener("change",r),()=>{
window.cancelAnimationFrame(t),e.removeEventListener("change",r)
}

}
,[]);
let x=e=>{
let t=a.current,r=s.current;if(!t||!r)return;
let i=r.offsetWidth;
t.setAttributeNS(null,"d",`M 0 50 Q ${
.5*i
}
 ${
50+e
}
 ${
i
}
 50`)
}
;(0,r.useEffect)(()=>{
x(u?0:l.current);let e=()=>x(u?0:l.current);
return window.addEventListener("resize",e),()=>{
window.removeEventListener("resize",e),null!=o.current&&cancelAnimationFrame(o.current)
}

}
,[u]);let w=()=>{
null!=o.current&&(cancelAnimationFrame(o.current),c.current=Math.PI/2),o.current=requestAnimationFrame(w)
}
,v=()=>{
x(l.current*Math.sin(c.current)),l.current=.95*l.current+0,c.current+=.5,Math.abs(l.current)>.1?o.current=requestAnimationFrame(v):(c.current=Math.PI/2,l.current=0)
}
;return(0,t.jsx)("div",{
ref:s,className:"w-full",children:(0,t.jsxs)("div",{
className:"string-line lineDraw",children:[(0,t.jsx)("span",{
onMouseEnter:u?void 0:w,onMouseLeave:u?void 0:()=>{
null!=o.current&&cancelAnimationFrame(o.current),n&&function(e){
let t=function(){
if(!d){
let e=window.AudioContext??window.webkitAudioContext;if(!e)return null;!function(e){
(h=e.createGain()).gain.value=1;
let t=e.createDynamicsCompressor();
t.threshold.value=-14,t.knee.value=12,t.ratio.value=4,t.attack.value=.006,t.release.value=.22,h.connect(t),t.connect(e.destination);
let r=Math.floor(2.2*e.sampleRate),i=e.createBuffer(2,r,e.sampleRate);for(let e=0;e<2;e+=1){
let t=i.getChannelData(e);for(let e=0;e<r;e+=1){
let i=e/r;t[e]=(2*Math.random()-1)*Math.pow(1-i,1.8)
}

}
let n=e.createConvolver();
n.buffer=i,(f=e.createGain()).gain.value=.42,f.connect(n),n.connect(h)
}
(d=new e)
}
return"suspended"===d.state&&d.resume(),d
}
();if(!t||!h||!f)return;
let r=Math.min(Math.abs(e)/60,1);if(r<.05)return;
p=(p+1+Math.floor(2*Math.random()))%A.length;
let i=1+(2*Math.random()-1)*.004,n=A[p]*i,s=t.sampleRate,a=Math.max(2,Math.floor(s/n)),l=Math.floor(3.2*s),o=t.createBuffer(1,l,s),c=o.getChannelData(0),u=new Float32Array(a),g=0,x=.1+.12*r;for(let e=0;e<a;e+=1){
let t=2*Math.random()-1;g+=(t-g)*x;
let r=Math.min(1,e/(.4*a));
u[e]=g*r
}
let w=.996-(1-r)*.003,v=0,b=0;for(let e=0;e<l;e+=1){
let t=u[v],r=.75*((t+u[(v+1)%a])*.5)+.25*b;
b=r,u[v]=r*w,c[e]=t,v=(v+1)%a
}
let y=t.createBufferSource();
y.buffer=o;
let j=t.createBiquadFilter();
j.type="lowpass",j.frequency.value=750+700*r,j.Q.value=.5;
let E=t.createBiquadFilter();
E.type="highpass",E.frequency.value=70,y.connect(j),j.connect(E);let S=t.createGain();
S.gain.value=1,E.connect(S),m.forEach(({
frequency:e,q:r,gain:i
}
)=>{
let n=t.createBiquadFilter();
n.type="bandpass",n.frequency.value=e,n.Q.value=r;let s=t.createGain();
s.gain.value=i,E.connect(n),n.connect(s),s.connect(S)
}
);let C=t.createGain(),N=.16+.33999999999999997*r,k=t.currentTime;
C.gain.setValueAtTime(1e-4,k),C.gain.exponentialRampToValueAtTime(N,k+.025),C.gain.exponentialRampToValueAtTime(.45*N,k+.6),C.gain.exponentialRampToValueAtTime(1e-4,k+3.2),S.connect(C);
let R=t.createStereoPanner?.();
R?(R.pan.value=(2*Math.random()-1)*.35,C.connect(R),R.connect(h),R.connect(f)):(C.connect(h),C.connect(f)),y.start(k),y.stop(k+3.2),y.onended=()=>{
y.disconnect(),j.disconnect(),E.disconnect(),S.disconnect(),C.disconnect(),R?.disconnect()
}

}
(l.current),v()
}
,onMouseMove:u?void 0:e=>{
l.current+=e.movementY/2,x(l.current)
}
,className:"box"
}
),(0,t.jsx)("svg",{
width:"100%",height:100,children:(0,t.jsx)("path",{
ref:a,strokeWidth:i,fill:"none",style:{
stroke:e
}

}
)
}
)]
}
)
}
)
}
;
n.default.registerPlugin(s.default);
let x=[{
title:"Honorable Mention",meta:"2026 - AWWARDS",imgSrc:a.default
}
,{
title:"Site of the Day",meta:"2026 - AWWARDS",imgSrc:l.default
}
,{
title:"The Webby Awards",meta:"2026 - OFFICIAL SELECTION",imgSrc:o.default
}
,{
title:"FWA",meta:"2026 - FWA OF THE DAY",imgSrc:c.default
}
];e.s(["default",0,()=>{
let e=(0,r.useRef)(null),s=(0,r.useRef)(null),a=(0,r.useRef)([]),l=(0,r.useRef)([]),o=(0,r.useRef)([]),c=(0,r.useRef)(x.length),d=(0,r.useRef)(window.matchMedia("(prefers-reduced-motion: reduce)").matches),h=(0,r.useRef)(null),f=(0,r.useRef)(null);(0,r.useEffect)(()=>{
let e=window.matchMedia("(prefers-reduced-motion: reduce)");
d.current=e.matches;
let t=e=>{
d.current=e.matches
}
;
return e.addEventListener("change",t),()=>e.removeEventListener("change",t)
}
,[]),(0,r.useEffect)(()=>{
n.default.set(e.current,{
y:0
}
),n.default.set(a.current,{
opacity:1
}
),a.current.forEach((e,t)=>{
n.default.set(e,{
zIndex:t+1
}
)
}
),n.default.set(a.current[0],{
scale:1.05
}
),a.current.slice(1).forEach(e=>{
n.default.set(e,{
scale:0
}
)
}
)
}
,[]),(0,r.useEffect)(()=>{
let e=o.current.filter(Boolean);if(d.current)return void n.default.set(e,{
scaleX:1
}
);
let t=e.map(e=>n.default.to(e,{
scaleX:1,duration:.8,ease:"power2.inOut",scrollTrigger:{
trigger:e,start:"top 85%",toggleActions:"play none none none"
}

}
));return()=>{
t.forEach(e=>e.scrollTrigger?.kill()),t.forEach(e=>e.kill())
}

}
,[]);
let A=(0,r.useCallback)(t=>{
let r=l.current[t],i=e.current;if(r&&i){
let e=n.default.getProperty(i,"y"),t=i.getBoundingClientRect(),s=t.top+t.height/2-e,a=r.getBoundingClientRect(),l=a.top+a.height/2-s;
d.current?n.default.set(i,{
y:l
}
):n.default.to(i,{
y:l,duration:.65,ease:"back.out(1.6)"
}
)
}
let s=a.current[t];
s&&(c.current+=1,n.default.set(s,{
zIndex:c.current
}
),n.default.killTweensOf(s),d.current?n.default.set(s,{
scale:1.05
}
):(n.default.set(s,{
scale:0
}
),n.default.to(s,{
scale:1.05,duration:.45,ease:"power2.out"
}
)))
}
,[]),m=(0,r.useCallback)((e,t)=>{
let r=l.current,i=null;
for(let n=0;n<r.length;n+=1){
let s=r[n]?.getBoundingClientRect();
if(s&&t>=s.top&&t<s.bottom&&e>=s.left&&e<s.right){
i=n;
break
}

}
null!==i&&i!==h.current&&(h.current=i,A(i))
}
,[A]);return(0,r.useEffect)(()=>{
let e=e=>{
f.current={
x:e.clientX,y:e.clientY
}
,m(e.clientX,e.clientY)
}
;
return window.addEventListener("mousemove",e,{
passive:!0
}
),()=>window.removeEventListener("mousemove",e)
}
,[m]),(0,r.useEffect)(()=>{
let e=()=>{
let e=f.current;e&&m(e.x,e.y)
}
;
return window.addEventListener("scroll",e,{
passive:!0
}
),()=>window.removeEventListener("scroll",e)
}
,[m]),(0,t.jsx)("section",{
className:"relative w-screen bg-[#070707] text-white py-[7vw]",id:"awards",children:(0,t.jsxs)("div",{
className:"w-screen flex items-center px-[4vw] gap-[4vw]  max-[1025px]:px-[5vw]",children:[(0,t.jsxs)("div",{
className:"w-full",children:[(0,t.jsx)(u.default,{
stagger:.015,children:(0,t.jsxs)("h2",{
className:"text-[5.5vw] leading-[1.2]  mb-[4vw] max-[1025px]:text-[7vw] max-md:text-[9vw]",children:["Awards and Industry",(0,t.jsx)("br",{

}
),"Recognition"]
}
)
}
),(0,t.jsxs)("div",{
onMouseEnter:()=>{
n.default.to(s.current,{
opacity:1,duration:.4*!d.current,ease:"power2.out"
}
)
}
,onMouseLeave:()=>{
h.current=null,n.default.to(s.current,{
opacity:0,duration:.4*!d.current,ease:"power2.out"
}
)
}
,children:[x.map((e,i)=>(0,t.jsxs)(r.Fragment,{
children:[0!==i&&(0,t.jsx)("div",{
ref:e=>{
o.current[i-1]=e
}
,className:"relative h-px w-full origin-left scale-x-0",children:(0,t.jsx)(g,{
strokeColor:"rgba(255, 255, 255, 0.4)"
}
)
}
),(0,t.jsxs)("div",{
ref:e=>{
l.current[i]=e
}
,className:"relative py-8 awards-container",children:[(0,t.jsx)(u.default,{
splitBy:"lines",children:(0,t.jsx)("h3",{
className:"text-[1.8vw] font-normal max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]",children:e.title
}
)
}
),(0,t.jsx)(u.default,{
splitBy:"lines",children:(0,t.jsx)("p",{
className:"text-[1.25vw] tracking-wide text-white/30 mt-3 max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]",children:e.meta
}
)
}
)]
}
)]
}
,e.title)),(0,t.jsx)("div",{
ref:e=>{
o.current[x.length-1]=e
}
,className:"relative h-px w-full origin-left scale-x-0",children:(0,t.jsx)(g,{
strokeColor:"rgba(255, 255, 255, 0.4)"
}
)
}
)]
}
)]
}
),(0,t.jsx)("div",{
ref:s,className:"w-[40vw] flex justify-center absolute right-[10%] pointer-events-none opacity-0 max-[1025px]:hidden image-container",children:(0,t.jsx)("div",{
ref:e,className:"w-[40vw] h-[22vw] relative bg-[#070707] rounded-lg overflow-hidden shadow-2xl will-change-transform",children:x.map((e,r)=>(0,t.jsx)("div",{
ref:e=>{
a.current[r]=e
}
,className:"absolute inset-0",children:(0,t.jsx)(i.default,{
src:e.imgSrc,alt:"awards-image",className:"w-full h-full object-cover rounded-lg ",width:600,height:400
}
)
}
,e.title))
}
)
}
)]
}
)
}
)
}
],15278)
}
,96439,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(89970),n=e.i(33809),s=e.i(75254);let a=(0,s.default)("chevron-down",[["path",{
d:"m6 9 6 6 6-6",key:"qrunsl"
}
]]),l=(0,s.default)("chevron-right",[["path",{
d:"m9 18 6-6-6-6",key:"mthhwq"
}
]]),o=r.useLayoutEffect,c=(0,r.createContext)(null),u=(0,r.createContext)(null),d=()=>{
let e=(0,r.useContext)(c);if(!e)throw Error("FAQTitle and FAQContent must be used inside FAQWrapper.");
return e
}
;
function h({
children:e,className:n="",titleClassName:s="",contentClassName:a="",iconClassName:l="",iconSize:d=18,iconStrokeWidth:f=2,duration:A=.45,defaultOpen:m=!1,controlledOpen:p,onToggle:g,itemId:x
}
){
let w=(0,r.useContext)(u),v=(0,r.useId)(),b=x??v,y="boolean"==typeof p,[j,E]=(0,r.useState)(m),S=w?w.openItems.includes(b):y?p:j,C=(0,r.useRef)(null),N=(0,r.useRef)(null),k=(0,r.useRef)(0),R=(0,r.useRef)(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??!1),M=(0,r.useId)(),T=(0,r.useId)();(0,r.useEffect)(()=>{
let e=window.matchMedia?.("(prefers-reduced-motion: reduce)");if(!e)return;
let t=e=>{
R.current=e.matches
}
;
return R.current=e.matches,e.addEventListener?.("change",t),()=>e.removeEventListener?.("change",t)
}
,[]);let P=()=>{
if(w){
w.toggleItem(b),g?.(!S);return
}
y?g?.(!p):E(e=>{
let t=!e;return g?.(t),t
}
)
}
;return o(()=>{
if(!C.current||!N.current)return;
let e=C.current,t=N.current;
i.default.killTweensOf([e,t]);
let r=R.current?0:A;if(S){
i.default.set(e,{
overflow:"hidden",height:"auto"
}
);
let t=e.scrollHeight;
k.current=t,i.default.set(e,{
height:0
}
),i.default.fromTo(e,{
height:0
}
,{
height:t,duration:r,ease:"power3.out",onComplete:()=>{
i.default.set(e,{
height:"auto",overflow:"visible"
}
)
}

}
)
}
else i.default.set(e,{
overflow:"hidden"
}
),i.default.fromTo(e,{
height:k.current
}
,{
height:0,duration:r,ease:"power3.out"
}
)
}
,[S,A]),(0,t.jsx)(c.Provider,{
value:{
isOpen:S,contentOuterRef:C,contentInnerRef:N,contentId:M,buttonId:T,titleClassName:s,contentClassName:a,iconClassName:l,iconSize:d,iconStrokeWidth:f
}
,children:(0,t.jsx)("div",{
className:`cursor-pointer ${
n
}
`,role:"button",tabIndex:0,"aria-expanded":S,"aria-controls":M,id:T,onClick:e=>{
e.target.closest("a, button, input, textarea, select")||P()
}
,onKeyDown:e=>{
("Enter"===e.key||" "===e.key)&&(e.preventDefault(),P())
}
,children:e
}
)
}
)
}
function f({
children:e,className:r="",showIcon:i=!0,iconPosition:n="right",iconMode:s="rotate"
}
){
let{
isOpen:o,titleClassName:c,iconClassName:u,iconSize:h,iconStrokeWidth:A
}
=d(),m=i?(0,t.jsx)("div",{
className:`shrink-0 ${
u
}
`,children:"rotate-left-down"===s?(0,t.jsx)(l,{
size:h,strokeWidth:A,className:`transition-transform duration-300 ease-out motion-reduce:transition-none ${
o?"rotate-90":"rotate-0"
}
`,"aria-hidden":"true"
}
):(0,t.jsx)(a,{
size:h,strokeWidth:A,className:`transition-transform duration-300 ease-out motion-reduce:transition-none ${
o?"rotate-180":"rotate-0"
}
`,"aria-hidden":"true"
}
)
}
):null;return(0,t.jsx)("div",{
className:`flex w-full items-center justify-between gap-6 ${
c
}
 ${
r
}
`,children:"left"===n?(0,t.jsxs)(t.Fragment,{
children:[m,(0,t.jsx)("div",{
className:"flex-1",children:e
}
)]
}
):(0,t.jsxs)(t.Fragment,{
children:[(0,t.jsx)("div",{
className:"flex-1",children:e
}
),m]
}
)
}
)
}
function A({
children:e,className:r="",innerClassName:i=""
}
){
let{
isOpen:n,contentOuterRef:s,contentInnerRef:a,contentId:l,buttonId:o,contentClassName:c
}
=d();return(0,t.jsx)("div",{
id:l,ref:s,role:"region","aria-labelledby":o,style:{
height:n?"auto":0,overflow:n?"visible":"hidden"
}
,className:c,children:(0,t.jsx)("div",{
ref:a,className:r,children:(0,t.jsx)("div",{
className:i,children:e
}
)
}
)
}
)
}
t.Fragment,t.Fragment;var m=e.i(79921);
i.default.registerPlugin(n.default);
let p=[{
question:"Who is Elena Voss and what kind of projects do you take?",answer:"I am an independent digital designer who helps businesses create, launch, and optimize digital experiences seamlessly. I specialize in responsive web design, modern UX principles, and conversion-driven visual strategies while ensuring accessibility, performance, and refined aesthetics."
}
,{
question:"How quickly can you deliver a complete website for my business?",answer:"Most projects launch in as little as 48 hours for smaller sites, with larger multi-page builds typically wrapping within two to three weeks depending on scope, content readiness, and how many revision rounds are needed."
}
,{
question:"Do you work with existing design systems and content management platforms?",answer:"Yes - I regularly work inside established design systems and popular CMS platforms alike, adapting to whatever your team already has in place rather than forcing a rebuild from scratch."
}
,{
question:"What design standards do you follow consistently?",answer:"Every project follows WCAG accessibility guidelines, semantic markup, and performance budgets from day one, alongside a consistent typographic and spacing system so the final product feels cohesive across every screen."
}
,{
question:"How do you stay current with emerging design trends and innovations each year?",answer:"I dedicate time each month to hands-on experimentation with new interaction patterns, tooling, and frameworks, plus regular study of award-winning work, so the craft behind every project keeps pace with where the web is heading."
}
];e.s(["default",0,()=>{
let[e,n]=(0,r.useState)(0),s=(0,r.useRef)([]),[a,l]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{
let e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=window.requestAnimationFrame(()=>l(e.matches)),r=e=>l(e.matches);
return e.addEventListener("change",r),()=>{
window.cancelAnimationFrame(t),e.removeEventListener("change",r)
}

}
,[]),(0,r.useEffect)(()=>{
let e=s.current.filter(Boolean);if(a)return void i.default.set(e,{
opacity:1,y:0
}
);
let t=e.map(e=>i.default.fromTo(e,{
opacity:0,y:40
}
,{
opacity:1,y:0,duration:.8,ease:"power2.out",scrollTrigger:{
trigger:e,start:"top 85%",toggleActions:"play none none none"
}

}
));return()=>{
t.forEach(e=>e.scrollTrigger?.kill()),t.forEach(e=>e.kill())
}

}
,[a]),(0,t.jsxs)("section",{
className:"w-screen py-[6vw] px-[10vw] relative bg-[#070707] text-white max-[1025px]:px-[5vw]",children:[(0,t.jsx)(m.default,{
stagger:.015,children:(0,t.jsx)("h2",{
className:"text-[5.5vw] text-center mb-[6vw] max-[1025px]:text-[7vw] max-md:text-[9vw]",children:"Frequently Asked Questions"
}
)
}
),(0,t.jsx)("div",{
className:"w-full mx-auto ",children:p.map((r,i)=>{
let a=e===i;return(0,t.jsx)("div",{
ref:e=>{
s.current[i]=e
}
,className:"opacity-0",children:(0,t.jsxs)(h,{
controlledOpen:a,onToggle:()=>n(e=>e===i?-1:i),className:"border-b border-white/10 py-8 group max-md:py-5",duration:.5,children:[(0,t.jsx)(f,{
showIcon:!1,children:(0,t.jsxs)("div",{
className:"flex items-center justify-between gap-6 w-full max-md:gap-4",children:[(0,t.jsx)("span",{
className:"text-[1.5vw] font-normal max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]",children:r.question
}
),(0,t.jsxs)("div",{
className:"relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ease-out border border-white/20 max-[1025px]:size-11 max-md:size-9 ",children:[(0,t.jsx)("span",{
className:"absolute h-[2px] z-2 w-4 rounded-full bg-white max-md:w-3"
}
),(0,t.jsx)("span",{
className:`absolute h-[2px] z-2 w-4 rounded-full bg-white transition-transform duration-300 ease-out max-md:w-3 ${
a?"rotate-0":"rotate-90"
}
`
}
),(0,t.jsx)("div",{
className:`absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 scale-0 ease-in-out origin-center rounded-full  duration-300 ${
a?"scale-100":"scale-0"
}
`
}
)]
}
)]
}
)
}
),(0,t.jsx)(A,{
className:"pt-4 pr-[3vw] w-[80%] max-[1025px]:w-full max-[1025px]:pr-0 max-md:w-full max-md:pr-0",children:(0,t.jsx)("p",{
className:"text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]",children:r.answer
}
)
}
)]
}
)
}
,r.question)
}
)
}
)]
}
)
}
],96439)
}
,13642,e=>{
"use strict";var t=e.i(43476),r=e.i(57688),i=e.i(22016),n=e.i(89970),s=e.i(33809),a=e.i(71645);let l={
src:e.i(2130).default,width:1920,height:900,blurWidth:0,blurHeight:0
}
;var o=e.i(68993);let c={
src:e.i(41683).default,width:10,height:19,blurWidth:0,blurHeight:0
}
,u={
src:e.i(93075).default,width:21,height:21,blurWidth:0,blurHeight:0
}
,d={
src:e.i(39860).default,width:18,height:18,blurWidth:0,blurHeight:0
}
,h={
src:e.i(79768).default,width:17,height:17,blurWidth:0,blurHeight:0
}
;var f=e.i(71215),A=e.i(33855);
n.default.registerPlugin(s.default);
let m=[{
label:"Facebook",href:"#",icon:c
}
,{
label:"Instagram",href:"#",icon:u
}
,{
label:"LinkedIn",href:"#",icon:d
}
,{
label:"Twitter",href:"#",icon:h
}
];e.s(["default",0,()=>{
let e=(0,a.useRef)(null),s=(0,a.useRef)(null),{
openModal:c
}
=(0,A.useGetInTouchModal)();return(0,a.useEffect)(()=>{
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void n.default.set(s.current,{
opacity:1,yPercent:0
}
);
if(globalThis.innerWidth<=1025)return;
let t=n.default.fromTo(s.current,{
yPercent:20
}
,{
yPercent:0,ease:"power1.out",scrollTrigger:{
trigger:e.current,start:"top 60%",end:"bottom bottom",scrub:!0
}

}
);return()=>{
t.scrollTrigger?.kill(),t.kill()
}

}
,[]),(0,t.jsx)(t.Fragment,{
children:(0,t.jsxs)("footer",{
className:"relative overflow-hidden px-[4vw] pt-[10vw] max-[1025px]:px-[5vw] max-md:pt-[20vw]",id:"footer",ref:e,children:[(0,t.jsx)(r.default,{
src:l,width:1920,height:900,alt:"Footer Background",loading:"lazy",className:"absolute -bottom-20 left-0 right-0 w-full max-md:scale-[5] max-md:bottom-0"
}
),(0,t.jsxs)("div",{
className:"relative z-[1]",children:[(0,t.jsxs)("div",{
className:"rounded-4xl bg-black/5 border border-white/30 backdrop-blur-2xl px-12 py-12 flex flex-col gap-20 justify-between max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:gap-10 max-[1025px]:px-8 max-[1025px]:py-15 max-md:px-6 max-md:gap-8",ref:s,children:[(0,t.jsxs)("div",{
className:"flex  justify-between items-start gap-24 footer-content max-[1025px]:gap-10 max-md:gap-16 max-[1025px]:flex-col-reverse max-[1025px]:items-center",children:[(0,t.jsx)(r.default,{
src:o.default,width:338,height:172,alt:"Logo",loading:"lazy",className:"w-[22vw] max-[1025px]:w-[34vw] max-md:w-[46vw]"
}
),(0,t.jsxs)("div",{
className:"flex flex-col gap-[2vw] items-end max-[1025px]:items-center max-[1025px]:text-center max-md:gap-[7vw]",children:[(0,t.jsx)("p",{
className:"text-[3.4vw] text-end w-[75%] leading-[1.15] max-[1025px]:text-[5vw] max-[1025px]:w-full max-[1025px]:text-center max-md:text-[7.5vw] ",children:"Ready to Bring Your Vision to Life?"
}
),(0,t.jsx)(f.default,{
btnText:"Get in Touch",href:"#",onClick:e=>{
e.preventDefault(),c()
}
,textClassName:"font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]",bgColor:"#ffffff",dotColor:"#070707",hoverTextColor:"#ffffff",textColor:"#111111"
}
)]
}
)]
}
),(0,t.jsxs)("div",{
className:"flex w-full items-end justify-between gap-36 h-auto  footer-content max-[1025px]:w-full max-[1025px]:items-center max-[1025px]:text-center max-[1025px]:gap-10 max-md:gap-10 max-[1025px]:flex-col ",children:[(0,t.jsxs)("div",{
className:" w-fit text-foreground",children:[(0,t.jsx)("h6",{
className:"uppercase mb-5 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]",children:"Reach Out"
}
),(0,t.jsxs)("ul",{
className:"space-y-2 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]",children:[(0,t.jsx)("li",{
className:"under-multi-parent",children:(0,t.jsx)("a",{
href:"tel:+1 (415) 309-8274",className:"under-multi content-p",children:"+1 (415) 309-8274"
}
)
}
),(0,t.jsx)("li",{
className:"under-multi-parent",children:(0,t.jsx)("a",{
href:"mailto:hello@elenavoss.design",className:"under-multi content-p",children:"hello@elenavoss.design"
}
)
}
)]
}
)]
}
),(0,t.jsx)("div",{
className:"flex flex-col justify-between h-fit",children:(0,t.jsx)("ul",{
className:"flex gap-4",children:m.map((e,n)=>(0,t.jsx)("li",{
className:"group",children:(0,t.jsxs)(i.default,{
href:e.href,"aria-label":e.label,className:"rounded-full relative block p-2.5 border overflow-hidden bg-white/5  transition-all duration-300 ease-in-out group-hover:scale-[0.95]",children:[(0,t.jsx)("div",{
className:"w-5 h-5 flex items-center justify-center",children:(0,t.jsx)(r.default,{
src:e.icon,alt:e.label,className:"w-full h-full object-contain group-hover:invert transition-all duration-300 ease-in-out"
}
)
}
),(0,t.jsx)("div",{
className:"w-full h-full absolute inset-0 origin-center scale-0 group-hover:scale-100 bg-white rounded-full duration-300 ease-in-out z-[-1]"
}
)]
}
)
}
,n))
}
)
}
)]
}
)]
}
),(0,t.jsxs)("div",{
className:"flex justify-between py-8 pt-12 text-lg text-foreground max-md:flex-col max-md:gap-2 max-md:text-sm max-md:text-center max-md:py-6 max-md:pt-8",children:[(0,t.jsxs)("p",{
children:["Copyright"," ",(0,t.jsx)(i.default,{
href:"https://vault.hyperiux.com/",target:"_blank",rel:"noopener noreferrer",children:"©"
}
)," ","Elena Voss Design 2026"]
}
),(0,t.jsxs)("p",{
children:["By: ",(0,t.jsx)("a",{
href:"https://www.hyperiux.com/",children:"Hyperiux"
}
)]
}
)]
}
)]
}
)]
}
)
}
)
}
],13642)
}
,33855,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(70703);let n=(0,i.default)(()=>e.A(49228),{
loadableGenerated:{
modules:[3924]
}

}
),s=(0,i.default)(()=>e.A(14540),{
loadableGenerated:{
modules:[97554]
}

}
),a=[{
type:"text",name:"name",label:"Your Name*",required:!0
}
,{
type:"email",name:"email",label:"Email Address*",required:!0
}
,{
type:"text",name:"subject",label:"Subject*",required:!0
}
,{
type:"text",name:"message",label:"Your Message*",required:!0
}
,{
type:"phone",name:"phone",label:"Phone Number*",required:!0,defaultCountry:"AE"
}
];async function l(e){
console.log("Get in touch form submitted:",e)
}
let o=(0,r.createContext)(null);
function c({
onClick:e
}
){
return(0,t.jsxs)("button",{
type:"button",onClick:e,"aria-label":"Close",className:"relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center  cursor-pointer max-[1025px]:size-11 max-md:size-9 group",children:[(0,t.jsx)("div",{
className:"absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416]"
}
),(0,t.jsx)("span",{
className:"absolute h-0.5 z-2 w-4 rounded-full bg-white rotate-45 max-md:w-3 group-hover:rotate-225 duration-500 ease-in-out"
}
),(0,t.jsx)("span",{
className:"absolute h-0.5 z-2 w-4 rounded-full bg-white -rotate-45 max-md:w-3 group-hover:rotate-135 duration-500 ease-in-out"
}
)]
}
)
}
e.s(["GetInTouchModalProvider",0,function({
children:e
}
){
let[i,u]=(0,r.useState)(!1),[d,h]=(0,r.useState)(!1),f=(0,r.useCallback)(()=>{
h(!0),u(!0)
}
,[]),A=(0,r.useCallback)(()=>u(!1),[]),m=(0,r.useMemo)(()=>({
openModal:f
}
),[f]);return(0,t.jsxs)(o.Provider,{
value:m,children:[e,d&&(0,t.jsx)(n,{
isOpen:i,onClose:A,showCloseButton:!1,overlayOpacity:1,ariaLabelledby:"get-in-touch-modal-title",contentClassName:"justify-center px-[4vw] max-md:px-4",children:(0,t.jsxs)("div",{
className:"relative w-full max-w-[75vw] h-[75vh] overflow-y-auto rounded-[2vw] bg-white/5 backdrop-blur-lg border border-white/10 text-white p-[3vw] max-[1025px]:max-w-[85vw] max-[1025px]:p-8 max-md:max-w-full max-md:p-6 max-md:rounded-3xl",children:[(0,t.jsx)("div",{
className:"absolute top-[2vw] right-[2vw] max-[1025px]:top-6 max-[1025px]:right-6 max-md:top-4 max-md:right-4",children:(0,t.jsx)(c,{
onClick:A
}
)
}
),(0,t.jsxs)("div",{
className:"grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[3vw] items-start max-[1025px]:grid-cols-1 max-[1025px]:gap-8 pt-[4vw]",children:[(0,t.jsxs)("div",{
children:[(0,t.jsx)("h2",{
id:"get-in-touch-modal-title",className:"text-[4.8vw] leading-[1.1]! max-[1025px]:text-[5vw] max-md:text-[8vw]",children:"Get in Touch"
}
),(0,t.jsx)("p",{
className:"mt-[1vw] text-[1.1vw] text-white max-[1025px]:text-[2.4vw] max-md:text-[4vw]",children:"Drop me a message"
}
)]
}
),(0,t.jsx)("div",{
className:"get-in-touch-form",children:(0,t.jsx)(s,{
fields:a,onSubmit:l,submitLabel:"Send",accentColor:"#F16B0D",textColor:"#ffffff",inputBackgroundColor:"rgba(255,255,255,0.15)",fieldBorderColor:"rgba(255,255,255,0.15)",inputRoundedness:999
}
)
}
)]
}
)]
}
)
}
)]
}
)
}
,"useGetInTouchModal",0,function(){
let e=(0,r.useContext)(o);if(!e)throw Error("useGetInTouchModal must be used within GetInTouchModalProvider");return e
}
])
}
,2971,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(57688),n=e.i(89970),s=e.i(68993),a=e.i(71215),l=e.i(33855),o=e.i(22016);e.s(["default",0,()=>{
let[e,c]=(0,r.useState)(!1),{
openModal:u
}
=(0,l.useGetInTouchModal)(),d=(0,r.useRef)(null),h=(0,r.useRef)(0),f=(0,r.useRef)(!1),A=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{
let e=window.matchMedia("(prefers-reduced-motion: reduce)");
A.current=e.matches;
let t=e=>{
A.current=e.matches
}
;
return e.addEventListener("change",t),()=>e.removeEventListener("change",t)
}
,[]),(0,r.useEffect)(()=>{
h.current=window.scrollY;let e=()=>{
let e=window.scrollY;
if(c(e>.4*window.innerHeight),!A.current){
let t=e-h.current;
t>0&&e>0&&!f.current?(f.current=!0,n.default.to(d.current,{
yPercent:-100,duration:.5,ease:"power3.out"
}
)):t<0&&f.current&&(f.current=!1,n.default.to(d.current,{
yPercent:0,duration:.5,ease:"power3.out"
}
))
}
h.current=e
}
;return e(),window.addEventListener("scroll",e,{
passive:!0
}
),()=>window.removeEventListener("scroll",e)
}
,[]),(0,t.jsx)(t.Fragment,{
children:(0,t.jsxs)("header",{
ref:d,className:`w-screen h-fit py-[1.5vw] flex items-center justify-between px-[4vw] fixed inset-0 z-99 opacity-0 transition-[backdrop-filter] duration-500 ease-out max-[1025px]:py-[3vw] max-[1025px]:px-[5vw] max-md:py-4 ${
e?"backdrop-blur-lg":"backdrop-blur-none"
}
`,id:"header",children:[(0,t.jsx)(o.default,{
className:"",href:"/",children:(0,t.jsx)(i.default,{
src:s.default,width:338,height:172,alt:"Logo",loading:"lazy",className:"w-[12vw] max-[1025px]:w-[25vw] max-md:w-[34vw]"
}
)
}
),(0,t.jsx)(a.default,{
btnText:"Get in Touch",href:"#",onClick:e=>{
e.preventDefault(),u()
}
,className:"border border-white/20!",textClassName:"font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]",bgColor:"#ffffff",dotColor:"#070707",hoverTextColor:"#ffffff",textColor:"#111111"
}
)]
}
)
}
)
}
])
}
,32177,e=>{
"use strict";var t=e.i(43476),r=e.i(57688);let i={
src:e.i(41543).default,width:1142,height:1378,blurWidth:7,blurHeight:8,blurDataURL:"data:image/webp;
base64,UklGRkoBAABXRUJQVlA4TD4BAAAvBsABEM1VICICHghADgIAAICbFb8CAAEAAAAAABgCBAAAAAAAAAgAAAQAAMAAAJACQMgiNWJYvwMAAPBAAHIQAAAAzv+2n7YlkYygAQoAAAAEAIACAAAAAAAAAAAAAAAoAAAAAPFSS0AxxJIHQpLABgAAcP6zrQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0fx4ICA4CAADA+d9boZSJSAAGvAABQBCEYcYQAACAAgIAAAAAAABBAAAAAAAYAAALSIIASGrdkTWpkSEV8wNAIWbu/vfU/j4/OP2UjGMA+EgTqtbTzd3FjqjUkQJAtkrqe6nvx3oz5hu5HFWQ4LdfsdBiVRemri41Tvtodmm+l+Ft/Z6x19O7rUfs/Fqme6I84z9emJDjrKC45Zb3NujzoXyhYtgXA3M="
}
;var n=e.i(55702),s=e.i(53649),a=e.i(75241),l=e.i(9921),o=e.i(71645),c=e.i(89970),u=e.i(33809),d=e.i(55667),h=e.i(79921);
c.default.registerPlugin(u.default);
let f=[n.default,a.default,n.default,a.default],A=[s.default,l.default,s.default,l.default],m=[n.default,s.default,a.default,l.default,n.default,s.default,a.default,l.default];e.s(["default",0,()=>{
let e=(0,o.useRef)(null),n=(0,o.useRef)(null),s=(0,o.useRef)(null),a=(0,o.useRef)(null),l=(0,o.useRef)(null),u=(0,o.useRef)(null),p=(0,o.useRef)(!1),[g,x]=(0,o.useState)(!1),[w,v]=(0,o.useState)(!1),[b,y]=(0,o.useState)(!1),j=(0,d.useLenis)(),E=(0,o.useRef)(j);return(0,o.useEffect)(()=>{
E.current=j
}
,[j]),(0,o.useEffect)(()=>{
"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.scrollTo(0,0)
}
,[]),(0,o.useEffect)(()=>{
let e=window.matchMedia("(max-width: 1025px)"),t=()=>x(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)
}
,[]),(0,o.useEffect)(()=>{
j?.stop()
}
,[j]),(0,o.useEffect)(()=>{
if(p.current)return;
p.current=!0;
let e={
reveal:-40
}
,t=c.default.timeline();
return t.to(e,{
reveal:125,duration:3.5,ease:"power2.out",onUpdate:()=>{
l.current?.style.setProperty("--reveal",`${
e.reveal
}
%`)
}

}
,0).fromTo(l.current,{
opacity:0
}
,{
opacity:1,duration:1.5,ease:"power2.out"
}
,0).call(()=>v(!0),void 0,1).call(()=>y(!0),void 0,1.5).call(()=>{
let e=document.getElementById("header"),t=document.getElementById("header-logo");
c.default.fromTo([e,t],{
yPercent:-50,opacity:0
}
,{
yPercent:0,opacity:1,duration:.8,ease:"power3.out",onComplete:()=>E.current?.start()
}
)
}
,void 0,1.8),()=>{
t.kill(),p.current=!1,v(!1),y(!1)
}

}
,[]),(0,o.useEffect)(()=>{
if(!n.current||!e.current)return;
let t=c.default.timeline({
scrollTrigger:{
trigger:e.current,start:"top top",end:"bottom bottom",scrub:!0,invalidateOnRefresh:!0
}

}
);
return t.to(n.current,{
scale:.5,ease:"power2.inOut",duration:1
}
,0),u.current&&(c.default.set(u.current,{
filter:"blur(24px)",opacity:.35
}
),t.to(u.current,{
filter:"blur(0px)",opacity:1,ease:"power2.out",duration:.18
}
,.32)),()=>{
t.scrollTrigger?.kill(),t.kill()
}

}
,[]),(0,o.useEffect)(()=>{
let e;
if(globalThis.innerWidth<=1024||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
let t={
targetImgX:0,currentImgX:0,targetTextX:0,currentTextX:0,targetImgY:0,currentImgY:0,targetTextY:0,currentTextY:0
}
,r=e=>{
let r=e.clientX/window.innerWidth*2-1,i=e.clientY/window.innerHeight*2-1;t.targetImgX=-(30*r),t.targetTextX=-(12*r),t.targetImgY=-(30*i),t.targetTextY=-(12*i)
}
;
window.addEventListener("mousemove",r);let i=()=>{
t.currentImgX+=(t.targetImgX-t.currentImgX)*.08,t.currentTextX+=(t.targetTextX-t.currentTextX)*.08,t.currentImgY+=(t.targetImgY-t.currentImgY)*.08,t.currentTextY+=(t.targetTextY-t.currentTextY)*.08,c.default.set(s.current,{
x:t.currentImgX,y:t.currentImgY
}
),c.default.set(a.current,{
x:t.currentTextX,y:t.currentTextY
}
),e=requestAnimationFrame(i)
}
;
return e=requestAnimationFrame(i),()=>{
window.removeEventListener("mousemove",r),cancelAnimationFrame(e)
}

}
,[]),(0,t.jsxs)("section",{
ref:e,className:"relative w-screen h-[300vh]",id:"hero",children:[(0,t.jsxs)("div",{
ref:n,className:"w-screen h-screen sticky top-0 flex justify-between items-center hero-container px-[4vw] z-2 max-[1025px]:px-[5vw]  max-[1025px]:items-start max-[1025px]:pt-[30vw] overflow-hidden",style:{
backgroundColor:"#180d08",backgroundImage:`
                        radial-gradient(65% 55% at 92% 6%, #F0640D 0%, rgba(240,100,13,0) 65%),
                        radial-gradient(60% 55% at 4% 82%, #EC690F 0%, rgba(236,105,15,0) 65%),
                        radial-gradient(75% 80% at 48% 42%, #B01205 0%, rgba(176,18,5,0) 70%),
                        linear-gradient(180deg, #D8470A 0%, #C0300A 28%, #B01205 46%, #7A1C08 68%, #2A1108 88%, #180D08 100%)
                    `
}
,children:[(0,t.jsxs)("div",{
ref:a,className:"w-full h-fit flex justify-between max-[1025px]:flex-col max-[1025px]:gap-8",children:[(0,t.jsx)("div",{
className:" w-[45%] leading-30! max-[1025px]:w-[62%] max-md:w-full",children:(0,t.jsx)(h.default,{
stagger:.015,start:w,children:(0,t.jsx)("h1",{
className:"text-[7.5vw] text-white max-[1025px]:text-[12vw]  max-md:text-[15vw] leading-[1.1]!",children:"Visualise Your Mind in Motion"
}
)
}
)
}
),(0,t.jsxs)("div",{
className:"w-[10%] flex flex-col justify-between text-end text-[1.25vw] leading-[1.15] py-[2vw] max-[1025px]:w-[40%] max-[1025px]:text-[3.5vw] max-[1025px]:text-start max-[1025px]:flex-col-reverse  max-md:text-[4.5vw] max-md:gap-[7vw] max-[1025px]:gap-20 max-md:py-0",children:[(0,t.jsx)(h.default,{
splitBy:"lines",start:b,children:(0,t.jsx)("p",{
className:"text-white",children:"Award winning Designs"
}
)
}
),(0,t.jsx)(h.default,{
splitBy:"lines",start:b,children:(0,t.jsxs)("p",{
className:"text-white",children:["Creative",(0,t.jsx)("br",{

}
),"Web Designer"]
}
)
}
)]
}
)]
}
),(0,t.jsx)("div",{
ref:l,className:"absolute bottom-[-64%] left-1/2 translate-x-[-49.5%] size-[180%] max-[1025px]:w-full max-[1025px]:translate-x-[-40%] max-md:w-[160%] max-md:top-auto max-md:bottom-[-30%] max-md:h-auto max-md:translate-x-[-40%] hero-av-img hero-mask-reveal opacity-0",children:(0,t.jsx)("div",{
ref:s,className:"w-full h-full",children:(0,t.jsx)(r.default,{
src:i,alt:"hero-img",className:"w-full h-full object-contain select-none pointer-events-none",draggable:!1,loading:"eager",fetchPriority:"high",sizes:"(max-width: 768px) 100vw, 1280px",quality:78
}
)
}
)
}
)]
}
),(0,t.jsx)("div",{
ref:u,className:"absolute inset-0 w-full h-full bg-[#070707]   ",children:(0,t.jsxs)("div",{
className:"w-full h-screen sticky top-0 px-[4vw] flex gap-[2.5vw] overflow-hidden",children:[(0,t.jsx)("div",{
className:"w-[50%] h-fit flex flex-col gap-[2.5vw] marquee-1",children:(g?m:f).map((e,i)=>(0,t.jsx)("div",{
className:"w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden",children:(0,t.jsx)(r.default,{
src:e,alt:"portfolio-img",width:700,height:500,className:"w-full h-full overflow-hidden object-cover"
}
)
}
,i))
}
),(0,t.jsx)("div",{
className:"w-[50%] h-fit flex flex-col gap-[2.5vw] marquee-2",children:(g?m:A).map((e,i)=>(0,t.jsx)("div",{
className:"w-full h-[27vw] max-[1025px]:h-[45vw] max-md:h-[55vw] overflow-hidden",children:(0,t.jsx)(r.default,{
src:e,alt:"portfolio-img",width:700,height:500,className:"w-full h-full overflow-hidden object-cover"
}
)
}
,i))
}
)]
}
)
}
)]
}
)
}
],32177)
}
,89594,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(57688),n=e.i(89970),s=e.i(33809),a=e.i(55702),l=e.i(53649),o=e.i(75241),c=e.i(9921),u=e.i(79921);
n.default.registerPlugin(s.default);
let d=[{
name:"Auré Studio",tags:["Photography","Art Direction"],imgSrc:a.default
}
,{
name:"Veloce",tags:["Automotive","Brand Experience"],imgSrc:l.default
}
,{
name:"Grain Studio",tags:["Fashion","Creative Direction"],imgSrc:o.default
}
,{
name:"Aether",tags:["Architecture","Digital Identity"],imgSrc:c.default
}
];e.s(["default",0,()=>{
let e=(0,r.useRef)([]),s=(0,r.useRef)(null),a=(0,r.useRef)([]),l=(0,r.useRef)(null),[o,c]=(0,r.useState)(!1),h=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{
let e=window.matchMedia("(prefers-reduced-motion: reduce)");
h.current=e.matches;
let t=window.requestAnimationFrame(()=>c(e.matches)),r=e=>{
h.current=e.matches,c(e.matches)
}
;
return e.addEventListener("change",r),()=>{
window.cancelAnimationFrame(t),e.removeEventListener("change",r)
}

}
,[]),(0,r.useEffect)(()=>{
let t=d.length-1,r=n.default.timeline({
scrollTrigger:{
trigger:"#portfolio",start:"10% top",end:"bottom bottom",scrub:!0,...h.current?{

}
:{
snap:{
snapTo:1/t,duration:{
min:.2,max:.6
}
,ease:"power1.inOut"
}

}

}

}
);
n.default.set(s.current,{
scaleY:0
}
),n.default.set(e.current[0],{
backgroundColor:"#ffffff",borderColor:"#ffffff"
}
),e.current.slice(1).forEach(e=>{
n.default.set(e,{
backgroundColor:"#F06A0E",borderColor:"rgba(255,255,255,0.5)"
}
)
}
),n.default.set(a.current,{
filter:"brightness(1)"
}
),h.current?a.current.slice(1).forEach(e=>{
n.default.set(e,{
opacity:0
}
)
}
):a.current.slice(1).forEach(e=>{
n.default.set(e,{
yPercent:100
}
)
}
),r.to(s.current,{
scaleY:1,ease:"none",duration:t
}
,0);for(let i=0;i<t;i+=1)h.current?r.to(a.current[i+1],{
opacity:1,ease:"none",duration:1
}
,i):r.to(a.current[i+1],{
yPercent:0,ease:"power2.inOut",duration:1
}
,i),r.to(a.current[i],{
filter:"brightness(0.3)",ease:"power2.inOut",duration:1
}
,i),r.set(e.current[i+1],{
backgroundColor:"#ffffff",borderColor:"#ffffff"
}
,i+1);
h.current||(globalThis.innerWidth>1024?n.default.to(".circle-clip",{
yPercent:-70,ease:"none",scrollTrigger:{
trigger:"#portfolio",start:"top bottom",end:"30% bottom",scrub:!0
}

}
):n.default.to(".circle-clip",{
yPercent:-50,ease:"none",scrollTrigger:{
trigger:"#portfolio",start:"top bottom",end:"30% bottom",scrub:!0
}

}
),n.default.set(l.current,{
clipPath:"ellipse(150% 100% at 50% 100%)"
}
),n.default.to(l.current,{
clipPath:"ellipse(60% 100% at 50% 100%)",ease:"power2.out",scrollTrigger:{
trigger:"#portfolio",start:"top bottom",end:"30% bottom",scrub:!0
}

}
))
}
,[]),(0,t.jsxs)("section",{
className:`relative w-screen h-[360vh] text-white ${
o?"pt-[8vw]":"pt-[8vw] max-[1025px]:pt-[30vw]"
}
`,id:"portfolio",children:[(0,t.jsx)("div",{
ref:l,className:"w-full h-[50vh]  absolute top-0 left-0 z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] circle-clip will-change-[clip-path]"
}
),(0,t.jsxs)("div",{
className:"w-screen h-screen sticky top-0 z-3 flex flex-col items-center justify-center px-[4vw] gap-[5vw] overflow-hidden bg-linear-to-r from-[#F16B0D] to-[#E61416] max-md:gap-[15vw] max-[1025px]:gap-12 max-[1025px]:px-[5vw]",children:[(0,t.jsx)(u.default,{
stagger:.015,children:(0,t.jsx)("h2",{
className:"text-[5.5vw] text-center max-[1025px]:text-[6.5vw] max-md:text-[9vw]",children:"Award Winning Work"
}
)
}
),(0,t.jsxs)("div",{
className:"w-full flex items-center gap-[4vw] max-[1025px]:flex-col max-md:gap-[15vw] max-[1025px]:items-start max-[1025px]:gap-16",children:[(0,t.jsxs)("div",{
className:"w-[32%] relative max-md:w-full max-[1025px]:w-[50%]",children:[(0,t.jsx)("div",{
className:"absolute left-1 bg-white/20 top-[2.5vw] max-[1025px]:top-[1vw] h-[21vw] max-[1025px]:h-[33vw] max-md:h-[62vw] w-px "
}
),(0,t.jsx)("div",{
ref:s,className:"absolute left-1 bg-white origin-top top-[2.5vw] max-[1025px]:top-[1vw] h-[21vw] max-[1025px]:h-[33vw] max-md:h-[62vw] w-px "
}
),(0,t.jsx)("div",{
className:"flex flex-col max-[1025px]:gap-[4vw] max-md:gap-[14vw]",children:d.map((r,i)=>(0,t.jsxs)("div",{
className:"relative flex items-center gap-[1.2vw] max-md:gap-[5vw]",style:{
height:"7vw"
}
,children:[(0,t.jsx)("span",{
ref:t=>{
e.current[i]=t
}
,className:"w-[10px] h-[10px] mt-[-1.5vw] bg-[#F06A0E] rounded-full border shrink-0 max-md:mt-[-7vw] max-[1025px]:mt-[-4vw]"
}
),(0,t.jsxs)("div",{
children:[(0,t.jsx)("h3",{
className:"text-[1.5vw] font-normal max-[1025px]:text-[3.5vw] max-md:text-[5.5vw]",children:r.name
}
),(0,t.jsx)("p",{
className:"text-[1vw] max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]",children:r.tags.join("  •  ")
}
)]
}
)]
}
,r.name))
}
)]
}
),(0,t.jsx)("div",{
className:"w-full h-[38vw] relative rounded-xl overflow-hidden max-[1025px]:w-full max-[1025px]:h-[52vw] max-[1025px]:rounded-lg  ",children:d.map((e,r)=>(0,t.jsx)("div",{
ref:e=>{
a.current[r]=e
}
,className:"absolute inset-0 bg-[#F4EFE9] flex items-center justify-center  rounded-xl overflow-hidden max-[1025px]:rounded-lg",style:{
zIndex:r+1
}
,children:(0,t.jsx)(i.default,{
src:e.imgSrc,alt:"portfolio-img",width:800,height:400,className:"w-full h-full object-cover"
}
)
}
,e.name))
}
)]
}
)]
}
),(0,t.jsx)("div",{
className:"absolute w-screen h-[60vh] bottom-[-10%] left-0 overflow-hidden max-[1025px]:bottom-[-13%]",children:(0,t.jsx)("div",{
className:"w-[115%] h-[40vh]  absolute bottom-[35%] left-[-7.5%] z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] blur-2xl max-[1025px]:bottom-[50%] max-[1025px]:w-[120%] max-[1025px]:left-[-10%] max-[1025px]:blur-lg"
}
)
}
)]
}
)
}
])
}
,98279,e=>{
"use strict";var t=e.i(43476),r=e.i(89970),i=e.i(33809),n=e.i(65747),s=e.i(57688),a=e.i(71645);let l={
src:e.i(11774).default,width:157,height:53,blurWidth:8,blurHeight:3,blurDataURL:"data:image/webp;
base64,UklGRgABAABXRUJQVlA4TPQAAAAvB4AAEM1VICICHggACQAAAIABHs0QAMADwABgAAABAAAAAAAAAAAAAADAGCCEGTwEAAggMAAAAA8E2AQAAADg/ME4wgkAAIBzACAgAAAAAAAAAAAAAAAAAABwAADAAQ4AQ1BCwgMBIAEAAAA4f8aYCAABIEMwAAAAAAAAAAAAAAAAAAAAAAAAALBhAiTgASjhgQCQAAAAAJw/xgAAAAYIAAAYLLAZABgAAAAAAAAAAECGQUADwGAAHAAAgXBSrWHtq7q+eJ/DifA5Y10XeOB1pGWMhN6w22lDdm2kkjrkMqMftSPi+2bxSl5zi4QHf3+kF30C"
}
,o={
src:e.i(41267).default,width:76,height:66,blurWidth:8,blurHeight:7,blurDataURL:"data:image/webp;
base64,UklGRmABAABXRUJQVlA4TFMBAAAvB4ABEM1VICICHghADgIAAID7q1pbq7UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAghSlVlrwIAAPBAAGwQAAAAzn+CAxIEDwIABABACQAB4AA4AAEAAACAAACAREUKGVEA7p4AJcjhRDQPBBgJAQAA4Py32/pPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK/HXzQIBhEAAAAM5/IJIIAQAIEACAAEEAoHMcAAgAAAAAAMAFlzpJgAhwBwcoJwg4olCdDOYFAIhI/sqH2YDhWn1DirsA4AQE/PKY4epvx3e8cNWjJX78v0cIDcwpo5NXjSYZ/InYaqKtQygA0XOurrjjOtHUFac8jazfNIOA/KGtao8XR/qkp56zIcISxM6CL1yGlpP2toeIy53q4521yZ8vy9JOraVvNleH71i1+/Ju7EG95V0lm7vpqwUA"
}
,c={
src:e.i(3722).default,width:212,height:45,blurWidth:8,blurHeight:2,blurDataURL:"data:image/webp;
base64,UklGRn4AAABXRUJQVlA4THIAAAAvB0AAEM1VICICHgggAQAAAAAABIaHgQEAAAAAAAAAAAAAAAAAAAADAAAAYAAIDGAAGMAMAAAgwgMBJAAAAAA4fzoQAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAGBgDIDfwJDpJuewR/G2uGZWsGRDeBw="
}
,u={
src:e.i(51197).default,width:243,height:93,blurWidth:8,blurHeight:3,blurDataURL:"data:image/webp;
base64,UklGRv4AAABXRUJQVlA4TPIAAAAvB4AAEM1VICICHgiwCQAAAIBOld4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACN47dQMAAPBAAEgAAAAAzt8DAAAAFgAAAAAGA4CAAdgDAQCAAaMQAACYAQAAAAEAACCg4YEA0wAAAACc/+ikfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAq+PkgQCbAAAAAJy/BwAAgAMAAIALAAc4pCAAAAAAAAAAAByGkAOAQAAAQAAAAFKQvRxuYFzsn/x43/dK7GcCMSON6lJ7GDB1jlsWsWOxYbJqyxz3rceNLRq2y/0UTDWPKu6bDQ=="
}
,d={
src:e.i(92506).default,width:137,height:137,blurWidth:8,blurHeight:8,blurDataURL:"data:image/webp;
base64,UklGRlQBAABXRUJQVlA4TEgBAAAvB8ABEM1VICICHghADgIAAIC/hwAABGICA0gApB4AAAAAAAAAAAAAAAAAAAB7gYUBVAQBAAiAThkAADwQEBwEAACA878tzBQkIMrSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBjFYKBgOKz90DQchAAAADO//3CCQIwwKoYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJqOFBAilkjzQAByEAAAAM7/7wwBQAQAEAEAQSQIoDEAAAAAAAAAAAAAkCBQIAIYCAARAkDBiu1TAAJSq4lqgpoIhA8A0NAkufkYO5NkrUy9nbGZrtgONVSLzENQ+5pY7u7tsv7pi/ZvNd6hHMtQh88iWjXaZAQorgImvt3/wn+BnnTEJz1q+TXczz5e1x3ef1uOo+y+nX2JKS+jJ19TzpMnX3zd9jLvPk/nuW7rTIcShKAE+UlV"
}
,h={
src:e.i(33495).default,width:132,height:52,blurWidth:8,blurHeight:3,blurDataURL:"data:image/webp;
base64,UklGRgABAABXRUJQVlA4TPQAAAAvB4AAEM1VICICHggACQAAAAB0iAEsGGAAAGYAgAAGZgAgAAAAAAADABgAMAAAYAAAAABIBAAAgAcCQAIAAABw/oFBAAAgAACAAQBgAAAAAAAAAAAAIGMMGCAYAIABGAge2KgADwTYBAAAAOD8+eKFcJ57AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBAgIPdAwE2AQAAADj/oB4CAhAQAAAAEgA4gMAQcAAAAAAAAAAgAAAAAgAIAIA4ABw8D9/98r8Q4l2cb3mHHdkf2jha69pDxlmzB9peXVtg15Q1bSJ0wI/4qZ4hf4K2bEJ0R4lELToT"
}
;var f=e.i(79921);
r.default.registerPlugin(i.ScrollTrigger);
let A=[{
src:l,alt:"Google logo"
}
,{
src:o,alt:"Adobe logo"
}
,{
src:c,alt:"JP logo"
}
,{
src:u,alt:"Pinterest logo"
}
,{
src:d,alt:"IBM logo"
}
,{
src:h,alt:"Intel logo"
}
],m=[...A,...A];
e.s(["default",0,function(){
let e=(0,a.useRef)(null),i=(0,a.useRef)(null);return(0,n.useGSAP)(()=>{
let t=i.current;if(!t)return;
let n=Array.from(t.querySelectorAll(".grid__item")),s=n.length;if(0===s)return;
let a=r.default.timeline({
defaults:{
ease:"none"
}
,scrollTrigger:{
trigger:e.current,start:"top 20%",end:"bottom center",scrub:!0
}

}
),l=globalThis.innerWidth>1024,o=l?1.5:4,c=l?1.5:3.5,u=o+.4,d=l?.4:.5,h=[];for(let e=0;e<s;){
let t=Math.min(s-e,r.default.utils.random(2,3,1));
h.push(Array.from({
length:t
}
,(t,r)=>e+r)),e+=t
}
h.forEach((e,t)=>{
let i=t*u;e.forEach((e,t)=>{
let s=n[e],u=i+t*d;
r.default.set(s,{
transformOrigin:"0% 0%",opacity:0,x:l?r.default.utils.random(-180,180):0,y:r.default.utils.random(-180,180),filter:"blur(10px)",z:l?r.default.utils.random(-2200,-1600):r.default.utils.random(-550,-400)
}
),a.to(s,{
z:0,opacity:1,filter:"blur(0px)",duration:o
}
,u).to(s,{
filter:"blur(10px)",opacity:0,z:l?r.default.utils.random(1400,1800):r.default.utils.random(500,700),duration:c
}
,u+o)
}
)
}
)
}
,{
scope:e
}
),(0,t.jsxs)("section",{
ref:e,id:"clientblur",className:"relative w-screen h-[240vh] text-center z-2  bg-[#070707]",children:[(0,t.jsx)("div",{
className:"sticky w-full top-0 h-screen flex items-center justify-center",children:(0,t.jsx)("div",{
className:"w-3/5 max-lg:w-4/5",children:(0,t.jsx)(f.default,{
stagger:.015,children:(0,t.jsx)("h3",{
className:"text-[5.5vw]  text-white leading-[1.2] max-lg:text-[7vw] max-md:text-[8vw]",children:"Trusted by Founders and Creatives, Built for Ambitious Brands."
}
)
}
)
}
)
}
),(0,t.jsx)("div",{
className:"left-0 sticky mt-[-100vh] top-0 z-20 h-screen w-screen overflow-hidden flex items-center justify-center",children:(0,t.jsx)("div",{
ref:i,className:"grid grid-cols-5 gap-[3vw] perspective-[350vw] max-md:grid-cols-3 max-md:gap-[6vw]",children:m.map((e,r)=>(0,t.jsx)("div",{
className:"grid__item flex h-[8vw] w-[14vw] items-center justify-center max-md:h-[22vw] max-md:w-[26vw]",children:(0,t.jsx)(s.default,{
className:"h-[4vw] w-full object-contain max-md:h-[11vw]",src:e.src,alt:e.alt,sizes:"(max-width: 48rem) 26vw, 14vw",quality:100
}
)
}
,r))
}
)
}
)]
}
)
}
],98279)
}
,27641,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(89970),n=e.i(33809);let s=(0,e.i(75254).default)("arrow-up-right",[["path",{
d:"M7 7h10v10",key:"1tivn9"
}
],["path",{
d:"M7 17 17 7",key:"1vkiza"
}
]]);var a=e.i(22016),l=e.i(56586),o=e.i(79921);
i.default.registerPlugin(n.default);
let c=[{
title:"Brand Identity",items:["Visual Systems","User Experience","Motion Design","Design Strategy"],href:"#"
}
,{
title:"Web Development",items:["React","Webflow Sites","Shopify","Custom Builds"],href:"#"
}
,{
title:"UI/UX Design",items:["Wireframing","Prototyping","User Research","Design Systems"],href:"#"
}
,{
title:"Motion & Animation",items:["GSAP Animations","Micro-interactions","Scroll Effects","Video Editing"],href:"#"
}
,{
title:"Brand Strategy",items:["Market Research","Positioning","Naming","Brand Guidelines"],href:"#"
}
];e.s(["default",0,()=>{
let e=(0,r.useRef)(null),u=(0,r.useRef)([]),d=(0,r.useRef)([]),h=(0,r.useRef)(c.map((e,t)=>({
value:0===t?100:-40
}
))),f=(0,l.usePrefersReducedMotion)(),[A,m]=(0,r.useState)(0);return(0,r.useEffect)(()=>{
let e=window.requestAnimationFrame(()=>n.default.refresh());return()=>window.cancelAnimationFrame(e)
}
,[f]),(0,r.useEffect)(()=>{
let t;
return f?void i.default.set(e.current,{
clearProps:"transform"
}
):(t=globalThis.innerWidth>1025?i.default.fromTo(e.current,{
xPercent:70
}
,{
xPercent:-33,ease:"none",scrollTrigger:{
trigger:"#services",start:"top 20%",end:"bottom bottom",scrub:!0
}

}
):globalThis.innerWidth<1025&&globalThis.innerWidth>541?i.default.fromTo(e.current,{
xPercent:50
}
,{
xPercent:-65,ease:"none",scrollTrigger:{
trigger:"#services",start:"top 20%",end:"bottom bottom",scrub:!0
}

}
):i.default.fromTo(e.current,{
xPercent:50
}
,{
xPercent:-77,ease:"none",scrollTrigger:{
trigger:"#services",start:"top 20%",end:"bottom bottom",scrub:!0
}

}
),()=>{
t?.scrollTrigger?.kill(),t?.kill()
}
)
}
,[f]),(0,t.jsxs)("section",{
className:`services-section relative w-screen bg-[#070707] text-white ${
f?"":"h-[275vh]"
}
`,id:"services",children:[(0,t.jsxs)("div",{
className:"relative pt-[6vw] px-[4vw] w-[60%] max-[1025px]:w-[85%] max-md:w-full  max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw]",children:[(0,t.jsx)(o.default,{
stagger:.015,children:(0,t.jsxs)("h2",{
className:"text-[5.5vw] leading-[1.2] max-[1025px]:text-[7vw] max-md:text-[9vw]",children:["Design That Speaks",(0,t.jsx)("br",{

}
),"to Your Audience"]
}
)
}
),(0,t.jsx)("div",{
className:"w-[75%] max-[1025px]:w-full mt-[1.5vw] max-[1025px]:mt-[5vw]",children:(0,t.jsx)(o.default,{
splitBy:"lines",children:(0,t.jsx)("p",{
className:"text-[1.25vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] ",children:"My practice is focused on solving real-world digital challenges with thoughtful design thinking. Whether you need to refine brand identity, streamline user experience, or create memorable interactive moments, my approach provides creativity, clarity, and consistency for clients across industries."
}
)
}
)
}
)]
}
),(0,t.jsx)("div",{
className:`services-sticky ${
f?"w-screen pb-[6vw]":"w-screen h-screen sticky top-0 overflow-hidden flex flex-col max-md:mt-[-30vw]"
}
`,children:(0,t.jsx)("div",{
className:f?"":"relative flex-1 flex items-center",children:(0,t.jsx)("div",{
ref:e,className:`services-row ${
f?"grid grid-cols-3 gap-[1.6vw] px-[4vw] pt-[5vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1":"flex gap-[1.6vw] px-[4vw] will-change-transform max-[1025px]:gap-[2.5vw] max-md:gap-[6vw]"
}
`,children:c.map((e,r)=>(0,t.jsxs)(a.default,{
href:e.href,onMouseEnter:()=>(e=>{
if(e===A)return;
let t=.45*!f;
i.default.to(h.current[A],{
value:-40,duration:t,ease:"power2.out",onUpdate:()=>{
u.current[A]?.style.setProperty("--reveal",`${
h.current[A].value
}
%`)
}

}
),i.default.to(h.current[e],{
value:100,duration:t,ease:"power2.out",onUpdate:()=>{
u.current[e]?.style.setProperty("--reveal",`${
h.current[e].value
}
%`)
}

}
),m(e)
}
)(r),className:`services-card ${
f?"relative rounded-lg p-[1.6vw] flex flex-col justify-between bg-[#161616] overflow-hidden min-h-[22vw] max-[1025px]:min-h-[32vw] max-[1025px]:p-[3vw] max-md:min-h-0 max-md:p-[5vw] border border-white/20":"relative w-[27vw] h-[30vw] shrink-0 rounded-lg p-[1.6vw] flex flex-col justify-between bg-[#161616] overflow-hidden max-[1025px]:w-[55vw] max-[1025px]:h-[65vw] max-[1025px]:p-[3vw] max-md:w-[75vw] max-md:h-[85vw] max-md:p-[5vw]  border border-white/20 group "
}
`,children:[(0,t.jsx)("div",{
ref:e=>{
u.current[r]=e,e?.style.setProperty("--reveal",`${
h.current[r].value
}
%`)
}
,className:"absolute inset-0 bg-linear-to-r from-[#F16B0D] to-[#E61416] radial-mask-bg-fill"
}
),(0,t.jsx)("div",{
className:"relative flex justify-end",children:(0,t.jsxs)("div",{
ref:e=>{
d.current[r]=e
}
,className:`w-[3vw] h-[3vw] rounded-full flex items-center justify-center border-white/30 border max-[1025px]:w-[7vw] max-[1025px]:h-[7vw] max-md:w-[9vw] max-md:h-[9vw] duration-300 ease-out overflow-hidden relative ${
A===r?"bg-white text-black":"text-white"
}
`,children:[(0,t.jsx)("div",{
className:"group-hover:translate-x-[150%] group-hover:translate-y-[-150%] duration-300 ease-out",children:(0,t.jsx)(s,{
size:20
}
)
}
),(0,t.jsx)("div",{
className:"absolute translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 duration-300 ease-out",children:(0,t.jsx)(s,{
size:20
}
)
}
)]
}
)
}
),(0,t.jsxs)("div",{
className:"relative",children:[(0,t.jsx)("h3",{
className:"text-[2.5vw] font-normal mb-[1vw] max-[1025px]:text-[5vw] max-md:text-[6.5vw]",children:e.title
}
),(0,t.jsx)("ul",{
className:"space-y-[0.4vw] list-disc pl-[0.5vw] max-[1025px]:space-y-[1vw] max-md:space-y-[1.8vw]",children:e.items.map((e,r)=>(0,t.jsxs)("li",{
className:"flex items-center gap-[0.7vw] text-[1.25vw] text-white max-[1025px]:text-[3vw] max-md:text-[4vw]",children:[(0,t.jsx)("span",{
className:"size-1.5 bg-white rounded-full"
}
)," ",(0,t.jsx)("span",{
children:e
}
)]
}
,e))
}
)]
}
)]
}
,e.title))
}
)
}
)
}
)]
}
)
}
],27641)
}
,30961,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(89970),n=e.i(75254);let s=(0,n.default)("rocket",[["path",{
d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"
}
],["path",{
d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",key:"u4xsad"
}
],["path",{
d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",key:"676m9"
}
],["path",{
d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",key:"92ym6u"
}
]]),a=(0,n.default)("sparkles",[["path",{
d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"
}
],["path",{
d:"M20 2v4",key:"1rf3ol"
}
],["path",{
d:"M22 4h-4",key:"gwowj6"
}
],["circle",{
cx:"4",cy:"20",r:"2",key:"6kqj1y"
}
]]),l=(0,n.default)("zap",[["path",{
d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"
}
]]);var o=e.i(56586),c=e.i(79921);
let u="#E8620F",d=[{
icon:s,title:"Rapid Project Delivery",description:"Launch custom website projects into the real world in as little as 48 hours."
}
,{
icon:a,title:"Precision & Aesthetics",description:"Meticulous design craftsmanship that offers complete control over layouts, typography, and every interactive detail."
}
,{
icon:l,title:"Future-Proofed Designs",description:"Stay ahead of shifting trends with an approach that seamlessly integrates with the latest innovations in interactive design and user experience craft."
}
];e.s(["default",0,()=>{
let e=(0,r.useRef)([]),n=(0,o.usePrefersReducedMotion)();return(0,r.useEffect)(()=>{
i.default.set(e.current,{
scaleX:0,transformOrigin:"left center"
}
)
}
,[]),(0,r.useEffect)(()=>{
if(n)return void i.default.set(".work-card",{
opacity:1,yPercent:0
}
);
let e=i.default.fromTo(".work-card",{
opacity:0,yPercent:10
}
,{
opacity:1,yPercent:0,stagger:.05,ease:"power2.out",scrollTrigger:{
trigger:"#work-with-me",start:"top top"
}

}
);return()=>{
e.scrollTrigger?.kill(),e.kill()
}

}
,[n]),(0,t.jsxs)("section",{
className:"relative w-screen bg-[#070707] text-white pt-[25vw] pb-[10vw] max-[1025px]:pt-[65vw] ",id:"work-with-me",children:[(0,t.jsxs)("div",{
className:"text-center mb-[5vw] max-md:mb-[10vw]",children:[(0,t.jsx)(c.default,{
stagger:.015,children:(0,t.jsx)("h2",{
className:"text-[5.5vw] max-[1025px]:text-[7vw] max-md:text-[9vw]",children:"Why Work With Me?"
}
)
}
),(0,t.jsx)(c.default,{
splitBy:"lines",children:(0,t.jsx)("p",{
className:"text-[1.25vw] text-white mt-[1.5vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] max-md:mt-[2vw]",children:"Fast-track your Digital Projects"
}
)
}
)]
}
),(0,t.jsx)("div",{
className:"grid grid-cols-3 max-[1025px]:grid-cols-1 ",children:d.map((r,n)=>{
let s=r.icon;return(0,t.jsxs)("div",{
onMouseEnter:()=>{
let t;(t=e.current[n])&&(i.default.killTweensOf(t),i.default.set(t,{
transformOrigin:"left center"
}
),i.default.to(t,{
scaleX:1,duration:.55,ease:"power2.out"
}
))
}
,onMouseLeave:()=>{
let t;(t=e.current[n])&&(i.default.killTweensOf(t),i.default.set(t,{
transformOrigin:"right center"
}
),i.default.to(t,{
scaleX:0,duration:.55,ease:"power2.out"
}
))
}
,className:"relative px-[4vw] pt-[2vw] pb-[3vw] h-[32vw] flex flex-col justify-between work-card max-[1025px]:h-auto max-[1025px]:py-[6vw] max-[1025px]:px-[5vw] ",children:[(0,t.jsxs)("div",{
children:[(0,t.jsx)(s,{
size:50,color:u,strokeWidth:1.5,className:"mb-[2.5vw] max-[1025px]:mb-[4vw]"
}
),(0,t.jsx)("h3",{
className:"text-[2vw] font-normal mb-[2.5vw] max-[1025px]:text-[4.2vw] max-md:text-[5.8vw] max-[1025px]:mb-[2vw]",children:r.title
}
),(0,t.jsx)("p",{
className:"text-[1.25vw] leading-normal text-white/80 max-[1025px]:text-[2.8vw] max-md:text-[4vw]",children:r.description
}
)]
}
),(0,t.jsx)("div",{
className:"relative mt-[3vw] h-px w-full bg-white/20",children:(0,t.jsx)("span",{
ref:t=>{
e.current[n]=t
}
,className:"absolute inset-0 h-px w-full will-change-transform",style:{
backgroundColor:u
}

}
)
}
)]
}
,r.title)
}
)
}
)]
}
)
}
],30961)
}
,14540,e=>{
e.v(t=>Promise.all(["static/chunks/30aewkq4-ztup.js"].map(t=>e.l(t))).then(()=>t(97554)))
}
,49228,e=>{
e.v(t=>Promise.all(["static/chunks/2hfeujf3u1dnr.js"].map(t=>e.l(t))).then(()=>t(3924)))
}
,71215,e=>{
"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(22016);
let n="#";
e.s(["default",0,({
btnText:e="",href:s=n,className:a="",textClassName:l="",bgColor:o="#ff6b00",textColor:c="#ffffff",hoverTextColor:u="#ff6b00",dotColor:d="#ffffff",...h
}
)=>{
let f=(0,r.useRef)(null),[A,m]=(0,r.useState)(!1),[p,g]=(0,r.useState)(!1),[x,w]=(0,r.useState)(!1),v=(0,r.useRef)(null);(0,r.useEffect)(()=>{
let t=f.current;if(!t)return;
let r=e||"";
t.innerHTML="",[...r].forEach((e,r)=>{
let i=document.createElement("span");
i.textContent=e,i.style.transitionDelay=x?"0s":`${
.01*r
}
s`," "===e&&(i.style.whiteSpace="pre"),t.appendChild(i)
}
)
}
,[e,x]),(0,r.useEffect)(()=>{
let e=f.current;
e&&Array.from(e.children||[]).forEach(e=>{
e.style.display="inline-block",e.style.position="relative",e.style.textShadow="0px 1.3em currentColor",e.style.transform="translateY(0em) rotate(0.001deg)",e.style.transition=x?"none":"transform 0.6s cubic-bezier(0.625, 0.05, 0, 1), color 0.6s cubic-bezier(0.625, 0.05, 0, 1)",e.style.willChange="transform"
}
)
}
,[e,x]),(0,r.useEffect)(()=>{
let e=window.matchMedia?.("(prefers-reduced-motion: reduce)"),t=e=>{
w("matches"in e?e.matches:e.currentTarget.matches)
}
;return e&&(t(e),e.addEventListener("change",t)),()=>e?.removeEventListener("change",t)
}
,[]),(0,r.useEffect)(()=>{
let e=window.matchMedia("(max-width: 639px)"),t=e=>{
g("matches"in e?e.matches:e.currentTarget.matches)
}
;return t(e),e.addEventListener("change",t),()=>e.removeEventListener("change",t)
}
,[]),(0,r.useEffect)(()=>()=>{
v.current&&window.clearTimeout(v.current)
}
,[]);let b=()=>{
let e=f.current;
e&&Array.from(e.children).forEach(e=>{
e.style.transform="translateY(-1.3em) rotate(0.001deg)"
}
),m(!0)
}
,y=()=>{
let e=f.current;
e&&Array.from(e.children).forEach(e=>{
e.style.transform="translateY(0em) rotate(0.001deg)"
}
),m(!1)
}
;return(0,t.jsxs)(i.default,{
href:s,...h,onMouseEnter:()=>{
p||b()
}
,onMouseLeave:()=>{
p||y()
}
,onPointerDown:e=>{
h.onPointerDown?.(e),p&&"mouse"!==e.pointerType&&(v.current&&window.clearTimeout(v.current),b(),v.current=window.setTimeout(()=>{
y(),v.current=null
}
,1e3))
}
,className:`group relative flex w-fit items-center justify-center gap-[0.9vw] h-[3.5vw] px-[2vw] rounded-full overflow-hidden whitespace-nowrap no-underline font-medium text-[1.5vw] transition-colors border-white/20! duration-500 motion-reduce:transition-none max-[1025px]:gap-[1.6vw] max-[1025px]:h-[8vw] max-[1025px]:px-[3.5vw] max-[1025px]:text-[3vw] max-[1025px]:font-normal max-[1025px]:motion-reduce:transition-none max-md:gap-[2.4vw] max-md:h-[12vw] max-md:px-[5vw] max-md:text-[4.2vw] max-md:motion-reduce:transition-none ${
a
}
`,style:{
background:o,color:A?u:c
}
,children:[(0,t.jsx)("span",{
"aria-hidden":!0,className:"relative z-10 flex shrink-0 items-center justify-center w-[0.5vw] h-[0.5vw] max-[1025px]:w-[1.5vw] max-[1025px]:h-[1.5vw] max-md:w-[2.3vw] max-md:h-[2.3vw]",style:{
marginTop:"0.08em"
}
,children:(0,t.jsx)("span",{
className:"absolute inset-0 rounded-full transition-transform duration-400 ease-in-out motion-reduce:transition-none max-[1025px]:motion-reduce:transition-none max-md:motion-reduce:transition-none",style:{
background:d,transform:A?"scale(120)":"scale(1)",transitionTimingFunction:"cubic-bezier(0.785, 0.135, 0.15, 0.86)"
}

}
)
}
),(0,t.jsx)("span",{
"aria-hidden":"true",className:`invisible block h-[1.3em] leading-[1.3] ${
l
}
`,children:e
}
),(0,t.jsx)("span",{
className:`absolute left-1/2 top-1/2 z-20 block h-[1.3em] -translate-x-1/2 -translate-y-1/2 overflow-hidden ${
l
}
`,style:{
marginTop:"0.08em"
}
,children:(0,t.jsx)("span",{
ref:f,className:"block leading-[1.3]","aria-hidden":!1,children:e
}
)
}
),(0,t.jsx)("span",{
"aria-hidden":"true",className:"block shrink-0 w-[0.5vw] max-[1025px]:w-[1.5vw] max-md:w-[2.3vw]"
}
)]
}
)
}
])
}
,56586,e=>{
"use strict";var t=e.i(71645);
let r="(prefers-reduced-motion: reduce)";function i(e){
let t=window.matchMedia(r);
return t.addEventListener("change",e),()=>t.removeEventListener("change",e)
}
function n(){
return window.matchMedia(r).matches
}
function s(){
return!1
}
e.s(["usePrefersReducedMotion",0,function(){
return(0,t.useSyncExternalStore)(i,n,s)
}
])
}
]);
