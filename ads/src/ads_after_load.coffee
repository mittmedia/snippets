@AdsAfterLoad =
  unprocessedAds: []
  onAdRendered: (start_time, element, c = null, elementId = '') ->
    IframeFixer.enqueueIframe(iframe) for iframe in element.getElementsByTagName('IFRAME')
    # .ad-placement
    adPlacementEl = element.parentNode.parentNode
    adPlacementClasses = " rendered"
    adPlacementEl.className += adPlacementClasses

    # .ad-container
    adContainerEl = element.parentNode
    adContainerEl.className += " rendered"
    AdsAfterLoad.setupSizeFormat(element, elementId)
    return

  setupSizeFormat: (element, elementId) ->
    attrs = AdsLoaderFusion.adsAttributes[elementId]
    if attrs.length > 0
      if (attrs[0]['HEIGHT_01']? && attrs[0]['WIDTH_01']) && (attrs[0]['HEIGHT_01'] != '' && attrs[0]['WIDTH_01'] != '')
        heightRatio = Math.ceil(Number(attrs[0]['HEIGHT_01']) / Number(attrs[0]['WIDTH_01']) * 100)
        #element.className += " fixed-ratio"
        #element.style.paddingBottom = "#{heightRatio}%"
      else
        AdsAfterLoad.fixEmbedFormat(element)

  fixEmbedFormat: (element) ->
    if element.innerHTML.trim() != ''
      resources = element.getElementsByTagName('IFRAME')
      if !resources? || resources.length == 0
        resources = element.getElementsByTagName('OBJECT')
      AdsAfterLoad.resizeFromElement(element, resources)
    else
      setTimeout (->
        return if AdsAfterLoad.unprocessedAds.indexOf(element)
        AdsAfterLoad.fixEmbedFormat(element)
        AdsAfterLoad.unprocessedAds.push(element)
      ), 300

  resizeFromElement: (element, resources) ->
    for resource in resources
      width = Number(resource.width)
      height = Number(resource.height)
