@SmartClip =
  total_letters: 1500
  parent_id: 'smartclip_container'
  ad_ids:
    ALLEHANDA: 'b5b8b6ae'
    LTZ: 'a0c95e11'
    AB: 'd6cba0f4'
    ST: 'c4c6dd77'
    HH: 'a8c6290e'
    DT: 'd2ae98b3'
    DD: 'd8138565'
    GD: 'bc452369'
    OP: 'ec585994'

  init: ->
    if document.getElementsByTagName("article").length > 0
      article     = document.getElementsByTagName("article")[0]
      sections    = article.getElementsByTagName("section")
      section     = if @hasClass(sections[sections.length - 2], "body") then sections[sections.length - 2] else sections[sections.length - 1]
      paragraphs   = section.getElementsByTagName("p")
      if @countLetterInParagraphs(paragraphs) >= this.total_letters and paragraphs.length > 3
        paragraph = if @hasClass(paragraphs[3], "subheadline") then paragraphs[4] else paragraphs[3]
        @insertSmartClipContainer(section, paragraph)
        @insertScript(section, paragraph)

  insertSmartClipContainer: (container, divider)->
    div_smart_cointainer           = document.createElement("div")
    div_smart_cointainer.id        = this.parent_id
    div_ads_containter             = document.createElement("div")
    div_smart_cointainer.setAttribute("class", "ad-placement smartclip")
    div_ads_containter.appendChild div_smart_cointainer
    div_ads_containter.setAttribute("class", "show-for-large-up padding-bottom-medium ad-wrapper")
    container.insertBefore div_ads_containter, divider.nextSibling

  hasClass: (element, cls) ->
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1

  countLetterInParagraphs: (p) ->
    e = p.length
    i = 0
    c = 0
    while i < e
      break if c is this.total_letters
      if p[i].innerHTML isnt "" or p[i].innerHTML isnt " " or p[i].innerHTML isnt "&nbsp;"
        j = 0
        while j < p[i].innerHTML.length
          break if c is this.total_letters
          l = p[i].innerHTML.toLowerCase()
          c++ unless typeof (l[j]) is "undefined"
          ++j
      ++i
    c

  insertScript: (container, divider) ->
    head          = document.head or document.getElementsByTagName("head")[0] or document.documentElement
    script        = document.createElement("script")
    script.src    = @_loadUrlWithCategory()
    script.async  = true
    script.id     = 'smartclip'
    script.setAttribute("type", "text/javascript")
    container.insertBefore script, divider.nextSibling

  ## private

  # Load the script url with random number for cache
  # Add category to match right ad clip
  _loadUrlWithCategory: ->
    rnd      = Math.round(Math.random()*1000000)
    category = if window.PageObject is not null then window.PageObject.category_list[0].toLowerCase() else 'allmant'
    category = category.replace('å', 'a')
                      .replace('ä', 'a')
                      .replace('ö', 'o')
                      .replace(/\s+/g, '_');
    ad_id    = @_loadAdId()
    url      = "http://des.smartclip.net/ads?t=de&p=9372&pl=#{ad_id}&sz=400x320&cat=#{category}&parent=#{this.parent_id}&rnd=#{rnd}"
    url

  _loadAdId: ->
    ad_id   = null
    site_id = window.SiteObject.site_id
    ad_id   = _.find this.ad_ids, (v, k) ->
      if k == site_id and site_id != "TH"
        ad_id = v
      else if "TH" == site_id
        if k == "LTZ"
          ad_id = v
    ad_id

window.addEventListener("load", () =>
  @SmartClip.init() unless Modernizr.mq("only screen and (max-width: 480px)") and Modernizr.mq("only screen and (max-width: 768px)")
false)
