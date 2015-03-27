@AdsLoaderFusion =
  #dependencies: ['geo_location']
  adCategories: [
    "sport"
    "familj"
    "ekonomi"
    "noje"
    "opinion"
  ]
  loadedLayouts: []
  fusionBaseOptions:
    server: 'fusion.adtoma.com'
    mediazone: 'mittmedia_ab.mittmedia'
  recievedAds: {}
  adsAttributes: {}

  loadAd: (ad) ->
    console.log ad
    # checks if ad content was delivered in previously requested ad layouts
    adspace_id = ad.device + '_' + ad.type + '_' + ad.index
    if @loadedLayouts.indexOf(ad.layout) == -1 # Is ad layout loaded?
      @loadedLayouts.push(ad.layout)
      @_getAdsFromFusion(ad)
    else
      @_loadAdFromReceivedFusionData(ad.elementId)

  onAdsLoaded: (start_time) ->
    @recievedAds = @_extendWithFusionAdsData(@recievedAds)

    # called after json response from Fusion
    for key, value of @recievedAds
      # Check if value exists, target DOM element exists and that ad is not already loaded
      continue if value.length <= 0 || !document.getElementById(key) || @recievedAds[key][0].loaded

      # Ad not waiting for in_screen, load ad directly
      if !sparrow.models[key]?
        @_renderPayloadOnPage(key)

      # Ad is waiting for in_screen and is ready to be displayed
      else if sparrow.models[key]? && sparrow.models[key].get('ready')
        @_renderPayloadOnPage(key)
    return

  ## private

  _extendWithFusionAdsData: (recievedAds) ->
    for key, values of Fusion.components
      if values.length > 0
        @adsAttributes[key] = []
        for value, index in values
          @adsAttributes[key].push(values[index].attributes) if values[index].attributes
        recievedAds[key] = values

    Fusion.components = recievedAds
    return recievedAds

  _loadAdFromReceivedFusionData: (adName) ->
    if @recievedAds[adName]? && @recievedAds[adName].length > 0 && !@recievedAds[adName][0].loaded
      @_renderPayloadOnPage(adName)

  _renderPayloadOnPage: (adName) ->
    payload = @recievedAds[adName][0].attributes.Payload

    # Fix iframes here!
    @_setupIframe(adName) if IframeFixer.ad_is_iframe(payload)

    if @_isNetworkAd(payload)

      @recievedAds[adName][0].loaded = true
      @recievedAds[adName][0].attributes.Payload = ''
      @_loadNetworkAd(adName, payload)
      setTimeout (=>
        adID = @recievedAds[adName][0]['id']
        window.Fusion.adimpurl[adName]=window.Fusion.protocol+window.Fusion.adServer+"/impression/titls/"+window.Fusion.mediaZone+"/"+window.Fusion.layout+"/"+adID
        window.Fusion.cntAdImp(adName)
      ), 0
    else if @_isTextAd(adName)
      @_loadTextAd(adName)
    else
      @recievedAds[adName][0].loaded = true
      window.Fusion.updatePlacement({
        placement:  adName
        space:      adName
        countimp:   true
        })
    return

  _setupIframe: (adName) ->
    payload = @recievedAds[adName][0].attributes['Payload']
    @recievedAds[adName][0].attributes['Payload'] = IframeFixer.reset_legacy_payload(payload)

  _isTextAd: (adName) ->
    (adName.indexOf('_text') > -1)

  _loadTextAd: (adName) ->
    el = document.getElementById(adName)
    for textAd, index in @recievedAds[adName]
      @recievedAds[adName][index].loaded = true
      el.innerHTML += textAd.attributes.Payload
    AdsAfterLoad.onAdRendered(null, el, null, adName)

  _isNetworkAd: (payload) ->
    (payload.indexOf('admeta') > -1 || payload.indexOf('emediate') > -1 || payload.indexOf('widespace') > -1) && (payload.indexOf('data-order-id') > -1 || payload.indexOf('data-network') > -1)

  _loadNetworkAd: (key, payload) ->
    models = sparrow.models
    models.admeta_handler.process_ad(key) if payload.indexOf('admeta') > -1
    models.emediate_handler.process_ad(key, payload) if payload.indexOf('emediate') > -1
    sparrow.models.widespace_handler.process_ad(key, payload) if payload.indexOf('widespace') > -1
    el = document.getElementById(key)
    AdsAfterLoad.onAdRendered(null, el, null, key)
    return

  _getAdsFromFusion: (ad) ->
    currentTime = new Date().getTime() / 1000 # Can be used for performance checks
    settings    = @_getSettings(ad)
    window.Fusion.parameters = @_getFusionParameters()

    # this is where Fusion calls for all ads in layout (as json request)
    window.Fusion.load(
      @fusionBaseOptions.server,
      settings.mediazone,
      settings.layout,
      {
        options:
          countimp: true  # count impression when ad are requested from Fusion
          #onloadshowads: true
          onloadcallback: @onAdsLoaded.bind(@, [currentTime])
          onshowcallback: AdsAfterLoad.onAdRendered.bind(
            @,
            [currentTime]
          )
          onerror: @onError.bind(@)
      }
    )

  onError: (adName) ->
    console.log "Failed to load #{adName}"
    @_loadNetworkAd(adName, '_admeta_')

  _getSettings: (ad) ->
    return {
      layout:     ad.layout
      mediazone:  @_getMediaZone()
    }

  _getMediaZone: ->
    # media zone is in the format of 'mittmedia_ab.mittmedia.region.city'
    #region    = @_getRegion()
    mediazone = @_getMediaZoneFromContentKeywords()
    mediazone = @_getMediaZoneFromGeoLocation() if !mediazone
    mediazone = 'ovrigt' if !mediazone || mediazone == region
    return [@fusionBaseOptions.mediazone, mediazone].join('.')

  _getRegion: ->
    if @_getMediaZoneFromGeoLocation() && @_allowedGeolocationSites(window.SiteObject.site_id)
      city = @_getCity(@_getMediaZoneFromGeoLocation())
      return city.region if city
    siteID = SiteObject.site_id.toLowerCase()
    for region in SiteObject.regions
      return region.name if region.site_id.toLowerCase() == siteID

  _getMediaZoneFromContentKeywords: ->
    for keyword in (window.content_keywords || [])
      city     = @_getCity(keyword)
      return city.name if city && city.name != @_getRegion()
    return false

  _getMediaZoneFromGeoLocation: ->
    if sparrow.cookies.is_set('consumer_location') && (window.SiteObject.site_id == 'HH' || @_allowedGeolocationSites(window.SiteObject.site_id))
      return sparrow.cookies.get('consumer_location')
    else
      return false

  _getFusionParameters: ->
    Params = {}
    CurrentParams =
      kategori:         @_getCategoryFromContentKeywords()
      categories:       window.content_keywords # can be removed?
      tags:             window.content_keywords # can be removed?
      content_keywords: (window.content_keywords || []).join(',') # replaces all of the above
      ccaud:            window.adtomaCC if window.adtomaCC # Brain audiences
      have_snr:         if window._snr then true else false # do we have offline Brain data on user?
      snr_id:           window._snr || '' # Brain user id
      m_session_id:     (sparrow.models.site_module.get('session_id') || "") # Same user id as Comscore uses
      signed_in:        sparrow.cookies.is_set('signed_in') # Is the user signed in?
    Params[key] = value for key, value of window.Fusion.parameters
    Params[key] = value for key, value of CurrentParams
    return Params

  _getCategoryFromContentKeywords: ->
    category = ""
    for keyword in (window.content_keywords || [])
      category = keyword if @adCategories.indexOf(keyword) >= 0
    return category

  _getCity: (str) ->
    str = @_replaceChars(str)
    city = null
    region = _.find  SiteObject.regions, (r) ->
      city = _.find r.cities, (c) ->
        (_.contains(c.related_names, str))
      if city
        city.region = r.name
        city.site_id = r.site_id
    return city if city && (city.site_id == window.SiteObject.site_id || @_allowedGeolocationSites(window.SiteObject.site_id))
    return false

  _allowedGeolocationSites: (siteID) ->
    allowedSites = [
      'TEST'
      #'BP'
    ]
    _.contains(allowedSites, siteID)

  # Replaces unwanted chars in a 'websafe' string
  # Returns a lowercase string
  _replaceChars: (str) ->
    alphabetReplace =
      'å': 'a'
      'ä': 'a'
      'ö': 'o'
      ' ': '_'
    str.toLowerCase().replace /[^a-zA-Z0-9]/g, (s) =>
      return alphabetReplace[s]
