new class extends sparrow.BaseModule
  local_attributes: {
    name: "admeta_handler"
    view: 'header_view'
    collection: 'header_collection'
    dependencies: ['site_module']
    ads_count: 1
    processed_ads: []
    external_script_url: 'http://s.atemda.com/Admeta.js'
    placements: {
        desktop: {
          panorama_wide:  { width: 1250, height: 600, rank: 1 }
          panorama:       { width: 980, height: 240, rank: 1 }
          box_wide:       { width: 250, height: 800, rank: 1 }
          box:            { width: 200, height: 300, rank: 1 }
        }
        tablet: {
          panorama:   { width: 1250, height: 600, rank: 1 }
          box_wide:   { width: 250, height: 800, rank: 1 }
          box:        { width: 200, height: 300, rank: 1 }
        }
        mobile: {
          box:        { width: 320, height: 480, rank: 1 }
        }
    }
    categories: [
      'Start'       # Till Adapt
      'Ettan'
      'Sport'       # Till Adapt
      'Ekonomi'     # Till Adapt
      'Kulturnoje'  # Till Adapt
      'Nyheter'     # Till Adapt
      'Ovrigt'      # Till Adapt
      'Fotboll'
      'Ishockey'
      'Modo'
      'Leksands'
      'Brynas'
      'Skidor'
      'Musik'
      'Konst'
      'Film'
      'Jobb'
      'Pengar'
    ]
  }

  on_load: ->
    return

  process_ad: (id) ->
    element = document.getElementById(id)
    processed_ads = @get('processed_ads')
    unless processed_ads.indexOf(id) >= 0
      processed_ads.push(id)
      @set('processed_ads', processed_ads)
      setTimeout (=>
        @prepare_adm_pl(id, element)
      ), 20
    return

  prepare_adm_pl: (id, e) ->
    placements  = @get('placements')
    device      = window.sparrow.models.site_module.get('current_device')
    ad_format   = @get_ad_format(e)
    ad_size     = placements[device][ad_format]
    page        = @get_page()
    #page = "#{page} ATF" if id.indexOf('_1') > -1
    window.ADM_PL = ADM_PL =
      centerImages: true
      tp:       'spt'
      pbId:     22
      protect:  true
      defLoad:  true
      tagId:    id
      site:     window.sparrow.models.site_module.get('site_id')
      page:     page + " #{@get('ads_count')}"
      rank:     placements[device][ad_format].rank
      width:    ad_size.width
      height:   ad_size.height
    @set_rank(device, ad_format)
    #if window.SiteObject.debug == "true"
    window.Admeta.processImpressions() if window.Admeta
    @set('ads_count', @get('ads_count') + 1)
    return

  get_ad_format: (element) ->
    return "box" if window.sparrow.models.site_module.get('current_device') == "mobile"
    return "panorama_wide"  if element.offsetWidth > 1100
    return "panorama"       if element.offsetWidth > 400
    return "box_wide"

  get_page: ->
    return "Ovrigt" unless window.content_keywords
    categories = @get('categories')
    compare_categories = _.map categories, (category) ->
      category.toLowerCase()
    for keyword in window.content_keywords
      for category, i in compare_categories
        if category.indexOf(keyword) > -1 || keyword.indexOf(category) > -1
          return "Start" if categories[i] == "Ettan"
          return "Sport" if categories[i] == "Fotboll" || categories[i] == "Ishockey" || categories[i] == "Skidor"
          return "Sport" if categories[i] == "Modo" || categories[i] == "Leksands" || categories[i] == "Brynas"
          return "Kulturnoje" if categories[i] == "Musik" || categories[i] == "Film" || categories[i] == "Konst"
          return "Ekonomi" if categories[i] == "Jobb" || categories[i] == "Pengar"
          return categories[i]
    "Nyheter"

  set_rank: (device, ad_format) ->
    placements  = @get('placements')
    placements[device][ad_format].rank += 1
    @set('placements', placements)
    return
