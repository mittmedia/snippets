new class extends sparrow.BaseModule
  local_attributes: {
    name: "widespace_handler"
    view: 'header_view'
    collection: 'header_collection'
    dependencies: ['site_module']
  }

  on_load: ->
    return

  process_ad: (id, payload) ->
    tmp = document.createElement('DIV')
    tmp.innerHTML = payload
    tmp = tmp.getElementsByTagName('DIV')[0] || null
    cu = tmp.getAttribute("data-order-id")
    @load_ad(id, cu)
    return

  load_ad: (id, cu) ->
    el = document.getElementById(id)
    el.innerHTML = "<iframe data-src='/widespace_fif.html?cu=#{cu}' scrolling='no' frameborder='0' style='margin: 0px auto; border-width: 0px; padding: 0px;'></iframe>"
    IframeFixer.enqueueIframe(el)
    return
