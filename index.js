(function(d){function m(b){p&&(q=b)}function h(b,a,c){var e=w(b);e.get=function(a,e){var d=parseInt(e,10)<<c;q||(f.isAddressable(d)||f.addBadAccessError(d),f.isDefined(d)||f.addUndefinedError(d));return b[e]};e.set=function(e,d,g){e=parseInt(d,10)<<c;q||(f.isAddressable(e)||f.addBadAccessError(e),f.setDefined(e,a,!0));b[d]=g;return!0};return Proxy.create(e)}function t(){m(!0);var b=d.M=new ArrayBuffer(268435456);p?(f.reset(268435456),d.U1=h(new Uint8Array(b),1,0),d.I1=h(new Int8Array(b),1,0),d.U2=
h(new Uint16Array(b),2,1),d.I2=h(new Int16Array(b),2,1),d.U4=h(new Uint32Array(b),4,2),d.I4=h(new Int32Array(b),4,2),d.F4=h(new Float32Array(b),4,2),d.F8=h(new Float64Array(b),8,3)):(d.U1=new Uint8Array(b),d.I1=new Int8Array(b),d.U2=new Uint16Array(b),d.I2=new Int16Array(b),d.U4=new Uint32Array(b),d.I4=new Int32Array(b),d.F4=new Float32Array(b),d.F8=new Float64Array(b));d.U4[0]=4;d.U4[1]=67108864;r=2;n=0;m(!1)}function v(b){var a=l.U4,c=(b>>2)-2,e=0;p&&(m(!0),f.isAlloc(b)?(f.setAlloc(b,!1),f.setAddressable(b,
a[c+1],!1),f.setDefined(b,a[c+1],!1)):f.addDoubleFreeError(b));for(e=n;!(c>e&&c<a[e]||e>=a[e]&&(c>e||c<a[e]));e=a[e]);c+2*a[c+1]===a[e]?(a[c+1]=(a[c+1]+a[a[e]+1]|0)>>>0,a[c]=a[a[e]]):a[c]=a[e];e+2*a[e+1]==c?(a[e+1]=(a[e+1]+a[c+1]|0)>>>0,a[e]=a[c]):a[e]=c;n=e;m(!1)}function w(b){return{getOwnPropertyDescriptor:function(a){a=Object.getOwnPropertyDescriptor(b,a);void 0!==a&&(a.configurable=!0);return a},getPropertyDescriptor:function(a){a=Object.getPropertyDescriptor(b,a);void 0!==a&&(a.configurable=
!0);return a},getOwnPropertyNames:function(){return Object.getOwnPropertyNames(b)},getPropertyNames:function(){return Object.getPropertyNames(b)},defineProperty:function(a,c){Object.defineProperty(b,a,c)},"delete":function(a){return delete b[a]},fix:function(){if(Object.isFrozen(b))return Object.getOwnPropertyNames(b).map(function(a){return Object.getOwnPropertyDescriptor(b,a)})},has:function(a){return a in b},hasOwn:function(a){return Object.prototype.hasOwnProperty.call(b,a)},get:function(a,c){return b[c]},
set:function(a,c,e){b[c]=e;return!0},enumerate:function(){var a=[],c;for(c in b)a.push(c);return a},keys:function(){return Object.keys(b)}}}var l=d,p=!1,u;u="undefined"!==typeof process?1:"undefined"!==typeof snarf?2:3;var f;1===u?(print=console.log,f=require("./memcheck.js")):f=2===u?(load("memcheck.js"),memcheck):memcheck;var r=0,n=0,q=!1;t();d.reset=t;d.memcpy=function(b,a,c){for(var e=l.U1,d,f,g=0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memcpy2=function(b,a,c){for(var e=l.U2,d,f,g=
0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memcpy4=function(b,a,c){for(var e=l.U4,d,f,g=0;g<c;g=g+1|0)e[d=b,b+=1,d]=e[f=a,a+=1,f];return b};d.memset=function(b,a,c){for(var e=l.U1,d=0;d<c;d=d+1|0)e[b]=a};d.memset2=function(b,a,c){for(var e=l.U2,d=0;d<c;d=d+1|0)e[b]=a};d.memset4=function(b,a,c){for(var d=l.U4,f=0;f<c;f=f+1|0)d[b]=a};d.malloc=function(b){var a=l.U4,c=0,e=0,h=((((b+8|0)-1|0)/8|0)+1|0)>>>0;m(!0);0===(e=n)&&(a[r]=n=e=r,a[r+1]=0);for(c=a[e];;e=c,c=a[c]){if(a[c+1]>=h)return a[c+
1]===h?a[e]=a[c]:(a[c+1]=(a[c+1]-h|0)>>>0,c+=2*a[c+1],a[c+1]=h),n=e,p&&(f.setAddressable(c+2<<2,b,!0),f.setAlloc(c+2<<2,!0)),m(!1),c+2<<2;if(c===n){c=h;e=l.U4;1024>c&&(c=1024);var k;k=d.U4;var g=(8*c|0)/4|0;if(66584576<k[0]+g)k=0;else{var q=k[0];k[0]+=g;k=q}0===k?c=0:(e[k+1]=c,p&&(f.setAlloc(k+2<<2,!0),f.setAddressable(k+2<<2,c,!0)),v(k+2<<2),m(!0),c=n);if(0===c)return m(!1),0}}};d.free=v;d.set_memcheck=function(b){p=b;t()};d.memcheck=f;d.memcheck_call_pop=f.memcheck_call_pop;d.memcheck_call_push=
f.memcheck_call_push;d.memcheck_call_reset=f.memcheck_call_reset}).call(this,"undefined"===typeof exports?memory={}:exports);