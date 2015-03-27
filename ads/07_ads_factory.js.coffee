@AdsFactory =
  currentDevice: 'desktop'
  init: (adClass) ->
    # Setup device detection
    @_createMQElement()
    # Sort queue so ads with index get prioritized
    i = 0
    while i < adsQueue.length
      adsQueue[i].queueIndex = i
      i++
    for key, value of adClass.devicePrefixes
      for adParams in @_sortQueueByDevice(key, adsQueue)
        ad = new adClass(adParams)
        @prepareAdLoad( ad ) #unless @currentDevice != adClass.devicePrefixes[ad.device]

    # from this point on, adsQueue.push() loads ad directly when called
    window.adsQueue =
      push: (adParams) ->
        ad = new adClass(adParams)
        AdsFactory.prepareAdLoad( ad ) unless AdsFactory.currentDevice != adClass.devicePrefixes[ad.device]

  prepareAdLoad: (ad) ->
    if ad.renderNow == true
      @loadAdNow(ad)
    else
      @_setupLazyLoad(ad)

  loadAdNow: (ad) ->
    setTimeout ( ->
      AdsLoaderFusion.loadAd(ad)
    ), 10

  ## private

  _setupLazyLoad: (ad) ->
    new class extends sparrow.BaseModule
      local_attributes: {
        name: ad.elementId
        view: 'fusion_ads_view'
        collection: 'fusion_ads_collection'
        element_selector: "##{ad.elementId}"
        ready: false
        adParams: ad
        events: [
          {
            type: "in_screen"
            callback: "inScreen"
            run_once: true
            margin: 500 #number of pixels below screen when event fires
          }
        ]
      }
      inScreen: ->
        @set('ready', true)
        ad = @get('adParams')
        AdsFactory.loadAdNow(ad)

  _createMQElement: ->
    mediaQueryPlaceholderEl = document.createElement("div")
    mediaQueryPlaceholderEl.id = 'ads-device-media-query'
    document.body.appendChild(mediaQueryPlaceholderEl)
    # Chrome and firefox interprets content property different, the replace() is a fix
    @currentDevice = window.getComputedStyle(mediaQueryPlaceholderEl, ':after').getPropertyValue('content').replace(/\"/g, '').replace(/\'/g, '')

  _sortQueueByDevice: (devicePrefix, queue) ->
    deviceQueue = []
    (deviceQueue.push(ad) if ad.device == devicePrefix) for ad in queue

    # Sort by index
    deviceQueue = deviceQueue.sort (a, b) ->
      return 0 if a.index == b.index
      a.index < b.index ? -1 : 1

    # Split indexed and non indexed ads to separate arrays
    indexedAds = []
    autoIndexedAds = []
    for ad in deviceQueue
      indexedAds.push(ad) if !ad.autoIndex
      autoIndexedAds.push(ad) if ad.autoIndex
    autoIndexedAds = autoIndexedAds.sort (a, b) ->
      return 0 if a.queueIndex == b.queueIndex
      a.queueIndex < b.queueIndex ? -1 : 1
    return indexedAds.concat(autoIndexedAds)

AdsFactory.init(Ad)
