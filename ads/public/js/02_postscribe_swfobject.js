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