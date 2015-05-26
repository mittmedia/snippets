new class extends sparrow.BaseModule
  local_attributes: {
    name: 'geo_location'
    view: 'header_view'
    collection: 'header_collection'
    dependencies: ['site_module']
    regions: window.SiteObject.regions
    alphabet_replace: {
      'å': 'a'
      'ä': 'a'
      'ö': 'o'
      ' ': '_'
    }
  }

  should_do_ip_lookup: ->
    device = window.sparrow.models.site_module.get('current_device')
    if content_keywords.indexOf('article') > -1 && device == 'mobile'
      return false
    return !sparrow.cookies.is_set('consumer_location') || window.SiteObject.alert_location

  lookup_ip: ->
    jQuery.ajax
      #url: 'http://localhost:3000/api/v1/ip-location/city.js'
      url: 'http://geo-ip.mmcloud.se/api/v1/ip-location/city.js'
      dataType: 'jsonp'
      success: (response) ->
        # response is handled in @external_geo_response()
        return

  on_load: ->
    window.geolocationCityResponse = @external_geo_response
    window.geo_response = @geo_response
    if window.SiteObject.set_location
      sparrow.cookies.set('consumer_location', window.SiteObject.set_location, 10)
      alert "Positionen är knuten till #{@get_city(window.SiteObject.set_location).name}"
    @lookup_ip() if @should_do_ip_lookup()

  external_geo_response: (city, source) =>
    city_name = city.toLowerCase().replace(/[^a-zA-Z0-9]/g, (s) =>
        return @get('alphabet_replace')[s]
      )
    city = @get_city(city_name)
    if !city || city == ""
      @extend_temporary_location_cookie()
      return
    sparrow.cookies.set('consumer_location', city.name, 35000)
    return

  extend_temporary_location_cookie: () ->
    if sparrow.cookies.is_set('consumer_location')
      sparrow.cookies.set('consumer_location', sparrow.cookies.get('consumer_location'), 10000)
    else
      sparrow.cookies.set('consumer_location', @get_region_by_site_id(window.SiteObject.site_id), 5000)
    return

  # Replaces unwanted chars in a 'websafe' string
  # Returns a lowercase string
  replace_chars: (str) ->
    str.toLowerCase().replace /[^a-zA-Z0-9]/g, (s) =>
      return @get('alphabet_replace')[s]

  get_city: (str) ->
    str = @replace_chars(str)
    city = null
    region = _.find  @get('regions'), (r) ->
      city = _.find r.cities, (c) ->
        return _.find c.related_names, (related) ->
          related == str
      if city
        city.region = r.name
        city.site_id = r.site_id
    if city then return city else return false

  get_region_by_site_id: (str) ->
    for region in @get('regions')
      return region.name if region.site_id.toLowerCase() == str.toLowerCase()

  get_fusion_zone: ->
    if sparrow.cookies.is_set('consumer_location')
      city = @get_city(sparrow.cookies.get('consumer_location'))
      return city.region + "." + city.name if city
    fallback_location = @get_region_by_site_id(sparrow.models.site_module.get('site_id'))
    return fallback_location if fallback_location
