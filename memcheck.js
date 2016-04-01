(function(b){function g(a,r,b){for(var c,d=0;d<r;c=d,d=(d+1|0)>>>0,c)f[a+d]|=b}function h(a,b,c){for(var e,d=0;d<b;e=d,d=(d+1|0)>>>0,e)f[a+d]&=~c}function k(){return c.errors.bad_access}function l(){return c.errors.undef_access}function m(){return c.errors.double_free}function n(){return c.used.map(function(a,b){if(a)return{membyte:b,trace:a}}).filter(function(a,b){if(a)return a})}var p=!1;1===("undefined"!==typeof process?1:"undefined"!==typeof snarf?2:3)&&(print=console.log);var c={},q,f,e=[];b.setAddressable=
function(a,b,c){c?g(a,b,1):h(a,b,1)};b.isAddressable=function(a){return f[a]&1?!0:!1};b.setDefined=function(a,b,c){c?g(a,b,2):h(a,b,2)};b.isDefined=function(a){return f[a]&2?!0:!1};b.setAlloc=function(a,b){b?(g(a,1,4),c.used[a]=e.slice(0)):(h(a,1,4),c.used[a]=void 0)};b.isAlloc=function(a){return f[a]&4?!0:!1};b.addDoubleFreeError=function(a){c.errors.double_free.push({membyte:a,trace:e.slice(0)})};b.addBadAccessError=function(a){c.errors.bad_access.push({membyte:a,trace:e.slice(0)})};b.addUndefinedError=
function(a){c.errors.undef_access.push({membyte:a,trace:e.slice(0)})};b.getBadAccesses=k;b.getBadUndefined=l;b.getBadFrees=m;b.getLeaks=n;b.report=function(a){function b(c){return(0<=a?c.slice(0,a):c).map(function(a,b){var c;c=0===a.trace.length?"at <empty stack>":a.trace.reverse().join("\n\tat ");return"address "+a.membyte+"\n\t"+c}).join("\n")}var c="== Memory Leaks ==\n"+b(n()),e="== Access of unallocated memory ==\n"+b(k()),d="== Access of uninitialized memory ==\n"+b(l()),f="== Free of unallocated memory ==\n"+
b(m());return[e,d,f,c].join("\n\n")};b.reset=function(a){q=new ArrayBuffer(a);f=new Uint8Array(q);b.enabled=p=!0;c={used:[],errors:{double_free:[],bad_access:[],undef_access:[]}}};b.enabled=p;b.memcheck_call_pop=function(){e.pop()};b.memcheck_call_push=function(a,b,c,f){e.push(a+" ("+b+".ljs:"+c+":"+f+")")};b.memcheck_call_reset=function(a,b,c){a=e.lastIndexOf(a+":"+b+":"+c);-1!==a&&(e=e.slice(0,a+1))};b.getCallstack=function(){return e}}).call(this,"undefined"===typeof exports?memcheck={}:exports);