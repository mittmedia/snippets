@IframeFixer =
  windowLoaded: false
  queue: []
  count: 0

  enqueueIframe: (el) ->
    if el.getAttribute('data-src') != null && el.getAttribute('data-src') != ''
      @queue.push(el)
      @runQueue()

  runQueue: ->
    for el in @queue
      if el?
        setTimeout (=>
          el.src = el.getAttribute('data-src')
          @removeFromQueue(el)
        ), 0
  
  removeFromQueue: (el) ->
    i = 0
    tmp_queue = @queue
    while i < tmp_queue.length
      if tmp_queue[i] == el
        @queue[i] = null
      i++

  ad_is_iframe: (payload) ->
    # Contains closing iframe tag and has src attribute with value containing real url
    if payload.toLowerCase().indexOf('</iframe>') > -1 && payload.toLowerCase().indexOf(' src="http://') > -1
      @count++
      return true
    else
      return false

  reset_legacy_payload: (payload) ->
    return payload if @detectIE()
    # Check to see that iframe doesn't already have a data-src attribute
    payload = @setup_dohi_widget(payload)
    payload = @setup_ppw(payload)
      #return payload.replace(' src=', ' data-src=').replace(' SRC=', ' data-src=')
    return payload

  setup_dohi_widget: (payload) ->
    if payload.indexOf('http://dohi-widgets.mmcloud.se') > -1
      return payload.replace('http://dohi-widgets.mmcloud.se', 'http://dohi-widgets.mmcloud.se/iframe_loader?url=http://dohi-widgets.mmcloud.se')
    else
      return payload

  setup_ppw: (payload) ->
    if payload.indexOf('http://ppw-iframe.mmcloud.se') > -1
      return payload.replace('http://ppw-iframe.mmcloud.se', 'http://ppw-iframe.mmcloud.se/pages/iframe_loader.html?url=http://ppw-iframe.mmcloud.se')
    else
      return payload

  attach: ->
    @addEvent window, 'load', =>
      @windowLoaded = true
      @runQueue()

  addEvent: (element, eventName, fn) ->
    if element.addEventListener
      element.addEventListener eventName, fn, false
    else 
      element.attachEvent "on" + eventName, fn if element.attachEvent


  detectIE: ->
    ua = window.navigator.userAgent
    msie = ua.indexOf("MSIE ")
    trident = ua.indexOf("Trident/")
    
    # IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10)  if msie > 0
    if trident > 0
      
      # IE 11 (or newer) => return version number
      rv = ua.indexOf("rv:")
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10)
    
    # other browser
    false

# Init 
IframeFixer.attach();