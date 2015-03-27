// Generated by CoffeeScript 1.9.1
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.IframeFixer = {
    windowLoaded: false,
    queue: [],
    count: 0,
    enqueueIframe: function(el) {
      if (el.getAttribute('data-src') !== null && el.getAttribute('data-src') !== '') {
        this.queue.push(el);
        return this.runQueue();
      }
    },
    runQueue: function() {
      var el, j, len, ref, results;
      ref = this.queue;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        el = ref[j];
        if (el != null) {
          results.push(setTimeout(((function(_this) {
            return function() {
              el.src = el.getAttribute('data-src');
              return _this.removeFromQueue(el);
            };
          })(this)), 0));
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    removeFromQueue: function(el) {
      var i, results, tmp_queue;
      i = 0;
      tmp_queue = this.queue;
      results = [];
      while (i < tmp_queue.length) {
        if (tmp_queue[i] === el) {
          this.queue[i] = null;
        }
        results.push(i++);
      }
      return results;
    },
    ad_is_iframe: function(payload) {
      if (payload.toLowerCase().indexOf('</iframe>') > -1 && payload.toLowerCase().indexOf(' src="http://') > -1) {
        this.count++;
        return true;
      } else {
        return false;
      }
    },
    reset_legacy_payload: function(payload) {
      if (this.detectIE()) {
        return payload;
      }
      payload = this.setup_dohi_widget(payload);
      payload = this.setup_ppw(payload);
      return payload;
    },
    setup_dohi_widget: function(payload) {
      if (payload.indexOf('http://dohi-widgets.mmcloud.se') > -1) {
        return payload.replace('http://dohi-widgets.mmcloud.se', 'http://dohi-widgets.mmcloud.se/iframe_loader?url=http://dohi-widgets.mmcloud.se');
      } else {
        return payload;
      }
    },
    setup_ppw: function(payload) {
      if (payload.indexOf('http://ppw-iframe.mmcloud.se') > -1) {
        return payload.replace('http://ppw-iframe.mmcloud.se', 'http://ppw-iframe.mmcloud.se/pages/iframe_loader.html?url=http://ppw-iframe.mmcloud.se');
      } else {
        return payload;
      }
    },
    attach: function() {
      return this.addEvent(window, 'load', (function(_this) {
        return function() {
          _this.windowLoaded = true;
          return _this.runQueue();
        };
      })(this));
    },
    addEvent: function(element, eventName, fn) {
      if (element.addEventListener) {
        return element.addEventListener(eventName, fn, false);
      } else {
        if (element.attachEvent) {
          return element.attachEvent("on" + eventName, fn);
        }
      }
    },
    detectIE: function() {
      var msie, rv, trident, ua;
      ua = window.navigator.userAgent;
      msie = ua.indexOf("MSIE ");
      trident = ua.indexOf("Trident/");
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }
      if (trident > 0) {
        rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }
      return false;
    }
  };

  IframeFixer.attach();

  this.AdsAfterLoad = {
    unprocessedAds: [],
    onAdRendered: function(start_time, element, c, elementId) {
      var adContainerEl, adPlacementClasses, adPlacementEl, iframe, j, len, ref;
      if (c == null) {
        c = null;
      }
      if (elementId == null) {
        elementId = '';
      }
      ref = element.getElementsByTagName('IFRAME');
      for (j = 0, len = ref.length; j < len; j++) {
        iframe = ref[j];
        IframeFixer.enqueueIframe(iframe);
      }
      adPlacementEl = element.parentNode.parentNode;
      adPlacementClasses = " rendered";
      adPlacementEl.className += adPlacementClasses;
      adContainerEl = element.parentNode;
      adContainerEl.className += " rendered";
      AdsAfterLoad.setupSizeFormat(element, elementId);
    },
    setupSizeFormat: function(element, elementId) {
      var attrs, heightRatio;
      attrs = AdsLoaderFusion.adsAttributes[elementId];
      if (attrs.length > 0) {
        if (((attrs[0]['HEIGHT_01'] != null) && attrs[0]['WIDTH_01']) && (attrs[0]['HEIGHT_01'] !== '' && attrs[0]['WIDTH_01'] !== '')) {
          return heightRatio = Math.ceil(Number(attrs[0]['HEIGHT_01']) / Number(attrs[0]['WIDTH_01']) * 100);
        } else {
          return AdsAfterLoad.fixEmbedFormat(element);
        }
      }
    },
    fixEmbedFormat: function(element) {
      var resources;
      if (element.innerHTML.trim() !== '') {
        resources = element.getElementsByTagName('IFRAME');
        if ((resources == null) || resources.length === 0) {
          resources = element.getElementsByTagName('OBJECT');
        }
        return AdsAfterLoad.resizeFromElement(element, resources);
      } else {
        return setTimeout((function() {
          if (AdsAfterLoad.unprocessedAds.indexOf(element)) {
            return;
          }
          AdsAfterLoad.fixEmbedFormat(element);
          return AdsAfterLoad.unprocessedAds.push(element);
        }), 300);
      }
    },
    resizeFromElement: function(element, resources) {
      var height, j, len, resource, results, width;
      results = [];
      for (j = 0, len = resources.length; j < len; j++) {
        resource = resources[j];
        width = Number(resource.width);
        results.push(height = Number(resource.height));
      }
      return results;
    }
  };

  this.AdsLoaderFusion = {
    adCategories: ["sport", "familj", "ekonomi", "noje", "opinion"],
    loadedLayouts: [],
    fusionBaseOptions: {
      server: 'fusion.adtoma.com',
      mediazone: 'mittmedia_ab.mittmedia'
    },
    recievedAds: {},
    adsAttributes: {},
    loadAd: function(ad) {
      var adspace_id;
      console.log(ad);
      adspace_id = ad.device + '_' + ad.type + '_' + ad.index;
      if (this.loadedLayouts.indexOf(ad.layout) === -1) {
        this.loadedLayouts.push(ad.layout);
        return this._getAdsFromFusion(ad);
      } else {
        return this._loadAdFromReceivedFusionData(ad.elementId);
      }
    },
    onAdsLoaded: function(start_time) {
      var key, ref, value;
      this.recievedAds = this._extendWithFusionAdsData(this.recievedAds);
      ref = this.recievedAds;
      for (key in ref) {
        value = ref[key];
        if (value.length <= 0 || !document.getElementById(key) || this.recievedAds[key][0].loaded) {
          continue;
        }
        if (sparrow.models[key] == null) {
          this._renderPayloadOnPage(key);
        } else if ((sparrow.models[key] != null) && sparrow.models[key].get('ready')) {
          this._renderPayloadOnPage(key);
        }
      }
    },
    _extendWithFusionAdsData: function(recievedAds) {
      var index, j, key, len, ref, value, values;
      ref = Fusion.components;
      for (key in ref) {
        values = ref[key];
        if (values.length > 0) {
          this.adsAttributes[key] = [];
          for (index = j = 0, len = values.length; j < len; index = ++j) {
            value = values[index];
            if (values[index].attributes) {
              this.adsAttributes[key].push(values[index].attributes);
            }
          }
          recievedAds[key] = values;
        }
      }
      Fusion.components = recievedAds;
      return recievedAds;
    },
    _loadAdFromReceivedFusionData: function(adName) {
      if ((this.recievedAds[adName] != null) && this.recievedAds[adName].length > 0 && !this.recievedAds[adName][0].loaded) {
        return this._renderPayloadOnPage(adName);
      }
    },
    _renderPayloadOnPage: function(adName) {
      var payload;
      payload = this.recievedAds[adName][0].attributes.Payload;
      if (IframeFixer.ad_is_iframe(payload)) {
        this._setupIframe(adName);
      }
      if (this._isNetworkAd(payload)) {
        this.recievedAds[adName][0].loaded = true;
        this.recievedAds[adName][0].attributes.Payload = '';
        this._loadNetworkAd(adName, payload);
        setTimeout(((function(_this) {
          return function() {
            var adID;
            adID = _this.recievedAds[adName][0]['id'];
            window.Fusion.adimpurl[adName] = window.Fusion.protocol + window.Fusion.adServer + "/impression/titls/" + window.Fusion.mediaZone + "/" + window.Fusion.layout + "/" + adID;
            return window.Fusion.cntAdImp(adName);
          };
        })(this)), 0);
      } else if (this._isTextAd(adName)) {
        this._loadTextAd(adName);
      } else {
        this.recievedAds[adName][0].loaded = true;
        window.Fusion.updatePlacement({
          placement: adName,
          space: adName,
          countimp: true
        });
      }
    },
    _setupIframe: function(adName) {
      var payload;
      payload = this.recievedAds[adName][0].attributes['Payload'];
      return this.recievedAds[adName][0].attributes['Payload'] = IframeFixer.reset_legacy_payload(payload);
    },
    _isTextAd: function(adName) {
      return adName.indexOf('_text') > -1;
    },
    _loadTextAd: function(adName) {
      var el, index, j, len, ref, textAd;
      el = document.getElementById(adName);
      ref = this.recievedAds[adName];
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        textAd = ref[index];
        this.recievedAds[adName][index].loaded = true;
        el.innerHTML += textAd.attributes.Payload;
      }
      return AdsAfterLoad.onAdRendered(null, el, null, adName);
    },
    _isNetworkAd: function(payload) {
      return (payload.indexOf('admeta') > -1 || payload.indexOf('emediate') > -1 || payload.indexOf('widespace') > -1) && (payload.indexOf('data-order-id') > -1 || payload.indexOf('data-network') > -1);
    },
    _loadNetworkAd: function(key, payload) {
      var el, models;
      models = sparrow.models;
      if (payload.indexOf('admeta') > -1) {
        models.admeta_handler.process_ad(key);
      }
      if (payload.indexOf('emediate') > -1) {
        models.emediate_handler.process_ad(key, payload);
      }
      if (payload.indexOf('widespace') > -1) {
        sparrow.models.widespace_handler.process_ad(key, payload);
      }
      el = document.getElementById(key);
      AdsAfterLoad.onAdRendered(null, el, null, key);
    },
    _getAdsFromFusion: function(ad) {
      var currentTime, settings;
      currentTime = new Date().getTime() / 1000;
      settings = this._getSettings(ad);
      window.Fusion.parameters = this._getFusionParameters();
      return window.Fusion.load(this.fusionBaseOptions.server, settings.mediazone, settings.layout, {
        options: {
          countimp: true,
          onloadcallback: this.onAdsLoaded.bind(this, [currentTime]),
          onshowcallback: AdsAfterLoad.onAdRendered.bind(this, [currentTime]),
          onerror: this.onError.bind(this)
        }
      });
    },
    onError: function(adName) {
      console.log("Failed to load " + adName);
      return this._loadNetworkAd(adName, '_admeta_');
    },
    _getSettings: function(ad) {
      return {
        layout: ad.layout,
        mediazone: this._getMediaZone()
      };
    },
    _getMediaZone: function() {
      var mediazone;
      mediazone = this._getMediaZoneFromContentKeywords();
      if (!mediazone) {
        mediazone = this._getMediaZoneFromGeoLocation();
      }
      if (!mediazone || mediazone === region) {
        mediazone = 'ovrigt';
      }
      return [this.fusionBaseOptions.mediazone, mediazone].join('.');
    },
    _getRegion: function() {
      var city, j, len, ref, region, siteID;
      if (this._getMediaZoneFromGeoLocation() && this._allowedGeolocationSites(window.SiteObject.site_id)) {
        city = this._getCity(this._getMediaZoneFromGeoLocation());
        if (city) {
          return city.region;
        }
      }
      siteID = SiteObject.site_id.toLowerCase();
      ref = SiteObject.regions;
      for (j = 0, len = ref.length; j < len; j++) {
        region = ref[j];
        if (region.site_id.toLowerCase() === siteID) {
          return region.name;
        }
      }
    },
    _getMediaZoneFromContentKeywords: function() {
      var city, j, keyword, len, ref;
      ref = window.content_keywords || [];
      for (j = 0, len = ref.length; j < len; j++) {
        keyword = ref[j];
        city = this._getCity(keyword);
        if (city && city.name !== this._getRegion()) {
          return city.name;
        }
      }
      return false;
    },
    _getMediaZoneFromGeoLocation: function() {
      if (sparrow.cookies.is_set('consumer_location') && (window.SiteObject.site_id === 'HH' || this._allowedGeolocationSites(window.SiteObject.site_id))) {
        return sparrow.cookies.get('consumer_location');
      } else {
        return false;
      }
    },
    _getFusionParameters: function() {
      var CurrentParams, Params, key, ref, value;
      Params = {};
      CurrentParams = {
        kategori: this._getCategoryFromContentKeywords(),
        categories: window.content_keywords,
        tags: window.content_keywords,
        content_keywords: (window.content_keywords || []).join(','),
        ccaud: window.adtomaCC ? window.adtomaCC : void 0,
        have_snr: window._snr ? true : false,
        snr_id: window._snr || '',
        m_session_id: sparrow.models.site_module.get('session_id') || "",
        signed_in: sparrow.cookies.is_set('signed_in')
      };
      ref = window.Fusion.parameters;
      for (key in ref) {
        value = ref[key];
        Params[key] = value;
      }
      for (key in CurrentParams) {
        value = CurrentParams[key];
        Params[key] = value;
      }
      return Params;
    },
    _getCategoryFromContentKeywords: function() {
      var category, j, keyword, len, ref;
      category = "";
      ref = window.content_keywords || [];
      for (j = 0, len = ref.length; j < len; j++) {
        keyword = ref[j];
        if (this.adCategories.indexOf(keyword) >= 0) {
          category = keyword;
        }
      }
      return category;
    },
    _getCity: function(str) {
      var city, region;
      str = this._replaceChars(str);
      city = null;
      region = _.find(SiteObject.regions, function(r) {
        city = _.find(r.cities, function(c) {
          return _.contains(c.related_names, str);
        });
        if (city) {
          city.region = r.name;
          return city.site_id = r.site_id;
        }
      });
      if (city && (city.site_id === window.SiteObject.site_id || this._allowedGeolocationSites(window.SiteObject.site_id))) {
        return city;
      }
      return false;
    },
    _allowedGeolocationSites: function(siteID) {
      var allowedSites;
      allowedSites = ['TEST'];
      return _.contains(allowedSites, siteID);
    },
    _replaceChars: function(str) {
      var alphabetReplace;
      alphabetReplace = {
        'å': 'a',
        'ä': 'a',
        'ö': 'o',
        ' ': '_'
      };
      return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, (function(_this) {
        return function(s) {
          return alphabetReplace[s];
        };
      })(this));
    }
  };

  this.Ad = (function() {
    Ad.loadedPlacements = {};

    Ad.devicePrefixes = {
      m: 'mobile',
      d: 'desktop',
      t: 'tablet'
    };

    Ad.currentId = 0;

    Ad.prototype.defaultParams = {
      id: 0,
      type: '',
      layout: '',
      device: '',
      index: 0,
      renderNow: false,
      elementId: '',
      autoIndex: false
    };

    function Ad(params) {
      var key, ref, value;
      ref = this.defaultParams;
      for (key in ref) {
        value = ref[key];
        this[key] = value;
      }
      for (key in params) {
        value = params[key];
        this[key] = value;
      }
      this.id = this.currentId;
      this.elementId = this._getElementId();
      this.layout = this._getLayout();
      Ad.currentId++;
      return;
    }

    Ad.prototype.render = function() {
      if (Ad.currentDevice === Ad.devicePrefixes[this.device] && this.layout !== false) {
        return AdSetup.queueAd(this);
      }
    };

    Ad.prototype._getElementId = function() {
      var el, elementId;
      elementId = this.device + '_' + this.type;
      if (this.index > 0) {
        if (Ad.loadedPlacements[elementId] != null) {
          Ad.loadedPlacements[elementId].push(this.index);
        } else {
          Ad.loadedPlacements[elementId] = [this.index];
        }
        elementId += '_' + this.index;
      } else if (this.autoIndex) {
        el = document.getElementById(elementId);
        this.index = this._getAutoIndex(elementId);
        elementId += '_' + this.index;
        this._setNewElementAttributes(el, elementId);
      }
      return elementId;
    };

    Ad.prototype._setNewElementAttributes = function(el, newElementId) {
      el.id = newElementId;
      el.setAttribute('data-fusion-placement', newElementId);
      return el.setAttribute('data-fusion-id', newElementId);
    };

    Ad.prototype._getAutoIndex = function(elementId) {
      var i, nextIndex, sortedIndexes;
      if (Ad.loadedPlacements[elementId] == null) {
        Ad.loadedPlacements[elementId] = [1];
        return 1;
      }
      sortedIndexes = Ad.loadedPlacements[elementId].sort();
      i = 1;
      while (i < (sortedIndexes.length + 1)) {
        if (i !== sortedIndexes[i - 1]) {
          nextIndex = i;
        }
        i++;
      }
      if (nextIndex == null) {
        nextIndex = Ad.loadedPlacements[elementId].sort()[Ad.loadedPlacements[elementId].length - 1] + 1;
      }
      Ad.loadedPlacements[elementId].push(nextIndex);
      return nextIndex;
    };

    Ad.prototype._getLayout = function(ad) {
      var layout, layoutIndex, prefix;
      if (this.layout !== '') {
        return this.layout;
      }
      prefix = Ad.devicePrefixes[this.device];
      if (this.index === 0) {
        layout = prefix + '_etage_special';
      } else {
        layoutIndex = Math.ceil(this.index / 2);
        if (layoutIndex > 5) {
          return false;
        }
        layout = prefix + '_etage_0' + layoutIndex;
      }
      return layout;
    };

    return Ad;

  })();

  this.AdsFactory = {
    currentDevice: 'desktop',
    init: function(adClass) {
      var ad, adParams, i, j, key, len, ref, ref1, value;
      this._createMQElement();
      i = 0;
      while (i < adsQueue.length) {
        adsQueue[i].queueIndex = i;
        i++;
      }
      ref = adClass.devicePrefixes;
      for (key in ref) {
        value = ref[key];
        ref1 = this._sortQueueByDevice(key, adsQueue);
        for (j = 0, len = ref1.length; j < len; j++) {
          adParams = ref1[j];
          ad = new adClass(adParams);
          this.prepareAdLoad(ad);
        }
      }
      return window.adsQueue = {
        push: function(adParams) {
          ad = new adClass(adParams);
          if (AdsFactory.currentDevice === adClass.devicePrefixes[ad.device]) {
            return AdsFactory.prepareAdLoad(ad);
          }
        }
      };
    },
    prepareAdLoad: function(ad) {
      if (ad.renderNow === true) {
        return this.loadAdNow(ad);
      } else {
        return this._setupLazyLoad(ad);
      }
    },
    loadAdNow: function(ad) {
      return setTimeout((function() {
        return AdsLoaderFusion.loadAd(ad);
      }), 10);
    },
    _setupLazyLoad: function(ad) {
      return new ((function(superClass) {
        extend(_Class, superClass);

        function _Class() {
          return _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.local_attributes = {
          name: ad.elementId,
          view: 'fusion_ads_view',
          collection: 'fusion_ads_collection',
          element_selector: "#" + ad.elementId,
          ready: false,
          adParams: ad,
          events: [
            {
              type: "in_screen",
              callback: "inScreen",
              run_once: true,
              margin: 500
            }
          ]
        };

        _Class.prototype.inScreen = function() {
          this.set('ready', true);
          ad = this.get('adParams');
          return AdsFactory.loadAdNow(ad);
        };

        return _Class;

      })(sparrow.BaseModule));
    },
    _createMQElement: function() {
      var mediaQueryPlaceholderEl;
      mediaQueryPlaceholderEl = document.createElement("div");
      mediaQueryPlaceholderEl.id = 'ads-device-media-query';
      document.body.appendChild(mediaQueryPlaceholderEl);
      return this.currentDevice = window.getComputedStyle(mediaQueryPlaceholderEl, ':after').getPropertyValue('content').replace(/\"/g, '').replace(/\'/g, '');
    },
    _sortQueueByDevice: function(devicePrefix, queue) {
      var ad, autoIndexedAds, deviceQueue, indexedAds, j, k, len, len1;
      deviceQueue = [];
      for (j = 0, len = queue.length; j < len; j++) {
        ad = queue[j];
        if (ad.device === devicePrefix) {
          deviceQueue.push(ad);
        }
      }
      deviceQueue = deviceQueue.sort(function(a, b) {
        var ref;
        if (a.index === b.index) {
          return 0;
        }
        return (ref = a.index < b.index) != null ? ref : -{
          1: 1
        };
      });
      indexedAds = [];
      autoIndexedAds = [];
      for (k = 0, len1 = deviceQueue.length; k < len1; k++) {
        ad = deviceQueue[k];
        if (!ad.autoIndex) {
          indexedAds.push(ad);
        }
        if (ad.autoIndex) {
          autoIndexedAds.push(ad);
        }
      }
      autoIndexedAds = autoIndexedAds.sort(function(a, b) {
        var ref;
        if (a.queueIndex === b.queueIndex) {
          return 0;
        }
        return (ref = a.queueIndex < b.queueIndex) != null ? ref : -{
          1: 1
        };
      });
      return indexedAds.concat(autoIndexedAds);
    }
  };

  AdsFactory.init(Ad);

}).call(this);