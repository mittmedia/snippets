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