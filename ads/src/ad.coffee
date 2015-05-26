class @Ad
  @loadedPlacements: {}
  @devicePrefixes:
    m:   'mobile'
    d:   'desktop'
    t:   'tablet'
  @currentId: 0
  defaultParams:
    id: 0
    type: ''
    layout: ''
    device: ''
    index: 0
    renderNow: false
    elementId: ''
    autoIndex: false
  constructor: (params) ->
    @[key] = value for key, value of @defaultParams
    @[key] = value for key, value of params
    @id         = @currentId
    @elementId  = @_getElementId()
    @layout     = @_getLayout()
    Ad.currentId++
    return

  render: ->
    AdSetup.queueAd( @ ) if Ad.currentDevice == Ad.devicePrefixes[@device] && @layout != false # Check if ad has current device as target

  ## private

  _getElementId: ->
    elementId = @device + '_' + @type
    if @index > 0
      if Ad.loadedPlacements[elementId]? then Ad.loadedPlacements[elementId].push(@index) else Ad.loadedPlacements[elementId] = [@index] # Save placement without id as key
      elementId += '_' + @index
    else if @autoIndex
      el = document.getElementById(elementId)
      @index = @_getAutoIndex(elementId)
      elementId += '_' + @index
      @_setNewElementAttributes(el, elementId)
    return elementId

  _setNewElementAttributes: (el, newElementId) ->
    # Set attributes
    el.id = newElementId
    el.setAttribute('data-fusion-placement', newElementId)
    el.setAttribute('data-fusion-id', newElementId)

  _getAutoIndex: (elementId) ->
    # Check if any indexes have been used for this placement yet
    if !Ad.loadedPlacements[elementId]?
      Ad.loadedPlacements[elementId] = [1]
      return 1
    # Make up for any gaps in ad indexes eg. if box_2 was loaded before box_1 nextIndex will be 1
    sortedIndexes = Ad.loadedPlacements[elementId].sort()
    i = 1
    while i < (sortedIndexes.length + 1)
      if i != sortedIndexes[i - 1]
        nextIndex = i
      i++
    # If we didn't find any gaps, add 1 to highest index previously used
    if !nextIndex?
      nextIndex = Ad.loadedPlacements[elementId].sort()[Ad.loadedPlacements[elementId].length - 1] + 1
    # Add next id to loaded id's
    Ad.loadedPlacements[elementId].push(nextIndex)
    return nextIndex

  _getLayout: (ad) ->
    return @layout if @layout != '' # if layout is predefined
    prefix = Ad.devicePrefixes[@device]
    if @index == 0
      layout = prefix + '_etage_special'
    else
      layoutIndex = Math.ceil(@index/2)
      return false if layoutIndex > 5
      layout = prefix + '_etage_0' + layoutIndex
    return layout
