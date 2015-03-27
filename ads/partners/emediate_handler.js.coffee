new class extends sparrow.BaseModule
  local_attributes: {
    name: "emediate_handler"
#    dependencies: ['fusion_handler']
    view: 'header_view'
    collection: 'header_collection'
    dependencies: ['site_module']
    external_script_url: 'http://eas.mediekompaniet.com/EAS_tag.1.0.js'
  }

  on_load: ->
    return
  process_ad: (id, payload) ->
    tmp = document.createElement('DIV')
    tmp.innerHTML = payload
    tmp = tmp.getElementsByTagName('DIV')[0] || null
    cu = tmp.getAttribute("data-order-id")
    @prepare_emediate(id, cu)
    return

  prepare_emediate: (id, cu) ->
    device      = window.sparrow.models.site_module.get('current_device')
    east_ecid   = "EASTecid=203|214|" if id == "emediate_d_mk468"

    EAS_load_fif(
      id,
      "/EAS_fif.html",
      "http://eas4.emediate.eu/eas?cu=#{cu};cre=mu;js=y;target=_blank;#{(east_ecid || '')}",
      0,
      600
    )
    return
