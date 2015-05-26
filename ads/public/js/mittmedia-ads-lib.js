/* SWFObject v2.2 <http://code.google.com/p/swfobject/>
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject_Fusion=function(){function x(){if(!v){try{var a=d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));a.parentNode.removeChild(a)}catch(b){return}v=!0;for(var a=A.length,c=0;c<a;c++)A[c]()}}function O(a){v?a():A[A.length]=a}function P(a){if(typeof p.addEventListener!=k)p.addEventListener("load",a,!1);else if(typeof d.addEventListener!=k)d.addEventListener("load",a,!1);else if(typeof p.attachEvent!=k)X(p,"onload",a);else if("function"==typeof p.onload){var b=p.onload;
p.onload=function(){b();a()}}else p.onload=a}function Y(){var a=d.getElementsByTagName("body")[0],b=d.createElement(u);b.setAttribute("type",B);var c=a.appendChild(b);if(c){var f=0;(function(){if(typeof c.GetVariable!=k){var g=c.GetVariable("$version");g&&(g=g.split(" ")[1].split(","),e.pv=[parseInt(g[0],10),parseInt(g[1],10),parseInt(g[2],10)])}else if(10>f){f++;setTimeout(arguments.callee,10);return}a.removeChild(b);c=null;G()})()}else G()}function G(){var a=s.length;if(0<a)for(var b=0;b<a;b++){var c=
s[b].id,f=s[b].callbackFn,g={success:!1,id:c};if(0<e.pv[0]){var d=q(c);if(d)if(!C(s[b].swfVersion)||e.wk&&312>e.wk)if(s[b].expressInstall&&H()){g={};g.data=s[b].expressInstall;g.width=d.getAttribute("width")||"0";g.height=d.getAttribute("height")||"0";d.getAttribute("class")&&(g.styleclass=d.getAttribute("class"));d.getAttribute("align")&&(g.align=d.getAttribute("align"));for(var h={},d=d.getElementsByTagName("param"),l=d.length,m=0;m<l;m++)"movie"!=d[m].getAttribute("name").toLowerCase()&&(h[d[m].getAttribute("name")]=
d[m].getAttribute("value"));I(g,h,c,f)}else Z(d),f&&f(g);else w(c,!0),f&&(g.success=!0,g.ref=J(c),f(g))}else w(c,!0),f&&((c=J(c))&&typeof c.SetVariable!=k&&(g.success=!0,g.ref=c),f(g))}}function J(a){var b=null;(a=q(a))&&"OBJECT"==a.nodeName&&(typeof a.SetVariable!=k?b=a:(a=a.getElementsByTagName(u)[0])&&(b=a));return b}function H(){return!D&&C("6.0.65")&&(e.win||e.mac)&&!(e.wk&&312>e.wk)}function I(a,b,c,f){D=!0;K=f||null;Q={success:!1,id:c};var g=q(c);if(g){"OBJECT"==g.nodeName?(z=L(g),E=null):
(z=g,E=c);a.id=R;if(typeof a.width==k||!/%$/.test(a.width)&&310>parseInt(a.width,10))a.width="310";if(typeof a.height==k||!/%$/.test(a.height)&&137>parseInt(a.height,10))a.height="137";d.title=d.title.slice(0,47)+" - Flash Player Installation";f=e.ie&&e.win?"ActiveX":"PlugIn";f="MMredirectURL="+p.location.toString().replace(/&/g,"%26")+"&MMplayerType="+f+"&MMdoctitle="+d.title;b.flashvars=typeof b.flashvars!=k?b.flashvars+("&"+f):f;e.ie&&e.win&&4!=g.readyState&&(f=d.createElement("div"),c+="SWFObjectNew",
f.setAttribute("id",c),g.parentNode.insertBefore(f,g),g.style.display="none",function(){4==g.readyState?g.parentNode.removeChild(g):setTimeout(arguments.callee,10)}());M(a,b,c)}}function Z(a){if(e.ie&&e.win&&4!=a.readyState){var b=d.createElement("div");a.parentNode.insertBefore(b,a);b.parentNode.replaceChild(L(a),b);a.style.display="none";(function(){4==a.readyState?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)})()}else a.parentNode.replaceChild(L(a),a)}function L(a){var b=d.createElement("div");
if(e.win&&e.ie)b.innerHTML=a.innerHTML;else if(a=a.getElementsByTagName(u)[0])if(a=a.childNodes)for(var c=a.length,f=0;f<c;f++)1==a[f].nodeType&&"PARAM"==a[f].nodeName||8==a[f].nodeType||b.appendChild(a[f].cloneNode(!0));return b}function M(a,b,c){var f,g=q(c);if(e.wk&&312>e.wk)return f;if(g)if(typeof a.id==k&&(a.id=c),e.ie&&e.win){var r="",h;for(h in a)a[h]!=Object.prototype[h]&&("data"==h.toLowerCase()?b.movie=a[h]:"styleclass"==h.toLowerCase()?r+=' class="'+a[h]+'"':"classid"!=h.toLowerCase()&&
(r+=" "+h+'="'+a[h]+'"'));h="";for(var l in b)b[l]!=Object.prototype[l]&&(h+='<param name="'+l+'" value="'+b[l]+'" />');g.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+">"+h+"</object>";F[F.length]=a.id;f=q(a.id)}else{l=d.createElement(u);l.setAttribute("type",B);for(var m in a)a[m]!=Object.prototype[m]&&("styleclass"==m.toLowerCase()?l.setAttribute("class",a[m]):"classid"!=m.toLowerCase()&&l.setAttribute(m,a[m]));for(r in b)b[r]!=Object.prototype[r]&&"movie"!=r.toLowerCase()&&
(a=l,h=r,m=b[r],c=d.createElement("param"),c.setAttribute("name",h),c.setAttribute("value",m),a.appendChild(c));g.parentNode.replaceChild(l,g);f=l}return f}function S(a){var b=q(a);b&&"OBJECT"==b.nodeName&&(e.ie&&e.win?(b.style.display="none",function(){if(4==b.readyState){var c=q(a);if(c){for(var f in c)"function"==typeof c[f]&&(c[f]=null);c.parentNode.removeChild(c)}}else setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b))}function q(a){var b=null;try{b=d.getElementById(a)}catch(c){}return b}
function X(a,b,c){a.attachEvent(b,c);y[y.length]=[a,b,c]}function C(a){var b=e.pv;a=a.split(".");a[0]=parseInt(a[0],10);a[1]=parseInt(a[1],10)||0;a[2]=parseInt(a[2],10)||0;return b[0]>a[0]||b[0]==a[0]&&b[1]>a[1]||b[0]==a[0]&&b[1]==a[1]&&b[2]>=a[2]?!0:!1}function T(a,b,c,f){if(!e.ie||!e.mac){var g=d.getElementsByTagName("head")[0];g&&(c=c&&"string"==typeof c?c:"screen",f&&(N=n=null),n&&N==c||(f=d.createElement("style"),f.setAttribute("type","text/css"),f.setAttribute("media",c),n=g.appendChild(f),
e.ie&&e.win&&typeof d.styleSheets!=k&&0<d.styleSheets.length&&(n=d.styleSheets[d.styleSheets.length-1]),N=c),e.ie&&e.win?n&&typeof n.addRule==u&&n.addRule(a,b):n&&typeof d.createTextNode!=k&&n.appendChild(d.createTextNode(a+" {"+b+"}")))}}function w(a,b){if(U){var c=b?"visible":"hidden";v&&q(a)?q(a).style.visibility=c:T("#"+a,"visibility:"+c)}}function V(a){return null!=/[\\\"<>\.;]/.exec(a)&&typeof encodeURIComponent!=k?encodeURIComponent(a):a}var k="undefined",u="object",B="application/x-shockwave-flash",
R="SWFObjectExprInst",p=window,d=document,t=navigator,W=!1,A=[function(){W?Y():G()}],s=[],F=[],y=[],z,E,K,Q,v=!1,D=!1,n,N,U=!0,e=function(){var a=typeof d.getElementById!=k&&typeof d.getElementsByTagName!=k&&typeof d.createElement!=k,b=t.userAgent.toLowerCase(),c=t.platform.toLowerCase(),f=c?/win/.test(c):/win/.test(b),c=c?/mac/.test(c):/mac/.test(b),b=/webkit/.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,g=!+"\v1",e=[0,0,0],h=null;if(typeof t.plugins!=k&&typeof t.plugins["Shockwave Flash"]==
u)!(h=t.plugins["Shockwave Flash"].description)||typeof t.mimeTypes!=k&&t.mimeTypes[B]&&!t.mimeTypes[B].enabledPlugin||(W=!0,g=!1,h=h.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),e[0]=parseInt(h.replace(/^(.*)\..*$/,"$1"),10),e[1]=parseInt(h.replace(/^.*\.(.*)\s.*$/,"$1"),10),e[2]=/[a-zA-Z]/.test(h)?parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof p.ActiveXObject!=k)try{var l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");l&&(h=l.GetVariable("$version"))&&(g=!0,h=h.split(" ")[1].split(","),
e=[parseInt(h[0],10),parseInt(h[1],10),parseInt(h[2],10)])}catch(m){}return{w3:a,pv:e,wk:b,ie:g,win:f,mac:c}}();(function(){e.w3&&((typeof d.readyState!=k&&"complete"==d.readyState||typeof d.readyState==k&&(d.getElementsByTagName("body")[0]||d.body))&&x(),v||(typeof d.addEventListener!=k&&d.addEventListener("DOMContentLoaded",x,!1),e.ie&&e.win&&(d.attachEvent("onreadystatechange",function(){"complete"==d.readyState&&(d.detachEvent("onreadystatechange",arguments.callee),x())}),p==top&&function(){if(!v){try{d.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,
0);return}x()}}()),e.wk&&function(){v||(/loaded|complete/.test(d.readyState)?x():setTimeout(arguments.callee,0))}(),P(x)))})();(function(){e.ie&&e.win&&window.attachEvent("onunload",function(){for(var a=y.length,b=0;b<a;b++)y[b][0].detachEvent(y[b][1],y[b][2]);a=F.length;for(b=0;b<a;b++)S(F[b]);for(var c in e)e[c]=null;e=null;for(var f in swfobject_Fusion)swfobject_Fusion[f]=null;swfobject_Fusion=null})})();return{registerObject:function(a,b,c,f){if(e.w3&&a&&b){var d={};d.id=a;d.swfVersion=b;d.expressInstall=
c;d.callbackFn=f;s[s.length]=d;w(a,!1)}else f&&f({success:!1,id:a})},getObjectById:function(a){if(e.w3)return J(a)},embedSWF:function(a,b,c,d,g,r,h,l,m,p){var q={success:!1,id:b};e.w3&&!(e.wk&&312>e.wk)&&a&&b&&c&&d&&g?(w(b,!1),O(function(){c+="";d+="";var e={};if(m&&typeof m===u)for(var n in m)e[n]=m[n];e.data=a;e.width=c;e.height=d;n={};if(l&&typeof l===u)for(var s in l)n[s]=l[s];if(h&&typeof h===u)for(var t in h)n.flashvars=typeof n.flashvars!=k?n.flashvars+("&"+t+"="+h[t]):t+"="+h[t];if(C(g))s=
M(e,n,b),e.id==b&&w(b,!0),q.success=!0,q.ref=s;else{if(r&&H()){e.data=r;I(e,n,b,p);return}w(b,!0)}p&&p(q)})):p&&p(q)},switchOffAutoHideShow:function(){U=!1},ua:e,getFlashPlayerVersion:function(){return{major:e.pv[0],minor:e.pv[1],release:e.pv[2]}},hasFlashPlayerVersion:C,createSWF:function(a,b,c){if(e.w3)return M(a,b,c)},showExpressInstall:function(a,b,c,d){e.w3&&H()&&I(a,b,c,d)},removeSWF:function(a){e.w3&&S(a)},createCSS:function(a,b,c,d){e.w3&&T(a,b,c,d)},addDomLoadEvent:O,addLoadEvent:P,getQueryParamValue:function(a){var b=
d.location.search||d.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);if(null==a)return V(b);for(var b=b.split("&"),c=0;c<b.length;c++)if(b[c].substring(0,b[c].indexOf("="))==a)return V(b[c].substring(b[c].indexOf("=")+1))}return""},expressInstallCallback:function(){if(D){var a=q(R);a&&z&&(a.parentNode.replaceChild(z,a),E&&(w(E,!0),e.ie&&e.win&&(z.style.display="block")),K&&K(Q));D=!1}}}}();

/**
* Backwards compability with SWFObject v1.5:
*/
if(typeof deconcept == "undefined") var deconcept = new Object();
if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObject_FusionUtil == "undefined") deconcept.SWFObject_FusionUtil = new Object();
var swf15=new Array;
var swf15flashvars = {};
var swf15params = {};
var swf15attributes = {};
deconcept.SWFObject_Fusion = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
swf15=[swf,id,w,h,ver];
swf15attributes.id=swf15[1];
swf15attributes.name=swf15[1];
}
deconcept.SWFObject_Fusion.prototype = {

 addParam: function(name, value){
 if(name=="wmode"){
 swf15params.wmode=value;
 }
 if(name=="allowscriptaccess"){
 swf15params.allowscriptaccess=value;
 }
 if(name=="scale"){
 swf15params.scale=value;
 }
 if(name=="allowfullscreen"){
 swf15params.allowfullscreen=value;
 }

 },
 addVariable: function(name, value){
 if(name=="clicktag"){
 swf15flashvars.clicktag=value;
 }
 if(name=="clickTag"){
 swf15flashvars.clickTag=value;
 }
 if(name=="clickTAG"){
 swf15flashvars.clickTAG=value;
 }
 if(name=="adid"){
 swf15flashvars.adid=value;
 }
 if(name=="bn"){
 swf15flashvars.bn=value;
 }


 },

 write: function(elementId){
 swfobject_Fusion.embedSWF(swf15[0], elementId, swf15[2], swf15[3], swf15[4]+".0.0", false, swf15flashvars, swf15params, swf15attributes);

 }
}
// add some aliases for ease of use/backwards compatibility
var SWFObject_Fusion = deconcept.SWFObject_Fusion;
/**
* End of SWFObject v1.5 code
*/

/**An html parser written in JavaScript
* Based on http://ejohn.org/blog/pure-javascript-html-parser/
*/
var loadHTMLparser = function(){function d(a,b){a=a||"";b=b||{};for(var h in f)f.hasOwnProperty(h)&&(b.autoFix&&(b["fix_"+h]=!0),b.fix=b.fix||b["fix_"+h]);var e={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s>]/i,startTag:/^</,chars:/^[^<]/},d={comment:function(){var c=a.indexOf("--\x3e");if(0<=c)return{content:a.substr(4,c),length:c+3}},endTag:function(){var c=a.match(q);if(c)return{tagName:c[1],length:c[0].length}},atomicTag:function(){var c=d.startTag();if(c){var g=a.slice(c.length);
if(g.match(RegExp("</\\s*"+c.tagName+"\\s*>","i"))&&(g=g.match(RegExp("([\\s\\S]*?)</\\s*"+c.tagName+"\\s*>","i"))))return{tagName:c.tagName,attrs:c.attrs,content:g[1],length:g[0].length+c.length}}},startTag:function(){var c=a.match(r);if(c){var g={};c[2].replace(s,function(c,a,b,h,d){c=b||h||d||t.test(a)&&a||null;g[a]=c});return{tagName:c[1],attrs:g,unary:!!c[3],length:c[0].length}}},chars:function(){var c=a.indexOf("<");return{length:0<=c?c:a.length}}},l=function(){for(var c in e)if(e[c].test(a)){k&&
console.log("suspected "+c);var b=d[c]();return b?(k&&console.log("parsed "+c,b),b.type=b.type||c,b.text=a.substr(0,b.length),a=a.slice(b.length),b):null}};b.fix&&function(){var c=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,h=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,d=[];d.last=function(){return this[this.length-1]};d.lastTagNameEq=function(c){var a=this.last();return a&&a.tagName&&a.tagName.toUpperCase()===c.toUpperCase()};d.containsTagName=function(a){for(var c=
0,b;b=this[c];c++)if(b.tagName===a)return!0;return!1};var e=function(a){a&&"startTag"===a.type&&(a.unary=c.test(a.tagName)||a.unary);return a},f=l,n=function(){a="</"+d.pop().tagName+">"+a},k={startTag:function(c){var e=c.tagName;"TR"===e.toUpperCase()&&d.lastTagNameEq("TABLE")?(a="<TBODY>"+a,m()):b.fix_selfClose&&h.test(e)&&d.containsTagName(e)?d.lastTagNameEq(e)?n():(a="</"+c.tagName+">"+a,m()):c.unary||d.push(c)},endTag:function(a){d.last()?b.fix_tagSoup&&!d.lastTagNameEq(a.tagName)?n():d.pop():
b.fix_tagSoup&&(f(),m())}},m=function(){var c=a,b=e(f());a=c;if(b&&k[b.type])k[b.type](b)};l=function(){m();return e(f())}}();return{append:function(c){a+=c},readToken:l,readTokens:function(a){for(var b;(b=l())&&(!a[b.type]||!1!==a[b.type](b)););},clear:function(){var c=a;a="";return c},rest:function(){return a},stack:[]}}var f=function(){var a={},b=this.document.createElement("div");b.innerHTML="<P><I></P></I>";a.tagSoup="<P><I></P></I>"!==b.innerHTML;b.innerHTML="<P><i><P></P></i></P>";a.selfClose=
2===b.childNodes.length;return a}(),r=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,q=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,s=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,t=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,k=!1;d.supports=f;d.tokenToString=function(a){var b={comment:function(a){return"<--"+a.content+"--\x3e"},endTag:function(a){return"</"+
a.tagName+">"},atomicTag:function(a){console.log(a);return b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName,d;for(d in a.attrs)var f=a.attrs[d],b=b+(" "+d+'="'+(f?f.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"');return b+(a.unary?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)};d.escapeAttributes=function(a){var b={},d;for(d in a){var e=a[d];b[d]=e&&e.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var p in f)d.browserHasFlaw=d.browserHasFlaw||!f[p]&&p;this.htmlParser=
d};
/**     postscribe.js 1.1.2
*     (c) Copyright 2012 to the present, Krux
*     postscribe is freely distributable under the MIT license.
*     For all details and documentation:
*     http://krux.github.com/postscribe
*/
var loadPostScrb = function(){function p(){}function s(e,b,f){var a,c=e&&e.length||0;for(a=0;a<c;a++)b.call(f,e[a],a)}function k(e,b,f){for(var a in e)e.hasOwnProperty(a)&&b.call(f,a,e[a])}function n(e,b){k(b,function(b,a){e[b]=a});return e}function u(e,b){e=e||{};k(b,function(b,a){null==e[b]&&(e[b]=a)});return e}function r(e){try{return v.call(e)}catch(b){var f=[];s(e,function(a){f.push(a)});return f}}var l=this;if(!l.postscribe){var v=Array.prototype.slice,t=function(){function e(a,c,d){var g=f+c;if(2===arguments.length)return g=
a.getAttribute(g),null==g?g:String(g);null!=d&&""!==d?a.setAttribute(g,d):a.removeAttribute(g)}function b(a,c){var d=a.ownerDocument;n(this,{root:a,options:c,win:d.defaultView||d.parentWindow,doc:d,parser:l.htmlParser("",{autoFix:!0}),actuals:[a],proxyHistory:"",proxyRoot:d.createElement(a.nodeName),scriptStack:[],writeQueue:[]});e(this.proxyRoot,"proxyof",0)}var f="data-ps-";b.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=
this.writeQueue.shift(),"function"===typeof a?this.callFunction(a):this.writeImpl(a)};b.prototype.callFunction=function(a){var c={type:"function",value:a.name||a.toString()};this.onScriptStart(c);a.call(this.win,this.doc);this.onScriptDone(c)};b.prototype.writeImpl=function(a){this.parser.append(a);var c;for(a=[];(c=this.parser.readToken())&&!/^script$/i.test(c.tagName);)a.push(c);this.writeStaticTokens(a);c&&this.handleScriptToken(c)};b.prototype.writeStaticTokens=function(a){a=this.buildChunk(a);
if(a.actual)return a.html=this.proxyHistory+a.actual,this.proxyHistory+=a.proxy,this.proxyRoot.innerHTML=a.html,this.walkChunk(),a};b.prototype.buildChunk=function(a){var c=this.actuals.length,d=[],g=[],b=[];s(a,function(a){d.push(a.text);if(a.attrs){if(!/^noscript$/i.test(a.tagName)){var e=c++;g.push(a.text.replace(/(\/?>)/," "+f+"id="+e+" $1"));"ps-script"!==a.attrs.id&&b.push("atomicTag"===a.type?"":"<"+a.tagName+" "+f+"proxyof="+e+(a.unary?"/>":">"))}}else g.push(a.text),b.push("endTag"===a.type?
a.text:"")});return{tokens:a,raw:d.join(""),actual:g.join(""),proxy:b.join("")}};b.prototype.walkChunk=function(){for(var a,c=[this.proxyRoot];null!=(a=c.shift());){var d=1===a.nodeType;d&&e(a,"proxyof")||(d&&(this.actuals[e(a,"id")]=a,e(a,"id",null)),(d=a.parentNode&&e(a.parentNode,"proxyof"))&&this.actuals[d].appendChild(a));c.unshift.apply(c,r(a.childNodes))}};b.prototype.handleScriptToken=function(a){var c=this.parser.clear();c&&this.writeQueue.unshift(c);a.src=a.attrs.src||a.attrs.SRC;if(a.src&&
this.scriptStack.length)this.deferredRemote=a;else this.onScriptStart(a);var d=this;this.writeScriptToken(a,function(){d.onScriptDone(a)})};b.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue;this.writeQueue=[];this.scriptStack.unshift(a)};b.prototype.onScriptDone=function(a){a!==this.scriptStack[0]?this.options.error({message:"Bad script nesting or script finished twice"}):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),!this.scriptStack.length&&this.deferredRemote&&
(this.onScriptStart(this.deferredRemote),this.deferredRemote=null))};b.prototype.writeScriptToken=function(a,c){var d=this.buildScript(a);a.src&&(d.src=a.src,this.scriptLoadHandler(d,c));try{this.insertScript(d),a.src||c()}catch(b){this.options.error(b),c()}};b.prototype.buildScript=function(a){var c=this.doc.createElement(a.tagName);k(a.attrs,function(a,b){c.setAttribute(a,b)});a.content&&(c.text=a.content);return c};b.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var c=
this.doc.getElementById("ps-script");c.parentNode.replaceChild(a,c)};b.prototype.scriptLoadHandler=function(a,c){function d(){a=a.onload=a.onreadystatechange=a.onerror=null;c()}var b=this.options.error;n(a,{onload:function(){d()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&d()},onerror:function(){b({message:"remote script failed "+a.src});d()}})};return b}(),w=function(){function e(){var a=c.shift();a&&(a.stream=b.apply(null,a))}function b(b,c,m){function h(a){a=m.beforeWrite(a);
d.write(a);m.afterWrite(a)}d=new t(b,m);d.id=a++;d.name=m.name||d.id;f.streams[d.name]=d;var q=b.ownerDocument,l={write:q.write,writeln:q.writeln};n(q,{write:function(){return h(r(arguments).join(""))},writeln:function(a){return h(r(arguments).join("")+"\n")}});var k=d.win.onerror||p;d.win.onerror=function(a,b,c){m.error({msg:a+" - "+b+":"+c});k.apply(d.win,arguments)};d.write(c,function(){n(q,l);d.win.onerror=k;m.done();d=null;e()});return d}function f(a,b,f){"function"===typeof f&&(f={done:f});
f=u(f,{done:p,error:function(a){throw a;},beforeWrite:function(a){return a},afterWrite:p});a=/^#/.test(a)?l.document.getElementById(a.substr(1)):a.jquery?a[0]:a;var h=[a,b,f];a.postscribe={cancel:function(){h.stream?h.stream.abort():h[1]=p}};c.push(h);d||e();return a.postscribe}var a=0,c=[],d=null;return n(f,{streams:{},queue:c,WriteStream:t})}();l.postscribe=w}};

(function(window, document) {
	if(window.Fusion == undefined) window.Fusion = {};
	getUrlToFile = function (protocol, server, file) {
		return protocol + server + "/" + file;
	}

	var loadjsfile = function (url){
		var scrptElement = document.createElement("script");
		scrptElement.setAttribute("type", "text/javascript");
		scrptElement.setAttribute("src", url);
		var scriptParent = document.getElementsByTagName("head")[0];
		if (!scriptParent) scriptParent = document;
		scriptParent.appendChild(scrptElement);
		}

	var rndAscii = function (len) {
		var rndInterval = function (low, high){ return Math.floor((Math.random() * (high - low)) + low); }
		var ret = "";
		while (len-- > 0)
			ret += String.fromCharCode(rndInterval('a'.charCodeAt(0), 'z'.charCodeAt(0) + 1));
		return ret;
	};

	var isIE8 = window.XDomainRequest ? true : false;
	var createCrossDomainRequest = function (url, handler) {
		 var request;
		 if (isIE8) {
		  	request = new window.XDomainRequest();
		 }
		 else {
		  	request = new XMLHttpRequest();
		 }
		 return request;
	}


	var htmlEncode = function (s) {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
	}

	var getAdvertEventUrl = function (advertId, eventName){
		var url = getUrlToFile(window.Fusion.protocol, window.Fusion.adServer, "event");
		url += "/" + rndAscii(5);
		url += "/" + encodeURIComponent(window.Fusion.mediaZone);
		url += "/" + encodeURIComponent(advertId);
		url += "/" + encodeURIComponent(eventName)
		return url;
	}

	var countAdvertEvent = function (advertId, eventName){
	var url = getAdvertEventUrl(advertId, eventName);
	var img = new Image();
	img.src = url;
	}
	var onLoadDetect =function(){
	detectBrowser();
	detectOS();
	detectPlugins();
	}

	var doDetect = function(){
	detectUrl();
	detectResolution();
	detectDateTime();
	addToParameters();
	}
	var addToParameters = function(){
	for (var i in window.Fusion.Detect.values)
	{
		if (!window.Fusion.Detect.values.hasOwnProperty(i)) continue;
		var allValues;
		if (window.Fusion.Detect.values[i] instanceof Array)
		{
			allValues = window.Fusion.Detect.values[i];
		}
		else
		{
			allValues = [window.Fusion.Detect.values[i]];
		}

		for (var j = 0; j < allValues.length; ++j)
		{
			window.Fusion.parameters[i] = allValues[j];
		}
	}
	}
	var addExternalToParameters = function(){
	for (var i in window.Fusion.parameters)
	{
		if (!window.Fusion.parameters.hasOwnProperty(i)) continue;
		var allValues;
		if (window.Fusion.parameters[i] instanceof Array)
		{
			allValues = window.Fusion.parameters[i];
		}
		else
		{
			allValues = [window.Fusion.parameters[i]];
		}

		for (var j = 0; j < allValues.length; ++j)
		{
			window.Fusion.Detect.values[i] = allValues[j];
		}
	}
	}
	var detectUrl = function(){
	window.Fusion.Detect.values["url"] = encodeURIComponent(window.location.protocol + "//" + window.location.host + window.location.pathname);
	window.Fusion.Detect.values["url_extra"] = encodeURIComponent(window.location.search.substr(0,200));

	}
	var detectBrowser = function(){
	BrowserDetect.init();
	window.Fusion.Detect.values["browserName"] = BrowserDetect.browser;
	window.Fusion.Detect.values["browserVersion"] = BrowserDetect.version;
	window.Fusion.Detect.values["browser"] = BrowserDetect.browser + BrowserDetect.version;

	}
	var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "unknown";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "1337";
		this.OS = this.searchString(this.dataOS) || "unknown";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.vendor,
			subString: "Opera",
			versionSearch: "OPR",
			identity: "Opera"
		},
		{
			string: navigator.userAgent,
			subString: "Chrome",
			versionSearch: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			versionSearch: "Version",
			identity: "Safari"
		},
		{
			prop: window.opera,
			versionSearch: "Version",
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "Opera",
			versionSearch: "Version",
			identity: "Opera"
		},

		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer",
			versionSearch: "rv"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.userAgent,
			subString: "Windows NT 6.0",
			identity: "Vista"
		},
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

	};
	var detectOS = function(){
	var isWin = (window.Fusion.Detect.agent.indexOf('win') != -1);
	var os = "";
	if ((window.Fusion.Detect.agent.indexOf('nt 4.0') != -1) && isWin)
	{
		os = "winnt";
	}
	else if ((window.Fusion.Detect.agent.indexOf('nt 5.0') != -1) && isWin)
	{
		os = "win2000";
	}
	else if ((window.Fusion.Detect.agent.indexOf('windows nt 6.0') != -1) && isWin)
	{
		os = "winvista";
	}
	else if ((window.Fusion.Detect.agent.indexOf('windows nt 6.1') != -1) && isWin)
	{
		os = "win7";
	}
	else if ((window.Fusion.Detect.agent.indexOf('windows nt 6.2') != -1) && isWin)
	{
		os = "win8";
	}
	else if ((window.Fusion.Detect.agent.indexOf('windows nt 6.3') != -1) && isWin)
	{
		os = "win8";
	}
	else if ((window.Fusion.Detect.agent.indexOf('98') != -1) && isWin)
	{
		os = "win98";
	}
	else if ((window.Fusion.Detect.agent.indexOf('95') != -1) && isWin)
	{
		os = "win95";
	}
	else if (window.Fusion.Detect.agent.indexOf('macintosh') != -1)
	{
		os = "mac";
	}
	else if(window.Fusion.Detect.agent.indexOf('android') != -1)
	{
		os = "android";
	}
	else if(window.Fusion.Detect.agent.indexOf('linux') != -1)
	{
		os = "linux";
	}
	else if(window.Fusion.Detect.agent.indexOf('iphone') != -1)
	{
		os = "iphone";
	}
	else if(window.Fusion.Detect.agent.indexOf('ipad') != -1)
	{
		os = "ipad";
	}
	else if ((window.Fusion.Detect.agent.indexOf('nt') != -1) && (window.Fusion.Detect.agent.indexOf('5.1') != -1) && isWin)
	{
		os = "winxp";
	}
	else if (((window.Fusion.Detect.agent.indexOf('win 9x 4.90') != -1) || (window.Fusion.Detect.agent.indexOf('windows me') != -1)) && isWin)
	{
		os = "winme";
	}
	else
	{
		os = "other";
	}

	window.Fusion.Detect.values["OS"] = os;

	}
	var detectResolution = function(){
	var resolution = "";

	if(window.screen)
	{
		var height = window.screen.height;
		var width = window.screen.width;
	    window.Fusion.Detect.values["screenRes"] = width + "x" + height;
		window.Fusion.Detect.values["screenWidth"]  = width;
		window.Fusion.Detect.values["screenHeight"] = height;
	}
	else
	{
		window.Fusion.Detect.values["screenRes"] = "n/a";
	}

	//Browser size
	var browserWidth = 0, browserHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )
	{
	  //Non-IE
	  browserWidth = window.innerWidth;
	  browserHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
	  //IE 6+ in 'standards compliant mode'
	  browserWidth = document.documentElement.clientWidth;
	  browserHeight = document.documentElement.clientHeight;
	}
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
	{
	  //IE 4 compatible
	  browserWidth = document.body.clientWidth;
	  browserHeight = document.body.clientHeight;
	}
 	window.Fusion.Detect.values["browserWidth"] = browserWidth;
	window.Fusion.Detect.values["browserHeight"] = browserHeight;

	}
	var detectDateTime = function(){
	var date = new Date();
	var dayStrings = new Array("sunday","monday","tuesday","wednesday","thursday","friday","saturday");
	var hours = date.getHours().toString();
	var minutes = date.getMinutes().toString();
	var day = dayStrings[date.getDay()];

	if (hours.length < 2)
		hours = "0" + hours;

	if (minutes.length < 2)
		minutes = "0" + minutes;

	window.Fusion.Detect.values["time"] = hours + minutes;
	window.Fusion.Detect.values["weekDay"] = day;
	}
	var detectPlugins = function(){
	var flash=swfobject_Fusion.getFlashPlayerVersion();
	window.Fusion.Detect.values["flash"]=flash.major;
	}



	var getParameters = function (parameters){
		doDetect();
		var parameterString = "";
		var prefix = "";
		var prm = parameters;
		for (var p in prm) {
			if (!prm.hasOwnProperty(p))
				continue;
			var allValues;
			if (parameters[p] instanceof Array)
			{
				allValues = parameters[p];
			}
			else
			{
				allValues = [parameters[p]];
			}
			for (var j = 0; j < allValues.length; ++j)
			{
				parameterString += prefix + p + "=" + allValues[j];
				// prefix has been used once, set to &
				prefix = "&";
			}
		}
		return parameterString;
	}

	var load = function(serverName, zoneName, layoutName, param) {
	if(zoneName != undefined){
	var Fusadid="";
	var Fusimpid="";
	var params={};
	var options={};
	if(ExtparamOnce){
	ExtparamOnce=false;
	addExternalToParameters();
	}
	if(param!=undefined){
	if(param.params){
	var params=param.params;
	}
	if(param.options){
	var options=param.options;
	}
	}
	window.Fusion.loadoptions.options = {
		onloadshowads: false,
		onloadcountimp: false,
		onshowcountimp: true,
		onloadcallback: function () {},
		onshowcallback: function () {},
		onerror: function() {},
		usepostscribe: true
	};
	for ( var i in options ) {
		window.Fusion.loadoptions.options[i] = options[i];
	}

		if(window.Fusion.loadoptions.options.usepostscribe){
		if(typeof postscribe != 'function'){
		if(typeof loadHTMLparser == 'function'){
		loadHTMLparser();
		}
		else{loadjsfile(window.Fusion.protocol+"fusion.adtoma.com/spl/postscribe/htmlParser.js");}
		if(typeof loadPostScrb == 'function'){
		loadPostScrb();
		}
		else{loadjsfile(window.Fusion.protocol+"fusion.adtoma.com/spl/postscribe/postscribe.js");}

		}
		}
		var server = serverName;
		var zone = zoneName;
		var layout = layoutName;
    var parameters = window.Fusion.parameters;
		window.Fusion.mediaZone = zone;
		window.Fusion.adServer = server;
		window.Fusion.layout = layout;
		if(window.Fusion.loadoptions.options.onloadcountimp){var query = getParameters(parameters);window.Fusion.loadoptions.options.onshowcountimp=false;}
		else{var query = getParameters(parameters)+"&noadimp=true";}
		if(query.length > 0) query = "?" + query;

		var url = getUrlToFile(window.Fusion.protocol, server, "jsonm") + "/" + rndAscii(5) + "/" + zone + "/" + layout + query;
		}
		else{
		var url = serverName;
		}
		var getAllElementsWithAttribute = function(attribute) {
		  var matchingElements = [];
		  var allElements = document.getElementsByTagName('*');
		  for (var i = 0; i < allElements.length; i++)
		  {
		    if (allElements[i].getAttribute(attribute))
		    {
		      // Element exists with attribute. Add to array.
		     matchingElements.push(allElements[i]);
		    }
		  }
		  return matchingElements;
		}

		var expandAttribute = window.Fusion.expandAttribute = function (component, attribute, visited) {

			if (!visited) visited = [];
			var funcs = { "htmlEncode": htmlEncode, "uriEncode": encodeURIComponent };
			return component.attributes[attribute].replace(/(\{{1,2})%([^%]+)%\}/g, function(match, braces, content) {
				if (braces.length == 2) return "{%" + content + "%}"; // double braces quote
				var parts = content.split(":");
				var content = parts.pop().replace(/^([^\.]+)\.?(.*)$/, function (match2, prefix, suffix) {
					switch (prefix){
						case "Fusion":
							if (window.Fusion[suffix] === undefined)
								return "Fusion." + suffix;
							else
								return window.Fusion[suffix].toString();
						case "attribute":
							for (var vindex = 0; vindex < visited.length; ++vindex) {
								if (visited[vindex] == suffix) {
									return match2;
								}
							}
							visited.push(suffix);
							var ret = expandAttribute(component, visited);
							visited.pop();
							return ret;
						case "r": return rndAscii(suffix ? parseInt(suffix, 10) : 5);
						case "eventUrl": return getAdvertEventUrl(component.ad, suffix);
						case "parameters": return getParameters(parameters);
						case "adId": return component.ad.toString();
						default: return match2;
					}
				});
				while (parts.length > 0) {
					var funcName = parts.pop();
					var f = funcs[funcName];
					if (f != undefined) content = f(content);
				}
				return content;
			});
		}

		var getComponent = function(placementName, attribute) {
			if (attribute === undefined)
				attribute = "Payload";
			if (window.Fusion.components != undefined) {
				var components = window.Fusion.components[placementName];
				var component = null;

				if (!(components instanceof Array) || components.length === 0) {
					// console.log("Tried to show ad for non-existing placement " + placementName);
					return null;
				}
				else if (typeof((component = components.shift()).attributes[attribute]) != typeof("")) {
					return null;
				}
				else {
				Fusadid=component.ad;
				Fusimpid=component.id;
				return window.Fusion.expandAttribute(component, attribute);
				}
			}
			else
				return null;
		}


		var updatePlacement = window.Fusion.updatePlacement = function (adopts) {
		this.adopts = {
		placement: false,
		space: false,
		countimp: window.Fusion.loadoptions.options.onshowcountimp,
		onshowcallback: window.Fusion.loadoptions.options.onshowcallback,
		onerror: window.Fusion.loadoptions.options.onerror,
		usepostscribe: window.Fusion.loadoptions.options.usepostscribe
		};
		for ( var i in adopts ) {
		this.adopts[i] = adopts[i];
		}

		if (this.adopts.placement == false) return;
		if(typeof this.adopts.placement == 'object'){var elmt = this.adopts.placement;
		var placementName = elmt.getAttribute("data-fusion-placement");
		if(elmt.getAttribute("data-fusion-id")){var placementId= elmt.getAttribute("data-fusion-id");}
		else{var placementId=elmt.id;}
		}
		else{var elmt = document.getElementById(this.adopts.placement);
		if (elmt == null) return;
		//if space name not defined look for data-fusion-placement attribute on Div
		if(this.adopts.space==false){var placementName = elmt.getAttribute("data-fusion-placement");}
		else{var placementName = this.adopts.space;}
		//if data-fusion-id attribute exist use that with impcounter object identifier, otherwise use div id
		if(elmt.getAttribute("data-fusion-id")){var placementId= elmt.getAttribute("data-fusion-id");}
		else{var placementId=this.adopts.placement;}
		}

		var content = getComponent(placementName);

			if (content != null) {
			window.Fusion.adimpurl[placementId]=window.Fusion.protocol+window.Fusion.adServer+"/impression/titls/"+window.Fusion.mediaZone+"/"+window.Fusion.layout+"/"+Fusimpid;
	    		elmt.innerHTML = "";
			if(this.adopts.usepostscribe==false){this.adopts.onshowcallback(elmt,content,placementId);}
			else{postscribe(elmt, content);
			if(this.adopts.countimp==true){cntAdImp(placementId);}
			this.adopts.onshowcallback(elmt,content,placementId);
			}




			} else {
				this.adopts.onerror(placementId);
			}
		}

		var getCookies = function(){

			value = "";
			pCookies = new Array();
			pCookies = document.cookie.split('; ');
			for(i = 0; i < pCookies.length; i++){
				if(pCookies[i].indexOf("Fusion") == 0) {
					if(value.length > 0)
						value += ",";
					value += pCookies[i];
				}
			}

			return value;
		}

		var eraseCookie = function(name) {
		document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}

		var setCookie = function(name, value) {
                	var expiration_date = new Date();
		        expiration_date.setFullYear(expiration_date.getFullYear() + 3);
			if(name=="Fusion.previewMode"){
			document.cookie = name + '=..' + value + "; path=/; expires=" + expiration_date.toGMTString();
			}else{
			document.cookie = name + '=' + value + "; path=/; expires=" + expiration_date.toGMTString();
			}
        	}


		var eraseCookies = function() {
			pCookies = new Array();
			pCookies = document.cookie.split('; ');
			for(i = 0; i < pCookies.length; i++){
				if(pCookies[i].indexOf("Fusion") == 0) {
					pParts = pCookies[i].split('=');
					eraseCookie(pParts[0]);
				}
			}
		}

		  var setCookies = function(cookies){
		          var expiration_date = new Date();
                  expiration_date.setFullYear(expiration_date.getFullYear() + 3);
                  pCookies = cookies.split(",");
                  for(i = 0; i < pCookies.length; i++){
                          document.cookie = pCookies[i] + "; path=/; expires=" + expiration_date.toGMTString();
                   }
	        }


		var invocation = createCrossDomainRequest();
		var handler = function (evtXHR) {
			if (invocation.readyState == 4) {
				if (invocation.status == 200) {
					outputResult();
				}
				else {

				}
			}
		}

		var outputResult = function () {
		if(zoneName != undefined){
			try {
				var response = eval('('+invocation.responseText+')');
			} catch (e) {
			    return
			}

		}
		else{
			try {
				var response = eval('('+invocation.responseText+')');
			} catch (e) {
					return
			}
			}

			if(zoneName != undefined){
			window.Fusion.components = response.components;
			window.Fusion.metadata = response.metadata;
			}
			if(response.cookies != undefined){
			window.Fusion.cookies = response.cookies;
			eraseCookies();
			setCookies(response.cookies);
			}
			window.Fusion.cookieCheck=true;
			if(zoneName != undefined){
			var placements = getAllElementsWithAttribute("data-fusion-placement");
			window.Fusion.loadoptions.options.onloadcallback();

			if(window.Fusion.loadoptions.options.onloadshowads){
			waitforPostScribe = function (){
			if(typeof postscribe == 'function') {
				clearInterval(waitforPS);
				for(var i = 0; i < placements.length; i++)
				{
				updatePlacement({placement:placements[i]});
				}
			}
			}
			if(window.Fusion.loadoptions.options.usepostscribe==false){
				for(var i = 0; i < placements.length; i++)
				{
				updatePlacement({placement:placements[i]});
				}
			}
			else{waitforPS=setInterval("waitforPostScribe();",100);}
			}
			}
		}

	        var chkForPM=document.location.href;
		var detectPM=chkForPM.search('fusionpreview=');
		if(detectPM!=-1){
		var PMadid=chkForPM.split('fusionpreview=');
		if(PMadid[1]){var PrevMadid=parseInt(PMadid[1]);
		setCookie('Fusion.previewMode', PrevMadid);
		}
		}
		//setCookie("Fusion.diagnosticsMode", "fals");
		setCookie("Fusion.testCookie", "true");

		 if (invocation) {
			 if(isIE8) {
			   	try{
						setTimeout(function(){
							window.Fusion.cookieCheck=false;
							invocation.onload = outputResult;
							invocation.onprogress = function() { return true };
							invocation.ontimeout = function() { return true };
							invocation.onerror = function () { return true };
							invocation.open("POST", url, true);
							invocation.send(getCookies());
						},0)

				 }
				 catch(err){
				 console.log("could not load");
				 window.Fusion.cookieCheck=true;
				 }
			 }
		 	else {
				try{
					setTimeout(function(){
						window.Fusion.cookieCheck=false;
						// invocation.onprogress = function() { return true };
						// invocation.ontimeout = function() { return true };
						// invocation.onerror = function () { return true };
						//				 invocation.timeout = 4000;
						invocation.open("POST", url, true);
						invocation.onreadystatechange = handler;
						invocation.setRequestHeader("Content-type","text/plain");
						invocation.send(getCookies());
					}, 0);
				}
				 catch(err){
				 console.log("could not load");
				 window.Fusion.cookieCheck=true;
				 }
			}
		 }
	};

	var printCookies = function() {
		alert(window.Fusion.cookies);
	}

	var sendAdImp = function(attribute,rndm) {
	if(window.Fusion.cookieCheck){
	window.Fusion.cookieCheck = false;
	clearInterval(window.Fusion.holdAdImp[attribute]);
	if(window.Fusion.adimpurl[attribute]){
				window.Fusion.load(window.Fusion.adimpurl[attribute]);
				window.Fusion.adimpurl[attribute]=window.Fusion.adimpurl[attribute].replace(rndm,"");
		}
		}
		}

	var cntAdImp = function(attribute) {
	var cadid=attribute;
	if(window.Fusion.adimpurl[cadid]){
				var rndm = new Number(Math.round(Math.random() * Math.pow(2,24)));
				window.Fusion.adimpurl[cadid]=window.Fusion.adimpurl[cadid].replace("/impression/","/impression/"+rndm);
				window.Fusion.holdAdImp[cadid]=setInterval("window.Fusion.sendAdImp('"+cadid+"','"+rndm+"')",100);
		}

		}

	var diagnostics = function() {
		var metadataHandlers = {
				"diagnostics" : function (root) {
					function indent(n){ var r = ""; while (n-- > 0) r += "    "; return r; }
					function entry2html(entry, depth) {
					var cls = "status-" + htmlEncode(entry.status.toLowerCase());
					var msg = htmlEncode(entry.message);
					if (entry.subEntries.length == 0) {
						return indent(depth) + "<li class=\"" + cls + "\">" + msg + "</li>\n";
					}
					else {
						return (indent(depth) + "<li class=\"" + cls + "\">\n" +
							indent(depth + 1) + msg + "\n" +
							entries2html(entry.subEntries, depth + 1) + "\n" +
							indent(depth) + "</li>\n");
					}
					}
					function entries2html(entries, depth){
						var items = [];
						for (var i = 0; i < entries.length; ++i)
							items.push(entry2html(entries[i], depth + 1));
						if (items.length > 0){
							items.unshift(indent(depth) + "<ul>\n");
							items.push(indent(depth) + "</ul>\n");
						}
						return items.join("");
					}
					var win = window.open("about:blank", "_blank");
					if (win) {
						with (win.document){
							open("text/html");
							writeln("<html><head>");
							writeln(indent(1) + "<title>Selection diagnostics</title>");
							writeln(indent(1) + "<link rel=\"stylesheet\" href=\"" + htmlEncode(getUrlToFile(window.Fusion.protocol, window.Fusion.adServer, "util/diagnostics.css")) + "\" />");
							writeln(indent(1) + "<script type=\"text/javascript\" src=\"" + htmlEncode(getUrlToFile(window.Fusion.protocol, window.Fusion.adServer, "util/sorttable.js")) + "\"></scr" + "ipt>" );
							writeln("</head><body>");
							if (root.table){
								writeln("<table class=\"sortable\">");
								writeln(indent(1) + "<caption>Inspected ads</caption>");
								writeln(indent(1) + "<thead>");
								writeln(indent(2) + "<tr>");
								var headers = root.table.headers;
								for (var i = 0; i < headers.length; ++i)
									writeln(indent(3) + "<th>" + htmlEncode(headers[i]) + "</th>");
								writeln(indent(2) + "</tr>");
								writeln(indent(1) + "</thead>");
								writeln(indent(1) + "<tbody>");
								for (var i = 0; i < root.table.rows.length; ++i){
									writeln(indent(2) + "<tr>");
									var row = root.table.rows[i];
									for (var j = 0; j < row.length; ++j) {
										var c = htmlEncode(row[j].status.toLowerCase());
										var m = htmlEncode(row[j].message);
										writeln(indent(3) + "<td class=\"status-" + c + "\">" + m + "</td>");
									}
									writeln(indent(2) + "</tr>");
								}
								writeln(indent(1) + "</tbody>");
								writeln("</table>");
							}
							if (root.tree){
								writeln("<ul>");
								writeln(indent(1) + "<li>");
								writeln(indent(2) + "Selection log:");
								writeln(entries2html(root.tree.subEntries, 3));
								writeln(indent(1) + "</li>");
								writeln("</ul>");
							}
							writeln("</body></html>");
							close();
						}
					}
				}
			}


		for (var i in window.Fusion.metadata){
			if (!window.Fusion.metadata.hasOwnProperty(i)) continue;
			if (metadataHandlers[i] !== undefined) metadataHandlers[i](window.Fusion.metadata[i]);
		}
	}

	if(window.Fusion == undefined) window.Fusion = {};
	var ExtparamOnce=true;
	window.Fusion.mediaZone = "";
	window.Fusion.adServer = "";
	window.Fusion.layout = "";
	window.Fusion.parameters = {};
	window.Fusion.loadoptions = {};
	window.Fusion.load = load;
	if (window.Fusion.updatePlacement === undefined) window.Fusion.updatePlacement = function(){};
	window.Fusion.diagnostics = diagnostics;
	window.Fusion.printCookies = printCookies;
	if (window.Fusion.setCookie === undefined) window.Fusion.setCookie = function(){};
	window.Fusion.cookieCheck = true;
	window.Fusion.cntAdImp = cntAdImp;
	window.Fusion.sendAdImp = sendAdImp;
	window.Fusion.holdAdImp = {};
	window.Fusion.countAdvertEvent = countAdvertEvent;
	window.Fusion.getAdvertEventUrl = getAdvertEventUrl;
	window.Fusion.components = {};
	window.Fusion.metadata = {};
	window.Fusion.cookies = "";
	window.Fusion.adimpurl = {};
	window.Fusion.adimptr = {};
	window.Fusion.protocol = "//";
	if(window.location.protocol!="http:"&&window.location.protocol!="https:"){window.Fusion.protocol = "http://";}
	window.Fusion.protocol = window.location.protocol+"//";
	window.Fusion.Detect = {};
    window.Fusion.Detect.values = {};
    window.Fusion.Detect.agent = navigator.userAgent.toLowerCase();
    window.Fusion.Detect.appVer = navigator.appVersion.toLowerCase();
	onLoadDetect();
})(window, document);

window.sparrow_buildtime='2015-03-17 14:43:55';
(function() {
  var sparrow;

  if (typeof window.console === "undefined") {
    window.console = {
      log: function() {}
    };
  }

  if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true' && window.sparrow_buildtime) {
    console.log("- - - Sparrowjs build: " + window.sparrow_buildtime + " - - -");
  }

  Date.now = Date.now || function() {
    return +(new Date);
  };

  sparrow = {
    timestamp_at_load: Date.now(),
    timestamp_interval: Date.now(),
    module_log: [],
    dependency_log: [],
    initialize: function() {
      this.models || (this.models = {});
      this.views || (this.views = {});
      this.collections || (this.collections = {});
      return this;
    },
    get_latency: function() {
      return Date.now() - this.timestamp_at_load;
    },
    get_latency_interval: function() {
      var latency_interval;
      latency_interval = Date.now() - this.timestamp_interval;
      this.timestamp_interval = Date.now();
      return latency_interval;
    }
  };

  window.sparrow || (window.sparrow = {});

  _.extend(window.sparrow, sparrow);

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  window.sparrow.initialize();

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.BaseCollection = Backbone.Collection.extend({
    initialize: function() {
      sparrow.collections[this.name] = this;
      sparrow.BaseModuleHandler.register_available_dependency(this.name);
      this.bind('add', this.add_to_view);
    },
    add_to_view: function(module) {
      if ((module.get('view') != null) && module.get('rendered') === false) {
        sparrow.views[module.get('view')].add_to_render(module);
      }
    }
  });

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.cookies = {
    get: function(name) {
      var c, ca, i, nameEQ;
      if (!this.is_set(name)) {
        return void 0;
      }
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length).replace(/"/g, '');
        }
        i++;
      }
      return ca;
    },
    set: function(cookieName, cookieValue, exp_minutes) {
      var d, expire;
      if (exp_minutes == null) {
        exp_minutes = 525600;
      }
      d = new Date;
      expire = new Date(d.getTime() + exp_minutes * 60000);
      return document.cookie = cookieName + "=" + escape(cookieValue) + ";path=/;expires=" + expire.toGMTString();
    },
    "delete": function(cookieName) {
      if (!this.is_set(name)) {
        return void 0;
      }
      if (this.is_set(cookieName)) {
        return this.set(cookieName, '', -1);
      }
    },
    is_set: function(name) {
      return document.cookie.indexOf(name) >= 0;
    }
  };

}).call(this);

(function() {
  window.SiteObject || (window.SiteObject = {
    ga_id: "UA-41255195-1",
    mixpanel_token: "1234ABCDE",
    domain: "mittmedia.se",
    site_name: "Mittmedia Sparrow - Default"
  });

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.EventHandler = {
    current_event_id: 0,
    all_events: [],
    screen_events: [],
    resize_events: [],
    locked: false,
    initialize: function() {
      var _this = this;
      window.onscroll = function() {
        _this.check_screen_events();
      };
      window.onresize = function() {
        _this.check_resize_events();
        _this.check_screen_events();
      };
    },
    bind_event: function(event_object) {
      if (typeof sparrow.models[event_object.module_name][event_object.callback] !== 'function') {
        return;
      }
      event_object.run_once || (event_object.run_once = false);
      event_object.dom_element || (event_object.dom_element = void 0);
      event_object.name || (event_object.name = "");
      event_object.id = this.current_event_id += 1;
      if (sparrow.models[event_object.module_name].get("element_selector") !== false) {
        event_object.dom_element = jQuery(sparrow.models[event_object.module_name].get("element_selector"));
      }
      this.update_event_arrays(event_object);
      return this.current_event_id;
    },
    update_event_arrays: function(event_object) {
      this.all_events.push(event_object);
      this.screen_events = _.filter(this.all_events, function(e) {
        return e.type === "in_screen";
      });
      this.resize_events = _.filter(this.all_events, function(e) {
        return e.type === "window_resize";
      });
      this.check_screen_events();
    },
    check_screen_events: function() {
      var screen_event, _i, _len, _ref;
      if (this.locked === true || this.screen_events.length <= 0) {
        return;
      }
      this.locked = true;
      _ref = this.screen_events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        screen_event = _ref[_i];
        this.check_screen_event(screen_event);
      }
      this.locked = false;
    },
    check_screen_event: function(e) {
      if (jQuery(e.dom_element).length !== 0 && this.check_element_position(e)) {
        this.run_event(e, e.dom_element);
      }
    },
    check_resize_events: function() {
      var resize_event, _i, _len, _ref;
      if (this.resize_events.length <= 0) {
        return;
      }
      _ref = this.resize_events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resize_event = _ref[_i];
        this.check_resize_event(resize_event);
      }
    },
    check_resize_event: function(e) {
      this.run_event(e);
    },
    check_element_position: function(event_obj) {
      var doc_view_bottom, doc_view_top, element, element_bottom, element_y;
      element = jQuery(event_obj.dom_element.selector);
      doc_view_top = jQuery(window).scrollTop();
      doc_view_bottom = doc_view_top + jQuery(window).height();
      if (jQuery(element) && jQuery(element).offset()) {
        element_y = jQuery(element).offset().top;
      }
      element_y || (element_y = 0);
      if (element_y <= 1) {
        return false;
      }
      element_bottom = element_y;
      event_obj.margin || (event_obj.margin = 200);
      return element_bottom <= (doc_view_bottom + event_obj.margin);
    },
    trigger_event: function(event_id, relay_object) {
      var active_event;
      if (relay_object == null) {
        relay_object = void 0;
      }
      active_event = _.filter(this.all_events, function(e) {
        return e.id === event_id;
      })[0];
      this.run_event(active_event, relay_object);
    },
    trigger_event_by_name: function(event_name, relay_object) {
      var active_event;
      if (relay_object == null) {
        relay_object = void 0;
      }
      active_event = _.filter(this.all_events, function(e) {
        return e.name === event_name;
      })[0];
      this.run_event(active_event, relay_object);
    },
    run_event: function(active_event, relay_object) {
      if (relay_object == null) {
        relay_object = void 0;
      }
      if (active_event == null) {
        return;
      }
      if (active_event.run_once === true) {
        this.remove_event(active_event.id);
      }
      if (relay_object !== void 0 && active_event.return_element === true) {
        sparrow.models[active_event.module_name][active_event.callback](relay_object);
      } else {

      }
      sparrow.models[active_event.module_name][active_event.callback]();
    },
    remove_event: function(event_id) {
      this.all_events = _.filter(this.all_events, function(e) {
        return e.id !== event_id;
      });
      this.screen_events = _.filter(this.all_events, function(e) {
        return e.type === "in_screen" || e.type === "window_resize";
      });
    }
  };

  sparrow.EventHandler.initialize();

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.BaseModule = Backbone.Model.extend({
    defaults: {
      name: "base_module",
      load_latency_ms: 0,
      latency_interval_ms: 0,
      base_dependencies: ["base_module_handler"],
      dependencies: [],
      loaded: false,
      rendered: false,
      html_content: false,
      element_selector: false,
      external_script_url: false,
      persistent: false,
      events: []
    },
    initialize: function() {
      this.bind('load', function() {
        var _this = this;
        if (this.get('events').length > 0) {
          this.prepare_events();
        }
        if (this.on_load) {
          this.on_load();
        }
        this.after_filter();
        this.on('change:html_content', function() {
          if (_this.get('view') != null) {
            sparrow.views[_this.get('view')].add_to_render(_this);
          }
        });
      });
      this.before_filter();
    },
    prepare_events: function() {
      var e, event_attributes, registered_events, _i, _len, _ref;
      registered_events = [];
      _ref = this.get('events');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        event_attributes = {};
        e.type || (e.type = "manual");
        e.return_element || (e.return_element = false);
        if (e.run_once !== false) {
          e.run_once = true;
        }
        if (e.type === "in_screen") {
          e.margin || (e.margin = 0);
          event_attributes.dom_element = sparrow.views[this.get('view')].element;
        }
        event_attributes.module_name = this.get("name");
        e.id = sparrow.EventHandler.bind_event(_({}).extend(e, event_attributes));
        e.registred = true;
        registered_events.push(e);
      }
      this.set('events', registered_events);
    },
    load: function() {
      if (this.get('loaded') && this.get("external_script_url") === false) {
        throw "Already loaded " + (this.get('name')) + "!";
      }
      this.set('loaded', true);
      this.trigger('load');
    },
    before_filter: function() {
      this.set(this.local_attributes);
      this.add_local_dependencies();
      sparrow.BaseModuleHandler.add_model_to_queue(this);
    },
    add_local_dependencies: function() {
      var view_and_collection;
      this.set('dependencies', _.uniq(this.get('dependencies').concat(this.get('base_dependencies'))));
      view_and_collection = _.compact([this.get('view'), this.get('collection')]);
      this.set('dependencies', _.uniq(this.get('dependencies').concat(view_and_collection)));
      if (this.get('html_content') !== false) {
        this.set('dependencies', _.uniq(this.get('dependencies').concat(['jQuery'])));
      }
    },
    after_filter: function() {
      if (this.get('collection') != null) {
        sparrow.collections[this.get('collection')].model = sparrow.BaseModule;
        sparrow.collections[this.get('collection')].add(this);
      }
      this.set("load_latency_ms", sparrow.get_latency());
      this.set("latency_interval_ms", sparrow.get_latency_interval());
      this.log_dependeny();
      sparrow.BaseModuleHandler.register_available_dependency(this.get('name'));
    },
    log_dependeny: function() {
      var log_message;
      if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true') {
        log_message = "> [" + (this.get('load_latency_ms')) + "ms] (process time: " + (this.get('latency_interval_ms')) + "ms)   [" + (this.get('name')) + "]  ---  Dependencies: " + (this.get('dependencies'));
        sparrow.module_log.push(log_message);
        console.log(log_message);
      }
    }
  });

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.sparrow || (window.sparrow = {});

  sparrow.loaded_modules = new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.model = sparrow.BaseModule;

    _Class.prototype.initialize = function() {};

    return _Class;

  })(Backbone.Collection));

  sparrow.queued_modules = new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref1 = _Class.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    _Class.prototype.model = sparrow.BaseModule;

    _Class.prototype.loaded_dependencies = [];

    _Class.prototype.triggered_events = [];

    _Class.prototype.initialize = function() {
      this.bind('add', this.check_queue);
    };

    _Class.prototype.check_queue = function(e) {
      var i, model, models, _i, _len;
      if (e == null) {
        e = null;
      }
      models = _.clone(this.models);
      for (i = _i = 0, _len = models.length; _i < _len; i = ++_i) {
        model = models[i];
        this.load_model_if_ready(model);
      }
    };

    _Class.prototype.load_model_if_ready = function(model) {
      var _this = this;
      if (_.every(model.get('dependencies'), function(d) {
        return _.indexOf(sparrow.BaseModuleHandler.loaded_dependencies, d) !== -1;
      }) && _.every(model.get('wait_for_events'), function(e) {
        return _.indexOf(sparrow.BaseModuleHandler.triggered_events, e) !== -1;
      })) {
        this.remove(model);
        sparrow.BaseModuleHandler.load_model(model);
      }
    };

    return _Class;

  })(Backbone.Collection));

}).call(this);

(function() {
  var BaseModuleHandlerObject;

  BaseModuleHandlerObject = {
    name: "base_module_handler",
    loaded_dependencies: [],
    triggered_events: [],
    initialize: function() {
      this.on('registered_dependency', function() {
        return sparrow.queued_modules.check_queue();
      });
      this.on('triggered_event', function() {
        return sparrow.queued_modules.check_queue();
      });
      this.register_available_dependency(this.name);
    },
    add_model_to_queue: function(model) {
      sparrow.queued_modules.add(model);
    },
    load_model: function(model) {
      if (model.get("loaded") === true) {
        sparrow.queued_modules.remove(model);
        return;
      }
      sparrow.loaded_modules.add(model);
      sparrow.models[model.get("name")] = model;
      if (model.get("external_script_url") !== false) {
        setTimeout((function() {
          if (!(model.get("external_script_url") instanceof Function)) {
            if (sparrow.models.error_logger) {
              return sparrow.models.error_logger.check_module(model);
            }
          }
        }), 20000);
        sparrow.loadScript(model.get("external_script_url"), model.get("name"));
      } else {
        model.load();
      }
    },
    trigger_event: function(event) {
      if (_.indexOf(this.triggered_events, event) !== -1) {
        return;
      }
      this.triggered_events.push(event);
      if (sparrow.queued_modules != null) {
        return this.trigger('triggered_event');
      }
    },
    register_available_dependency: function(dependency) {
      if (_.indexOf(this.loaded_dependencies, dependency) !== -1) {
        return;
      }
      this.loaded_dependencies.push(dependency);
      if (sparrow.queued_modules != null) {
        this.trigger('registered_dependency');
      }
      return this.log_dependency(dependency);
    },
    log_dependency: function(dependency) {
      var log_message;
      if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true') {
        log_message = "- [" + (sparrow.get_latency()) + "ms] - (interval: " + (sparrow.get_latency_interval()) + "ms) Dependency '" + dependency + "' met.";
        sparrow.dependency_log.push(log_message);
        console.log(log_message);
      }
    }
  };

  window.sparrow || (window.sparrow = {});

  sparrow.BaseModuleHandler || (sparrow.BaseModuleHandler = {});

  _.extend(sparrow.BaseModuleHandler, Backbone.Events);

  _.extend(sparrow.BaseModuleHandler, BaseModuleHandlerObject);

  sparrow.BaseModuleHandler.initialize();

  jQuery(function() {
    sparrow.BaseModuleHandler.register_available_dependency("jQuery");
  });

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.sparrow || (window.sparrow = {});

  sparrow.BaseView = (function(_super) {
    __extends(BaseView, _super);

    function BaseView() {
      _ref = BaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseView.prototype.name = 'base_view';

    BaseView.prototype.el = document.createElement("div");

    BaseView.prototype.render_queue = [];

    BaseView.prototype.initialize = function() {
      this.set_target_element(this.element);
      if (this.collection != null) {
        this.collection = sparrow.collections[this.collection];
      }
      sparrow.views[this.name] = this;
      sparrow.BaseModuleHandler.register_available_dependency(this.name);
    };

    BaseView.prototype.add_to_render = function(module) {
      if (_.indexOf(this.render_queue, module) === -1) {
        this.render_queue.push(module);
      }
      this.render();
    };

    BaseView.prototype.render = function() {
      var module, _i, _len, _ref1;
      this.render_queue = _.filter(this.render_queue, function(m) {
        return m.get('rendered') === false;
      });
      _ref1 = this.render_queue;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        module = _ref1[_i];
        this.set_target_element(this.element, module.get('element_selector'));
        if (module.get('html_content') !== false) {
          jQuery(this.el).html(module.get('html_content'));
        }
        module.set('rendered', true);
      }
      return this;
    };

    BaseView.prototype.set_target_element = function(selector, module_element_selector) {
      if (module_element_selector) {
        selector += module_element_selector;
      }
      this.el = jQuery(selector);
    };

    return BaseView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "env_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "fusion_ads_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "header_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "test_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {


}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.loadScript = function(url, module_name, async) {
    var done, head, script;
    if (async == null) {
      async = false;
    }
    if (document.getElementById(module_name)) {
      return;
    }
    if (url instanceof Function) {
      url = url();
    }
    if (!url) {
      return;
    }
    head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.id = module_name;
    done = false;
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        if (sparrow.models[module_name].get && sparrow.models[module_name].get("loaded") !== true) {
          sparrow.models[module_name].load();
        }
        script.onload = script.onreadystatechange = null;
        if (sparrow.models[module_name].get) {
          if (head && script.parentNode && sparrow.models[module_name].get('persistent') === false) {
            return head.removeChild(script);
          }
        }
      }
    };
    return head.insertBefore(script, head.firstChild);
  };

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: 'error_logger',
      env: 'development',
      errors: []
    };

    _Class.prototype.on_load = function() {
      if (window.SiteObject && window.SiteObject.environment) {
        this.set('env', window.SiteObject.environment);
      }
      if (this.get('env') === 'development') {
        window.onerror = this.dump_environment;
      }
    };

    _Class.prototype.check_module = function(module) {
      var errors;
      if (module.get('loaded') !== true) {
        errors = this.get('errors');
        if (module.get("external_script_url") !== false) {
          errors.push({
            name: module.get('name'),
            message: "Problem loading " + (module.get('external_script_url'))
          });
        }
        this.set('errors', errors);
        sparrow.EventHandler.trigger_event_by_name('error');
      }
    };

    _Class.prototype.dump_environment = function(msg, url, line) {
      var log;
      log = function(label, logger) {
        var error;
        try {
          return console.log(label, logger());
        } catch (_error) {
          error = _error;
          return console.log("Failed to log:", label, logger);
        }
      };
      console.log("An error has occured!");
      console.log("Message:", msg, "URL:", url, "Line:", line);
      console.log("");
      console.log("Environment:");
      log("Loaded dependencies:", function() {
        return sparrow.BaseModuleHandler.loaded_dependencies;
      });
      log("Modules:", function() {
        return sparrow.models;
      });
      log("Collections:", function() {
        return sparrow.collections;
      });
      log("Views:", function() {
        return sparrow.views;
      });
      log("Queued modules:", function() {
        return sparrow.queued_modules.models;
      });
      log("Loaded modules:", function() {
        return sparrow.loaded_modules.models;
      });
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.image_holder';

    _Class.prototype.name = 'image_view';

    _Class.prototype.collection = 'test_collection';

    return _Class;

  })(sparrow.BaseView));

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref1 = _Class.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    _Class.prototype.local_attributes = {
      name: "image_module",
      view: 'image_view',
      collection: 'test_collection',
      html_content: "",
      dependencies: [],
      element_selector: "img",
      no_of_manual_events_fired: 0,
      events: [
        {
          type: "in_screen",
          callback: "load_high_res",
          run_once: true
        }
      ]
    };

    _Class.prototype.on_load = function() {};

    _Class.prototype.load_high_res = function() {
      jQuery('.image_holder').append("<img src='" + (jQuery('.image_holder').attr('data-high-res-url')) + "' />");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      this.check_for_height_change = __bind(this.check_for_height_change, this);
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: 'responsive_iframe',
      dependencies: ['jQuery'],
      events: [
        {
          type: "manual",
          callback: "init_as_child",
          run_once: true,
          name: "run_in_iframe"
        }
      ]
    };

    _Class.prototype.on_load = function() {
      this.iframes = jQuery('iframe[data-responsive-iframe]');
      return this.init_as_parent();
    };

    _Class.prototype.init_as_parent = function() {
      return this.add_event_listener();
    };

    _Class.prototype.add_event_listener = function() {
      if (window.addEventListener) {
        return window.addEventListener("message", this.message_handler.bind(this), false);
      } else {
        return window.attachEvent("onmessage", this.message_handler.bind(this));
      }
    };

    _Class.prototype.message_handler = function(event) {
      if (this.is_family_iframe(event)) {
        return this.handle_family_iframe_event(event);
      } else if (this.is_familybooking_iframe(event)) {
        return this.handle_familybooking_iframe_event(event);
      } else {
        return this.handle_iframe_event(event);
      }
    };

    _Class.prototype.event_is_valid = function(event) {
      var data, e;
      if (!event.data) {
        return false;
      }
      try {
        data = JSON.parse(event.data);
      } catch (_error) {
        e = _error;
        return false;
      }
      if (!data.source) {
        return false;
      }
      if (jQuery("[src^='" + data.source + "']").size() === 0) {
        return false;
      }
      if (!data.height || typeof data.height !== 'number') {
        return false;
      } else {
        return true;
      }
    };

    _Class.prototype.handle_iframe_event = function(event) {
      var data, iframe;
      if (!this.event_is_valid(event)) {
        return;
      }
      data = JSON.parse(event.data);
      iframe = jQuery("[src^='" + data.source + "']");
      if (iframe.height() !== data.height) {
        return iframe.height(data.height);
      }
    };

    _Class.prototype.is_familybooking_iframe = function(event) {
      if (event.data && (typeof event.data) === "string") {
        if (event.data.substring(0, 22) === "FAMILJEBOKNING_HEIGHT:" || event.data.substring(0, 21) === "FAMILJEBOKNING_TO_TOP") {
          return true;
        }
      } else {
        return false;
      }
    };

    _Class.prototype.is_family_iframe = function(event) {
      if (event.data && (typeof event.data) === "string") {
        if (event.data.substring(0, 14) === "FAMILJ_HEIGHT:" || event.data.substring(0, 14) === "FAMILJ_TO_TOP") {
          return true;
        }
      } else {
        return false;
      }
    };

    _Class.prototype.handle_family_iframe_event = function(event) {
      var height;
      if (event.data.substring(0, 14) === "FAMILJ_HEIGHT:") {
        height = parseInt(event.data.substring(14));
        if (height) {
          jQuery('.iframe_family').height(height);
        }
      }
      if (event.data.substring(0, 14) === "FAMILJ_TO_TOP") {
        return jQuery('.iframe_family')[0].scrollIntoView();
      }
    };

    _Class.prototype.handle_familybooking_iframe_event = function(event) {
      var height;
      if (event.data.substring(0, 22) === "FAMILJEBOKNING_HEIGHT:") {
        height = parseInt(event.data.substring(22));
        if (height) {
          jQuery('.iframebooking_family').height(height);
        }
      }
      if (event.data.substring(0, 21) === "FAMILJEBOKNING_TO_TOP") {
        return jQuery('.iframebooking_family')[0].scrollIntoView();
      }
    };

    _Class.prototype.init_as_child = function() {
      this.current_height = 0;
      this.current_url = location.protocol + '//' + location.host + location.pathname + location.search;
      window.requestAnimFrame(this.check_for_height_change);
    };

    _Class.prototype.check_for_height_change = function() {
      var _this = this;
      if (this.height_has_changed()) {
        this.update_current_height();
        this.notify_change();
      }
      return setTimeout((function() {
        return window.requestAnimFrame(_this.check_for_height_change);
      }), 500);
    };

    _Class.prototype.height_has_changed = function() {
      return this.current_height !== jQuery('body').height();
    };

    _Class.prototype.update_current_height = function() {
      return this.current_height = jQuery('body').height();
    };

    _Class.prototype.notify_change = function() {
      var payload;
      payload = {
        source: this.current_url,
        height: Math.round(this.current_height)
      };
      return window.parent.postMessage(JSON.stringify(payload), "*");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "site_module",
      collection: 'env_collection',
      dependencies: [],
      view_ads: false,
      debug: false,
      events: [
        {
          type: "manual",
          callback: "set_attributes_from_site_object",
          run_once: false,
          name: "update_site_module"
        }, {
          type: "window_resize",
          callback: "device_changed",
          run_once: false
        }
      ],
      current_device: void 0
    };

    _Class.prototype.on_load = function() {
      this.set('current_device', this.get_device());
      this.set_attributes_from_site_object();
      this.register_active_section();
    };

    _Class.prototype.before_filter = function() {
      if (!window.SiteObject) {
        this.local_attributes.dependencies.push('site_object');
      }
      return _Class.__super__.before_filter.apply(this, arguments);
    };

    _Class.prototype.register_active_section = function() {
      if (this.get('section') !== null) {
        window.sparrow.BaseModuleHandler.trigger_event('section_loaded');
      }
    };

    _Class.prototype.set_attributes_from_site_object = function() {
      var attribute_name, _i, _len, _ref1;
      _ref1 = _.keys(window.SiteObject);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attribute_name = _ref1[_i];
        this.set(attribute_name, window.SiteObject[attribute_name]);
      }
    };

    _Class.prototype.get_device = function() {
      var device;
      device = 'desktop';
      if (window.innerWidth <= 1024) {
        device = 'tablet';
      }
      if (window.innerWidth < 768) {
        device = 'mobile';
      }
      return device;
    };

    _Class.prototype.device_changed = function() {
      if (this.get('current_device') === this.get_device()) {
        return;
      }
      this.set('current_device', this.get_device());
      return sparrow.EventHandler.trigger_event_by_name("change_fusion_layout");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {


}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = 'body.articles.show .article';

    _Class.prototype.name = 'article';

    _Class.prototype.collection = 'env_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.ad_container';

    _Class.prototype.name = 'fusion_ads_view';

    _Class.prototype.collection = 'fusion_ads_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = 'head';

    _Class.prototype.name = 'header_view';

    _Class.prototype.collection = 'header_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.layout_wrapper';

    _Class.prototype.name = 'test_view';

    _Class.prototype.collection = 'env_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);
  
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "mixpanel",
      dependencies: ["site_module", "never_load"]
    };

    _Class.prototype.on_load = function() {
      if (window.sparrow.models.site_module.get("mixpanel_token") == null) {
        return;
      }
      (function(c, a) {
        var b, d, e, h;
        window.mixpanel = a;
        b = void 0;
        d = void 0;
        h = void 0;
        e = void 0;
        b = c.createElement("script");
        b.type = "text/javascript";
        b.async = !0;
        b.src = ("https:" === c.location.protocol ? "https:" : "http:") + "//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";
        d = c.getElementsByTagName("script")[0];
        d.parentNode.insertBefore(b, d);
        a._i = [];
        a.init = function(b, c, f) {
          var g;
          d = function(a, b) {
            c = b.split(".");
            2 === c.length && (a = a[c[0]], b = c[1]);
            return a[b] = function() {
              return a.push([b].concat(Array.prototype.slice.call(arguments_, 0)));
            };
          };
          g = a;
          if ("undefined" !== typeof f) {
            g = a[f] = [];
          } else {
            f = "mixpanel";
          }
          g.people = g.people || [];
          h = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "alias", "name_tag", "set_config", "people.set", "people.set_once", "people.increment", "people.track_charge", "people.append"];
          e = 0;
          while (e < h.length) {
            d(g, h[e]);
            e++;
          }
          return a._i.push([b, c, f]);
        };
        return a.__SV = 1.2;
      })(document, window.mixpanel || []);
      return mixpanel.init(window.sparrow.models.site_module.get("mixpanel_token"));
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "foundation_loader",
      dependencies: ["jQuery"]
    };

    _Class.prototype.on_load = function() {
      if (typeof jQuery(document).foundation === 'function') {
        jQuery(document).foundation(function(response) {
          return sparrow.BaseModuleHandler.register_available_dependency("foundation");
        });
      }
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);
