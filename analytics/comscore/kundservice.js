(function() {
  var ComScoreTracker = {
    startTracking: function(params) {
      var trackerImg;
      this._extendDefaultParams(params);
      this._trackingParams['m_session'] = this._fetchTrackingID();
      trackerImg = this._prepareTrackerImg();
      this._renderTrackingPixel(trackerImg);
    },
    // --- private ---
    _ComScoreTrackingURL: '//b.scorecardresearch.com/p?',
    // tracking params, using snake case for Comscore
    _trackingParams: {
      c1:               '2',        // static MittMedia number
      c2:               '16716221', // static MittMedia number
      ns_site:          'mainsite', // use 'testsite' for staging environment
      a_site:           'kundservice', // name of the site ID in ComScore.
      name:             '',         // title of ther current page
      m_content_keywords: '',         // keywords, tags and categories (pipe separated string)
      m_session:        ''          // user tracking id, auto generated in _fetchTrackingID()
    },
    _alphabetReplaceChars: {
      'Ã¥': 'a',
      'Ã¤': 'a',
      'Ã¶': 'o',
      ' ': '-'
    },
    _extendDefaultParams: function(params) {
      var key, value;
      for (key in params) {
        value = params[key];
        this._trackingParams[key] = value;
      }
    },
    _fetchTrackingID: function() {
      var name = '_csid' + '=';
      var allCookies = document.cookie.split(';');
      for(var i=0; i<allCookies.length; i++) {
          var c = allCookies[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) {
            trackingID = c.substring(name.length, c.length)
            // extends the cookie ttl and returns the value
            return this._createTrackingID(trackingID);
          }
      }
      return this._createTrackingID()
    },
    _createTrackingID: function(trackingID) {
      var expires;
      var d = new Date();
      // trackingID = [timestamp + random string]
      if(trackingID == undefined) {
        trackingID = Date.now() + Math.random().toString(36).substring(7);
      }
      d.setTime(d.getTime() + (365*24*60*60*1000));
      expires = "expires="+d.toUTCString();
      document.cookie = '_csid' + "=" + trackingID + "; " + expires;
      return trackingID;
    },
    _prepareTrackerImg: function() {
      var trackerImg;
      trackerImg     = document.createElement("img");
      trackerImg.id  = 'comscore-tracker';
      trackerImg.src = this._generatePixelTrackingUrl();
      return trackerImg;
    },
    _generatePixelTrackingUrl: function() {
      var contentKeywords = this._trackingParams.m_content_keywords;
      var pageURL = window.location.href;
      pageURL = pageURL.replace("http://www.","").replace("http://","");
      this._trackingParams.m_content_keywords = this._contentKeywords(contentKeywords, pageURL);
      this._trackingParams.name = this._websafeTitle(this._trackingParams.name) + '.page';
      return this._ComScoreTrackingURL + this._queryFromParams();
    },
    _contentKeywords: function(keywords, pageURL) {
      if(keywords.substr(-1)!=='|') keywords += '|';
      keywords += pageURL.replace(/\//g, '|');
      return keywords
    },
    _websafeTitle: function(title) {
      return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, (function(_this) {
        return function(s) {
          return (_this._alphabetReplaceChars[s] || "");
        };
      })(this));
    },
    _queryFromParams: function() {
      var key, value;
      var queryParams = [];
      for (key in this._trackingParams) {
        value = this._trackingParams[key];
        queryParams.push(key + '=' + value)
      }
      return queryParams.join('&');
    },
    _renderTrackingPixel: function(img) {
      img.width   = '1px';
      img.height  = '1px';
      document.body.appendChild(img);
    }
  };
  setTimeout(function(CST){
    CST.startTracking(
      {
        a_site: 'kundservice',
        m_content_keywords: 'external',
        name: document.title
      }
    );
  }, 300, ComScoreTracker);
})();
