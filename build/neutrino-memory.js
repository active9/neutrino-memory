(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.neutrinoMemory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
(function(d){function m(b){p&&(q=b)}function h(b,a,c){var e=w(b);e.get=function(a,e){var d=parseInt(e,10)<<c;q||(f.isAddressable(d)||f.addBadAccessError(d),f.isDefined(d)||f.addUndefinedError(d));return b[e]};e.set=function(e,d,g){e=parseInt(d,10)<<c;q||(f.isAddressable(e)||f.addBadAccessError(e),f.setDefined(e,a,!0));b[d]=g;return!0};return Proxy.create(e)}function t(){m(!0);var b=d.M=new ArrayBuffer(268435456);p?(f.reset(268435456),d.U1=h(new Uint8Array(b),1,0),d.I1=h(new Int8Array(b),1,0),d.U2=
h(new Uint16Array(b),2,1),d.I2=h(new Int16Array(b),2,1),d.U4=h(new Uint32Array(b),4,2),d.I4=h(new Int32Array(b),4,2),d.F4=h(new Float32Array(b),4,2),d.F8=h(new Float64Array(b),8,3)):(d.U1=new Uint8Array(b),d.I1=new Int8Array(b),d.U2=new Uint16Array(b),d.I2=new Int16Array(b),d.U4=new Uint32Array(b),d.I4=new Int32Array(b),d.F4=new Float32Array(b),d.F8=new Float64Array(b));d.U4[0]=4;d.U4[1]=67108864;r=2;n=0;m(!1)}function v(b){var a=l.U4,c=(b>>2)-2,e=0;p&&(m(!0),f.isAlloc(b)?(f.setAlloc(b,!1),f.setAddressable(b,
a[c+1],!1),f.setDefined(b,a[c+1],!1)):f.addDoubleFreeError(b));for(e=n;!(c>e&&c<a[e]||e>=a[e]&&(c>e||c<a[e]));e=a[e]);c+2*a[c+1]===a[e]?(a[c+1]=(a[c+1]+a[a[e]+1]|0)>>>0,a[c]=a[a[e]]):a[c]=a[e];e+2*a[e+1]==c?(a[e+1]=(a[e+1]+a[c+1]|0)>>>0,a[e]=a[c]):a[e]=c;n=e;m(!1)}function w(b){return{getOwnPropertyDescriptor:function(a){a=Object.getOwnPropertyDescriptor(b,a);void 0!==a&&(a.configurable=!0);return a},getPropertyDescriptor:function(a){a=Object.getPropertyDescriptor(b,a);void 0!==a&&(a.configurable=
!0);return a},getOwnPropertyNames:function(){return Object.getOwnPropertyNames(b)},getPropertyNames:function(){return Object.getPropertyNames(b)},defineProperty:function(a,c){Object.defineProperty(b,a,c)},"delete":function(a){return delete b[a]},fix:function(){if(Object.isFrozen(b))return Object.getOwnPropertyNames(b).map(function(a){return Object.getOwnPropertyDescriptor(b,a)})},has:function(a){return a in b},hasOwn:function(a){return Object.prototype.hasOwnProperty.call(b,a)},get:function(a,c){return b[c]},
set:function(a,c,e){b[c]=e;return!0},enumerate:function(){var a=[],c;for(c in b)a.push(c);return a},keys:function(){return Object.keys(b)}}}var l=d,p=!1,u;u="undefined"!==typeof process?1:"undefined"!==typeof snarf?2:3;var f;1===u?(print=console.log,f=require("./memcheck.js")):f=2===u?(load("memcheck.js"),memcheck):memcheck;var r=0,n=0,q=!1;t();d.reset=t;d.memcpy=function(b,a,c){for(var e=l.U1,d,f,g=0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memcpy2=function(b,a,c){for(var e=l.U2,d,f,g=
0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memcpy4=function(b,a,c){for(var e=l.U4,d,f,g=0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memset=function(b,a,c){for(var e=l.U1,d=0;d<c;d=d+1|0)e[b]=a};d.memset2=function(b,a,c){for(var e=l.U2,d=0;d<c;d=d+1|0)e[b]=a};d.memset4=function(b,a,c){for(var d=l.U4,f=0;f<c;f=f+1|0)d[b]=a};d.malloc=function(b){var a=l.U4,c=0,e=0,h=((((b+8|0)-1|0)/8|0)+1|0)>>>0;m(!0);0===(e=n)&&(a[r]=n=e=r,a[r+1]=0);for(c=a[e];;e=c,c=a[c]){if(a[c+1]>=h)return a[c+
1]===h?a[e]=a[c]:(a[c+1]=(a[c+1]-h|0)>>>0,c+=2*a[c+1],a[c+1]=h),n=e,p&&(f.setAddressable(c+2<<2,b,!0),f.setAlloc(c+2<<2,!0)),m(!1),c+2<<2;if(c===n){c=h;e=l.U4;1024>c&&(c=1024);var k;k=d.U4;var g=(8*c|0)/4|0;if(66584576<k[0]+g)k=0;else{var q=k[0];k[0]+=g;k=q}0===k?c=0:(e[k+1]=c,p&&(f.setAlloc(k+2<<2,!0),f.setAddressable(k+2<<2,c,!0)),v(k+2<<2),m(!0),c=n);if(0===c)return m(!1),0}}};d.free=v;d.set_memcheck=function(b){p=b;t()};d.memcheck=f;d.memcheck_call_pop=f.memcheck_call_pop;d.memcheck_call_push=
f.memcheck_call_push;d.memcheck_call_reset=f.memcheck_call_reset}).call(this,"undefined"===typeof exports?memory={}:exports);
}).call(this,require('_process'))

},{"./memcheck.js":3,"_process":1}],3:[function(require,module,exports){
(function (process){
(function(b){function g(a,r,b){for(var c,d=0;d<r;c=d,d=(d+1|0)>>>0,c)f[a+d]|=b}function h(a,b,c){for(var e,d=0;d<b;e=d,d=(d+1|0)>>>0,e)f[a+d]&=~c}function k(){return c.errors.bad_access}function l(){return c.errors.undef_access}function m(){return c.errors.double_free}function n(){return c.used.map(function(a,b){if(a)return{membyte:b,trace:a}}).filter(function(a,b){if(a)return a})}var p=!1;1===("undefined"!==typeof process?1:"undefined"!==typeof snarf?2:3)&&(print=console.log);var c={},q,f,e=[];b.setAddressable=
function(a,b,c){c?g(a,b,1):h(a,b,1)};b.isAddressable=function(a){return f[a]&1?!0:!1};b.setDefined=function(a,b,c){c?g(a,b,2):h(a,b,2)};b.isDefined=function(a){return f[a]&2?!0:!1};b.setAlloc=function(a,b){b?(g(a,1,4),c.used[a]=e.slice(0)):(h(a,1,4),c.used[a]=void 0)};b.isAlloc=function(a){return f[a]&4?!0:!1};b.addDoubleFreeError=function(a){c.errors.double_free.push({membyte:a,trace:e.slice(0)})};b.addBadAccessError=function(a){c.errors.bad_access.push({membyte:a,trace:e.slice(0)})};b.addUndefinedError=
function(a){c.errors.undef_access.push({membyte:a,trace:e.slice(0)})};b.getBadAccesses=k;b.getBadUndefined=l;b.getBadFrees=m;b.getLeaks=n;b.report=function(a){function b(c){return(0<=a?c.slice(0,a):c).map(function(a,b){var c;c=0===a.trace.length?"at <empty stack>":a.trace.reverse().join("\n\tat ");return"address "+a.membyte+"\n\t"+c}).join("\n")}var c="== Memory Leaks ==\n"+b(n()),e="== Access of unallocated memory ==\n"+b(k()),d="== Access of uninitialized memory ==\n"+b(l()),f="== Free of unallocated memory ==\n"+
b(m());return[e,d,f,c].join("\n\n")};b.reset=function(a){q=new ArrayBuffer(a);f=new Uint8Array(q);b.enabled=p=!0;c={used:[],errors:{double_free:[],bad_access:[],undef_access:[]}}};b.enabled=p;b.memcheck_call_pop=function(){e.pop()};b.memcheck_call_push=function(a,b,c,f){e.push(a+" ("+b+".ljs:"+c+":"+f+")")};b.memcheck_call_reset=function(a,b,c){a=e.lastIndexOf(a+":"+b+":"+c);-1!==a&&(e=e.slice(0,a+1))};b.getCallstack=function(){return e}}).call(this,"undefined"===typeof exports?memcheck={}:exports);
}).call(this,require('_process'))

},{"_process":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1Byb2dyYW0gRmlsZXMvbm9kZWpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Qcm9ncmFtIEZpbGVzL25vZGVqcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiaW5kZXguanMiLCJtZW1jaGVjay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uKGQpe2Z1bmN0aW9uIG0oYil7cCYmKHE9Yil9ZnVuY3Rpb24gaChiLGEsYyl7dmFyIGU9dyhiKTtlLmdldD1mdW5jdGlvbihhLGUpe3ZhciBkPXBhcnNlSW50KGUsMTApPDxjO3F8fChmLmlzQWRkcmVzc2FibGUoZCl8fGYuYWRkQmFkQWNjZXNzRXJyb3IoZCksZi5pc0RlZmluZWQoZCl8fGYuYWRkVW5kZWZpbmVkRXJyb3IoZCkpO3JldHVybiBiW2VdfTtlLnNldD1mdW5jdGlvbihlLGQsZyl7ZT1wYXJzZUludChkLDEwKTw8YztxfHwoZi5pc0FkZHJlc3NhYmxlKGUpfHxmLmFkZEJhZEFjY2Vzc0Vycm9yKGUpLGYuc2V0RGVmaW5lZChlLGEsITApKTtiW2RdPWc7cmV0dXJuITB9O3JldHVybiBQcm94eS5jcmVhdGUoZSl9ZnVuY3Rpb24gdCgpe20oITApO3ZhciBiPWQuTT1uZXcgQXJyYXlCdWZmZXIoMjY4NDM1NDU2KTtwPyhmLnJlc2V0KDI2ODQzNTQ1NiksZC5VMT1oKG5ldyBVaW50OEFycmF5KGIpLDEsMCksZC5JMT1oKG5ldyBJbnQ4QXJyYXkoYiksMSwwKSxkLlUyPVxuaChuZXcgVWludDE2QXJyYXkoYiksMiwxKSxkLkkyPWgobmV3IEludDE2QXJyYXkoYiksMiwxKSxkLlU0PWgobmV3IFVpbnQzMkFycmF5KGIpLDQsMiksZC5JND1oKG5ldyBJbnQzMkFycmF5KGIpLDQsMiksZC5GND1oKG5ldyBGbG9hdDMyQXJyYXkoYiksNCwyKSxkLkY4PWgobmV3IEZsb2F0NjRBcnJheShiKSw4LDMpKTooZC5VMT1uZXcgVWludDhBcnJheShiKSxkLkkxPW5ldyBJbnQ4QXJyYXkoYiksZC5VMj1uZXcgVWludDE2QXJyYXkoYiksZC5JMj1uZXcgSW50MTZBcnJheShiKSxkLlU0PW5ldyBVaW50MzJBcnJheShiKSxkLkk0PW5ldyBJbnQzMkFycmF5KGIpLGQuRjQ9bmV3IEZsb2F0MzJBcnJheShiKSxkLkY4PW5ldyBGbG9hdDY0QXJyYXkoYikpO2QuVTRbMF09NDtkLlU0WzFdPTY3MTA4ODY0O3I9MjtuPTA7bSghMSl9ZnVuY3Rpb24gdihiKXt2YXIgYT1sLlU0LGM9KGI+PjIpLTIsZT0wO3AmJihtKCEwKSxmLmlzQWxsb2MoYik/KGYuc2V0QWxsb2MoYiwhMSksZi5zZXRBZGRyZXNzYWJsZShiLFxuYVtjKzFdLCExKSxmLnNldERlZmluZWQoYixhW2MrMV0sITEpKTpmLmFkZERvdWJsZUZyZWVFcnJvcihiKSk7Zm9yKGU9bjshKGM+ZSYmYzxhW2VdfHxlPj1hW2VdJiYoYz5lfHxjPGFbZV0pKTtlPWFbZV0pO2MrMiphW2MrMV09PT1hW2VdPyhhW2MrMV09KGFbYysxXSthW2FbZV0rMV18MCk+Pj4wLGFbY109YVthW2VdXSk6YVtjXT1hW2VdO2UrMiphW2UrMV09PWM/KGFbZSsxXT0oYVtlKzFdK2FbYysxXXwwKT4+PjAsYVtlXT1hW2NdKTphW2VdPWM7bj1lO20oITEpfWZ1bmN0aW9uIHcoYil7cmV0dXJue2dldE93blByb3BlcnR5RGVzY3JpcHRvcjpmdW5jdGlvbihhKXthPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYixhKTt2b2lkIDAhPT1hJiYoYS5jb25maWd1cmFibGU9ITApO3JldHVybiBhfSxnZXRQcm9wZXJ0eURlc2NyaXB0b3I6ZnVuY3Rpb24oYSl7YT1PYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGIsYSk7dm9pZCAwIT09YSYmKGEuY29uZmlndXJhYmxlPVxuITApO3JldHVybiBhfSxnZXRPd25Qcm9wZXJ0eU5hbWVzOmZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpfSxnZXRQcm9wZXJ0eU5hbWVzOmZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzKGIpfSxkZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbihhLGMpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShiLGEsYyl9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIGRlbGV0ZSBiW2FdfSxmaXg6ZnVuY3Rpb24oKXtpZihPYmplY3QuaXNGcm96ZW4oYikpcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGIpLm1hcChmdW5jdGlvbihhKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiLGEpfSl9LGhhczpmdW5jdGlvbihhKXtyZXR1cm4gYSBpbiBifSxoYXNPd246ZnVuY3Rpb24oYSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLGEpfSxnZXQ6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYltjXX0sXG5zZXQ6ZnVuY3Rpb24oYSxjLGUpe2JbY109ZTtyZXR1cm4hMH0sZW51bWVyYXRlOmZ1bmN0aW9uKCl7dmFyIGE9W10sYztmb3IoYyBpbiBiKWEucHVzaChjKTtyZXR1cm4gYX0sa2V5czpmdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyhiKX19fXZhciBsPWQscD0hMSx1O3U9XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBwcm9jZXNzPzE6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBzbmFyZj8yOjM7dmFyIGY7MT09PXU/KHByaW50PWNvbnNvbGUubG9nLGY9cmVxdWlyZShcIi4vbWVtY2hlY2suanNcIikpOmY9Mj09PXU/KGxvYWQoXCJtZW1jaGVjay5qc1wiKSxtZW1jaGVjayk6bWVtY2hlY2s7dmFyIHI9MCxuPTAscT0hMTt0KCk7ZC5yZXNldD10O2QubWVtY3B5PWZ1bmN0aW9uKGIsYSxjKXtmb3IodmFyIGU9bC5VMSxkLGYsZz0wO2c8YztnPWcrMXwwKWVbZD1iLGIrPTEsZF09ZVtmPWEsYSs9MSxmXTtyZXR1cm4gYn07ZC5tZW1jcHkyPWZ1bmN0aW9uKGIsYSxjKXtmb3IodmFyIGU9bC5VMixkLGYsZz1cbjA7ZzxjO2c9ZysxfDApZVtkPWIsYis9MSxkXT1lW2Y9YSxhKz0xLGZdO3JldHVybiBifTtkLm1lbWNweTQ9ZnVuY3Rpb24oYixhLGMpe2Zvcih2YXIgZT1sLlU0LGQsZixnPTA7ZzxjO2c9ZysxfDApZVtkPWIsYis9MSxkXT1lW2Y9YSxhKz0xLGZdO3JldHVybiBifTtkLm1lbXNldD1mdW5jdGlvbihiLGEsYyl7Zm9yKHZhciBlPWwuVTEsZD0wO2Q8YztkPWQrMXwwKWVbYl09YX07ZC5tZW1zZXQyPWZ1bmN0aW9uKGIsYSxjKXtmb3IodmFyIGU9bC5VMixkPTA7ZDxjO2Q9ZCsxfDApZVtiXT1hfTtkLm1lbXNldDQ9ZnVuY3Rpb24oYixhLGMpe2Zvcih2YXIgZD1sLlU0LGY9MDtmPGM7Zj1mKzF8MClkW2JdPWF9O2QubWFsbG9jPWZ1bmN0aW9uKGIpe3ZhciBhPWwuVTQsYz0wLGU9MCxoPSgoKChiKzh8MCktMXwwKS84fDApKzF8MCk+Pj4wO20oITApOzA9PT0oZT1uKSYmKGFbcl09bj1lPXIsYVtyKzFdPTApO2ZvcihjPWFbZV07O2U9YyxjPWFbY10pe2lmKGFbYysxXT49aClyZXR1cm4gYVtjK1xuMV09PT1oP2FbZV09YVtjXTooYVtjKzFdPShhW2MrMV0taHwwKT4+PjAsYys9MiphW2MrMV0sYVtjKzFdPWgpLG49ZSxwJiYoZi5zZXRBZGRyZXNzYWJsZShjKzI8PDIsYiwhMCksZi5zZXRBbGxvYyhjKzI8PDIsITApKSxtKCExKSxjKzI8PDI7aWYoYz09PW4pe2M9aDtlPWwuVTQ7MTAyND5jJiYoYz0xMDI0KTt2YXIgaztrPWQuVTQ7dmFyIGc9KDgqY3wwKS80fDA7aWYoNjY1ODQ1NzY8a1swXStnKWs9MDtlbHNle3ZhciBxPWtbMF07a1swXSs9ZztrPXF9MD09PWs/Yz0wOihlW2srMV09YyxwJiYoZi5zZXRBbGxvYyhrKzI8PDIsITApLGYuc2V0QWRkcmVzc2FibGUoaysyPDwyLGMsITApKSx2KGsrMjw8MiksbSghMCksYz1uKTtpZigwPT09YylyZXR1cm4gbSghMSksMH19fTtkLmZyZWU9djtkLnNldF9tZW1jaGVjaz1mdW5jdGlvbihiKXtwPWI7dCgpfTtkLm1lbWNoZWNrPWY7ZC5tZW1jaGVja19jYWxsX3BvcD1mLm1lbWNoZWNrX2NhbGxfcG9wO2QubWVtY2hlY2tfY2FsbF9wdXNoPVxuZi5tZW1jaGVja19jYWxsX3B1c2g7ZC5tZW1jaGVja19jYWxsX3Jlc2V0PWYubWVtY2hlY2tfY2FsbF9yZXNldH0pLmNhbGwodGhpcyxcInVuZGVmaW5lZFwiPT09dHlwZW9mIGV4cG9ydHM/bWVtb3J5PXt9OmV4cG9ydHMpOyIsIihmdW5jdGlvbihiKXtmdW5jdGlvbiBnKGEscixiKXtmb3IodmFyIGMsZD0wO2Q8cjtjPWQsZD0oZCsxfDApPj4+MCxjKWZbYStkXXw9Yn1mdW5jdGlvbiBoKGEsYixjKXtmb3IodmFyIGUsZD0wO2Q8YjtlPWQsZD0oZCsxfDApPj4+MCxlKWZbYStkXSY9fmN9ZnVuY3Rpb24gaygpe3JldHVybiBjLmVycm9ycy5iYWRfYWNjZXNzfWZ1bmN0aW9uIGwoKXtyZXR1cm4gYy5lcnJvcnMudW5kZWZfYWNjZXNzfWZ1bmN0aW9uIG0oKXtyZXR1cm4gYy5lcnJvcnMuZG91YmxlX2ZyZWV9ZnVuY3Rpb24gbigpe3JldHVybiBjLnVzZWQubWFwKGZ1bmN0aW9uKGEsYil7aWYoYSlyZXR1cm57bWVtYnl0ZTpiLHRyYWNlOmF9fSkuZmlsdGVyKGZ1bmN0aW9uKGEsYil7aWYoYSlyZXR1cm4gYX0pfXZhciBwPSExOzE9PT0oXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBwcm9jZXNzPzE6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBzbmFyZj8yOjMpJiYocHJpbnQ9Y29uc29sZS5sb2cpO3ZhciBjPXt9LHEsZixlPVtdO2Iuc2V0QWRkcmVzc2FibGU9XG5mdW5jdGlvbihhLGIsYyl7Yz9nKGEsYiwxKTpoKGEsYiwxKX07Yi5pc0FkZHJlc3NhYmxlPWZ1bmN0aW9uKGEpe3JldHVybiBmW2FdJjE/ITA6ITF9O2Iuc2V0RGVmaW5lZD1mdW5jdGlvbihhLGIsYyl7Yz9nKGEsYiwyKTpoKGEsYiwyKX07Yi5pc0RlZmluZWQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGZbYV0mMj8hMDohMX07Yi5zZXRBbGxvYz1mdW5jdGlvbihhLGIpe2I/KGcoYSwxLDQpLGMudXNlZFthXT1lLnNsaWNlKDApKTooaChhLDEsNCksYy51c2VkW2FdPXZvaWQgMCl9O2IuaXNBbGxvYz1mdW5jdGlvbihhKXtyZXR1cm4gZlthXSY0PyEwOiExfTtiLmFkZERvdWJsZUZyZWVFcnJvcj1mdW5jdGlvbihhKXtjLmVycm9ycy5kb3VibGVfZnJlZS5wdXNoKHttZW1ieXRlOmEsdHJhY2U6ZS5zbGljZSgwKX0pfTtiLmFkZEJhZEFjY2Vzc0Vycm9yPWZ1bmN0aW9uKGEpe2MuZXJyb3JzLmJhZF9hY2Nlc3MucHVzaCh7bWVtYnl0ZTphLHRyYWNlOmUuc2xpY2UoMCl9KX07Yi5hZGRVbmRlZmluZWRFcnJvcj1cbmZ1bmN0aW9uKGEpe2MuZXJyb3JzLnVuZGVmX2FjY2Vzcy5wdXNoKHttZW1ieXRlOmEsdHJhY2U6ZS5zbGljZSgwKX0pfTtiLmdldEJhZEFjY2Vzc2VzPWs7Yi5nZXRCYWRVbmRlZmluZWQ9bDtiLmdldEJhZEZyZWVzPW07Yi5nZXRMZWFrcz1uO2IucmVwb3J0PWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYyl7cmV0dXJuKDA8PWE/Yy5zbGljZSgwLGEpOmMpLm1hcChmdW5jdGlvbihhLGIpe3ZhciBjO2M9MD09PWEudHJhY2UubGVuZ3RoP1wiYXQgPGVtcHR5IHN0YWNrPlwiOmEudHJhY2UucmV2ZXJzZSgpLmpvaW4oXCJcXG5cXHRhdCBcIik7cmV0dXJuXCJhZGRyZXNzIFwiK2EubWVtYnl0ZStcIlxcblxcdFwiK2N9KS5qb2luKFwiXFxuXCIpfXZhciBjPVwiPT0gTWVtb3J5IExlYWtzID09XFxuXCIrYihuKCkpLGU9XCI9PSBBY2Nlc3Mgb2YgdW5hbGxvY2F0ZWQgbWVtb3J5ID09XFxuXCIrYihrKCkpLGQ9XCI9PSBBY2Nlc3Mgb2YgdW5pbml0aWFsaXplZCBtZW1vcnkgPT1cXG5cIitiKGwoKSksZj1cIj09IEZyZWUgb2YgdW5hbGxvY2F0ZWQgbWVtb3J5ID09XFxuXCIrXG5iKG0oKSk7cmV0dXJuW2UsZCxmLGNdLmpvaW4oXCJcXG5cXG5cIil9O2IucmVzZXQ9ZnVuY3Rpb24oYSl7cT1uZXcgQXJyYXlCdWZmZXIoYSk7Zj1uZXcgVWludDhBcnJheShxKTtiLmVuYWJsZWQ9cD0hMDtjPXt1c2VkOltdLGVycm9yczp7ZG91YmxlX2ZyZWU6W10sYmFkX2FjY2VzczpbXSx1bmRlZl9hY2Nlc3M6W119fX07Yi5lbmFibGVkPXA7Yi5tZW1jaGVja19jYWxsX3BvcD1mdW5jdGlvbigpe2UucG9wKCl9O2IubWVtY2hlY2tfY2FsbF9wdXNoPWZ1bmN0aW9uKGEsYixjLGYpe2UucHVzaChhK1wiIChcIitiK1wiLmxqczpcIitjK1wiOlwiK2YrXCIpXCIpfTtiLm1lbWNoZWNrX2NhbGxfcmVzZXQ9ZnVuY3Rpb24oYSxiLGMpe2E9ZS5sYXN0SW5kZXhPZihhK1wiOlwiK2IrXCI6XCIrYyk7LTEhPT1hJiYoZT1lLnNsaWNlKDAsYSsxKSl9O2IuZ2V0Q2FsbHN0YWNrPWZ1bmN0aW9uKCl7cmV0dXJuIGV9fSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCI9PT10eXBlb2YgZXhwb3J0cz9tZW1jaGVjaz17fTpleHBvcnRzKTsiXX0=
