window.sparrow_buildtime='2015-03-17 14:43:55';
(function() {
  var sparrow;

  if (typeof window.console === "undefined") {
    window.console = {
      log: function() {}
    };
  }

  if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true' && window.sparrow_buildtime) {
    console.log("- - - Sparrowjs build: " + window.sparrow_buildtime + " - - -");
  }

  Date.now = Date.now || function() {
    return +(new Date);
  };

  sparrow = {
    timestamp_at_load: Date.now(),
    timestamp_interval: Date.now(),
    module_log: [],
    dependency_log: [],
    initialize: function() {
      this.models || (this.models = {});
      this.views || (this.views = {});
      this.collections || (this.collections = {});
      return this;
    },
    get_latency: function() {
      return Date.now() - this.timestamp_at_load;
    },
    get_latency_interval: function() {
      var latency_interval;
      latency_interval = Date.now() - this.timestamp_interval;
      this.timestamp_interval = Date.now();
      return latency_interval;
    }
  };

  window.sparrow || (window.sparrow = {});

  _.extend(window.sparrow, sparrow);

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  window.sparrow.initialize();

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.BaseCollection = Backbone.Collection.extend({
    initialize: function() {
      sparrow.collections[this.name] = this;
      sparrow.BaseModuleHandler.register_available_dependency(this.name);
      this.bind('add', this.add_to_view);
    },
    add_to_view: function(module) {
      if ((module.get('view') != null) && module.get('rendered') === false) {
        sparrow.views[module.get('view')].add_to_render(module);
      }
    }
  });

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.cookies = {
    get: function(name) {
      var c, ca, i, nameEQ;
      if (!this.is_set(name)) {
        return void 0;
      }
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length).replace(/"/g, '');
        }
        i++;
      }
      return ca;
    },
    set: function(cookieName, cookieValue, exp_minutes) {
      var d, expire;
      if (exp_minutes == null) {
        exp_minutes = 525600;
      }
      d = new Date;
      expire = new Date(d.getTime() + exp_minutes * 60000);
      return document.cookie = cookieName + "=" + escape(cookieValue) + ";path=/;expires=" + expire.toGMTString();
    },
    "delete": function(cookieName) {
      if (!this.is_set(name)) {
        return void 0;
      }
      if (this.is_set(cookieName)) {
        return this.set(cookieName, '', -1);
      }
    },
    is_set: function(name) {
      return document.cookie.indexOf(name) >= 0;
    }
  };

}).call(this);

(function() {
  window.SiteObject || (window.SiteObject = {
    ga_id: "UA-41255195-1",
    mixpanel_token: "1234ABCDE",
    domain: "mittmedia.se",
    site_name: "Mittmedia Sparrow - Default"
  });

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.EventHandler = {
    current_event_id: 0,
    all_events: [],
    screen_events: [],
    resize_events: [],
    locked: false,
    initialize: function() {
      var _this = this;
      window.onscroll = function() {
        _this.check_screen_events();
      };
      window.onresize = function() {
        _this.check_resize_events();
        _this.check_screen_events();
      };
    },
    bind_event: function(event_object) {
      if (typeof sparrow.models[event_object.module_name][event_object.callback] !== 'function') {
        return;
      }
      event_object.run_once || (event_object.run_once = false);
      event_object.dom_element || (event_object.dom_element = void 0);
      event_object.name || (event_object.name = "");
      event_object.id = this.current_event_id += 1;
      if (sparrow.models[event_object.module_name].get("element_selector") !== false) {
        event_object.dom_element = jQuery(sparrow.models[event_object.module_name].get("element_selector"));
      }
      this.update_event_arrays(event_object);
      return this.current_event_id;
    },
    update_event_arrays: function(event_object) {
      this.all_events.push(event_object);
      this.screen_events = _.filter(this.all_events, function(e) {
        return e.type === "in_screen";
      });
      this.resize_events = _.filter(this.all_events, function(e) {
        return e.type === "window_resize";
      });
      this.check_screen_events();
    },
    check_screen_events: function() {
      var screen_event, _i, _len, _ref;
      if (this.locked === true || this.screen_events.length <= 0) {
        return;
      }
      this.locked = true;
      _ref = this.screen_events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        screen_event = _ref[_i];
        this.check_screen_event(screen_event);
      }
      this.locked = false;
    },
    check_screen_event: function(e) {
      if (jQuery(e.dom_element).length !== 0 && this.check_element_position(e)) {
        this.run_event(e, e.dom_element);
      }
    },
    check_resize_events: function() {
      var resize_event, _i, _len, _ref;
      if (this.resize_events.length <= 0) {
        return;
      }
      _ref = this.resize_events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resize_event = _ref[_i];
        this.check_resize_event(resize_event);
      }
    },
    check_resize_event: function(e) {
      this.run_event(e);
    },
    check_element_position: function(event_obj) {
      var doc_view_bottom, doc_view_top, element, element_bottom, element_y;
      element = jQuery(event_obj.dom_element.selector);
      doc_view_top = jQuery(window).scrollTop();
      doc_view_bottom = doc_view_top + jQuery(window).height();
      if (jQuery(element) && jQuery(element).offset()) {
        element_y = jQuery(element).offset().top;
      }
      element_y || (element_y = 0);
      if (element_y <= 1) {
        return false;
      }
      element_bottom = element_y;
      event_obj.margin || (event_obj.margin = 200);
      return element_bottom <= (doc_view_bottom + event_obj.margin);
    },
    trigger_event: function(event_id, relay_object) {
      var active_event;
      if (relay_object == null) {
        relay_object = void 0;
      }
      active_event = _.filter(this.all_events, function(e) {
        return e.id === event_id;
      })[0];
      this.run_event(active_event, relay_object);
    },
    trigger_event_by_name: function(event_name, relay_object) {
      var active_event;
      if (relay_object == null) {
        relay_object = void 0;
      }
      active_event = _.filter(this.all_events, function(e) {
        return e.name === event_name;
      })[0];
      this.run_event(active_event, relay_object);
    },
    run_event: function(active_event, relay_object) {
      if (relay_object == null) {
        relay_object = void 0;
      }
      if (active_event == null) {
        return;
      }
      if (active_event.run_once === true) {
        this.remove_event(active_event.id);
      }
      if (relay_object !== void 0 && active_event.return_element === true) {
        sparrow.models[active_event.module_name][active_event.callback](relay_object);
      } else {

      }
      sparrow.models[active_event.module_name][active_event.callback]();
    },
    remove_event: function(event_id) {
      this.all_events = _.filter(this.all_events, function(e) {
        return e.id !== event_id;
      });
      this.screen_events = _.filter(this.all_events, function(e) {
        return e.type === "in_screen" || e.type === "window_resize";
      });
    }
  };

  sparrow.EventHandler.initialize();

}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.BaseModule = Backbone.Model.extend({
    defaults: {
      name: "base_module",
      load_latency_ms: 0,
      latency_interval_ms: 0,
      base_dependencies: ["base_module_handler"],
      dependencies: [],
      loaded: false,
      rendered: false,
      html_content: false,
      element_selector: false,
      external_script_url: false,
      persistent: false,
      events: []
    },
    initialize: function() {
      this.bind('load', function() {
        var _this = this;
        if (this.get('events').length > 0) {
          this.prepare_events();
        }
        if (this.on_load) {
          this.on_load();
        }
        this.after_filter();
        this.on('change:html_content', function() {
          if (_this.get('view') != null) {
            sparrow.views[_this.get('view')].add_to_render(_this);
          }
        });
      });
      this.before_filter();
    },
    prepare_events: function() {
      var e, event_attributes, registered_events, _i, _len, _ref;
      registered_events = [];
      _ref = this.get('events');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        event_attributes = {};
        e.type || (e.type = "manual");
        e.return_element || (e.return_element = false);
        if (e.run_once !== false) {
          e.run_once = true;
        }
        if (e.type === "in_screen") {
          e.margin || (e.margin = 0);
          event_attributes.dom_element = sparrow.views[this.get('view')].element;
        }
        event_attributes.module_name = this.get("name");
        e.id = sparrow.EventHandler.bind_event(_({}).extend(e, event_attributes));
        e.registred = true;
        registered_events.push(e);
      }
      this.set('events', registered_events);
    },
    load: function() {
      if (this.get('loaded') && this.get("external_script_url") === false) {
        throw "Already loaded " + (this.get('name')) + "!";
      }
      this.set('loaded', true);
      this.trigger('load');
    },
    before_filter: function() {
      this.set(this.local_attributes);
      this.add_local_dependencies();
      sparrow.BaseModuleHandler.add_model_to_queue(this);
    },
    add_local_dependencies: function() {
      var view_and_collection;
      this.set('dependencies', _.uniq(this.get('dependencies').concat(this.get('base_dependencies'))));
      view_and_collection = _.compact([this.get('view'), this.get('collection')]);
      this.set('dependencies', _.uniq(this.get('dependencies').concat(view_and_collection)));
      if (this.get('html_content') !== false) {
        this.set('dependencies', _.uniq(this.get('dependencies').concat(['jQuery'])));
      }
    },
    after_filter: function() {
      if (this.get('collection') != null) {
        sparrow.collections[this.get('collection')].model = sparrow.BaseModule;
        sparrow.collections[this.get('collection')].add(this);
      }
      this.set("load_latency_ms", sparrow.get_latency());
      this.set("latency_interval_ms", sparrow.get_latency_interval());
      this.log_dependeny();
      sparrow.BaseModuleHandler.register_available_dependency(this.get('name'));
    },
    log_dependeny: function() {
      var log_message;
      if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true') {
        log_message = "> [" + (this.get('load_latency_ms')) + "ms] (process time: " + (this.get('latency_interval_ms')) + "ms)   [" + (this.get('name')) + "]  ---  Dependencies: " + (this.get('dependencies'));
        sparrow.module_log.push(log_message);
        console.log(log_message);
      }
    }
  });

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.sparrow || (window.sparrow = {});

  sparrow.loaded_modules = new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.model = sparrow.BaseModule;

    _Class.prototype.initialize = function() {};

    return _Class;

  })(Backbone.Collection));

  sparrow.queued_modules = new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref1 = _Class.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    _Class.prototype.model = sparrow.BaseModule;

    _Class.prototype.loaded_dependencies = [];

    _Class.prototype.triggered_events = [];

    _Class.prototype.initialize = function() {
      this.bind('add', this.check_queue);
    };

    _Class.prototype.check_queue = function(e) {
      var i, model, models, _i, _len;
      if (e == null) {
        e = null;
      }
      models = _.clone(this.models);
      for (i = _i = 0, _len = models.length; _i < _len; i = ++_i) {
        model = models[i];
        this.load_model_if_ready(model);
      }
    };

    _Class.prototype.load_model_if_ready = function(model) {
      var _this = this;
      if (_.every(model.get('dependencies'), function(d) {
        return _.indexOf(sparrow.BaseModuleHandler.loaded_dependencies, d) !== -1;
      }) && _.every(model.get('wait_for_events'), function(e) {
        return _.indexOf(sparrow.BaseModuleHandler.triggered_events, e) !== -1;
      })) {
        this.remove(model);
        sparrow.BaseModuleHandler.load_model(model);
      }
    };

    return _Class;

  })(Backbone.Collection));

}).call(this);

(function() {
  var BaseModuleHandlerObject;

  BaseModuleHandlerObject = {
    name: "base_module_handler",
    loaded_dependencies: [],
    triggered_events: [],
    initialize: function() {
      this.on('registered_dependency', function() {
        return sparrow.queued_modules.check_queue();
      });
      this.on('triggered_event', function() {
        return sparrow.queued_modules.check_queue();
      });
      this.register_available_dependency(this.name);
    },
    add_model_to_queue: function(model) {
      sparrow.queued_modules.add(model);
    },
    load_model: function(model) {
      if (model.get("loaded") === true) {
        sparrow.queued_modules.remove(model);
        return;
      }
      sparrow.loaded_modules.add(model);
      sparrow.models[model.get("name")] = model;
      if (model.get("external_script_url") !== false) {
        setTimeout((function() {
          if (!(model.get("external_script_url") instanceof Function)) {
            if (sparrow.models.error_logger) {
              return sparrow.models.error_logger.check_module(model);
            }
          }
        }), 20000);
        sparrow.loadScript(model.get("external_script_url"), model.get("name"));
      } else {
        model.load();
      }
    },
    trigger_event: function(event) {
      if (_.indexOf(this.triggered_events, event) !== -1) {
        return;
      }
      this.triggered_events.push(event);
      if (sparrow.queued_modules != null) {
        return this.trigger('triggered_event');
      }
    },
    register_available_dependency: function(dependency) {
      if (_.indexOf(this.loaded_dependencies, dependency) !== -1) {
        return;
      }
      this.loaded_dependencies.push(dependency);
      if (sparrow.queued_modules != null) {
        this.trigger('registered_dependency');
      }
      return this.log_dependency(dependency);
    },
    log_dependency: function(dependency) {
      var log_message;
      if (window.SiteObject && window.SiteObject['debug'] && window.SiteObject['debug'] === 'true') {
        log_message = "- [" + (sparrow.get_latency()) + "ms] - (interval: " + (sparrow.get_latency_interval()) + "ms) Dependency '" + dependency + "' met.";
        sparrow.dependency_log.push(log_message);
        console.log(log_message);
      }
    }
  };

  window.sparrow || (window.sparrow = {});

  sparrow.BaseModuleHandler || (sparrow.BaseModuleHandler = {});

  _.extend(sparrow.BaseModuleHandler, Backbone.Events);

  _.extend(sparrow.BaseModuleHandler, BaseModuleHandlerObject);

  sparrow.BaseModuleHandler.initialize();

  jQuery(function() {
    sparrow.BaseModuleHandler.register_available_dependency("jQuery");
  });

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.sparrow || (window.sparrow = {});

  sparrow.BaseView = (function(_super) {
    __extends(BaseView, _super);

    function BaseView() {
      _ref = BaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseView.prototype.name = 'base_view';

    BaseView.prototype.el = document.createElement("div");

    BaseView.prototype.render_queue = [];

    BaseView.prototype.initialize = function() {
      this.set_target_element(this.element);
      if (this.collection != null) {
        this.collection = sparrow.collections[this.collection];
      }
      sparrow.views[this.name] = this;
      sparrow.BaseModuleHandler.register_available_dependency(this.name);
    };

    BaseView.prototype.add_to_render = function(module) {
      if (_.indexOf(this.render_queue, module) === -1) {
        this.render_queue.push(module);
      }
      this.render();
    };

    BaseView.prototype.render = function() {
      var module, _i, _len, _ref1;
      this.render_queue = _.filter(this.render_queue, function(m) {
        return m.get('rendered') === false;
      });
      _ref1 = this.render_queue;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        module = _ref1[_i];
        this.set_target_element(this.element, module.get('element_selector'));
        if (module.get('html_content') !== false) {
          jQuery(this.el).html(module.get('html_content'));
        }
        module.set('rendered', true);
      }
      return this;
    };

    BaseView.prototype.set_target_element = function(selector, module_element_selector) {
      if (module_element_selector) {
        selector += module_element_selector;
      }
      this.el = jQuery(selector);
    };

    return BaseView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "env_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "fusion_ads_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "header_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.name = "test_collection";

    return _Class;

  })(sparrow.BaseCollection));

}).call(this);

(function() {


}).call(this);

(function() {
  window.sparrow || (window.sparrow = {});

  sparrow.loadScript = function(url, module_name, async) {
    var done, head, script;
    if (async == null) {
      async = false;
    }
    if (document.getElementById(module_name)) {
      return;
    }
    if (url instanceof Function) {
      url = url();
    }
    if (!url) {
      return;
    }
    head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.id = module_name;
    done = false;
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        if (sparrow.models[module_name].get && sparrow.models[module_name].get("loaded") !== true) {
          sparrow.models[module_name].load();
        }
        script.onload = script.onreadystatechange = null;
        if (sparrow.models[module_name].get) {
          if (head && script.parentNode && sparrow.models[module_name].get('persistent') === false) {
            return head.removeChild(script);
          }
        }
      }
    };
    return head.insertBefore(script, head.firstChild);
  };

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: 'error_logger',
      env: 'development',
      errors: []
    };

    _Class.prototype.on_load = function() {
      if (window.SiteObject && window.SiteObject.environment) {
        this.set('env', window.SiteObject.environment);
      }
      if (this.get('env') === 'development') {
        window.onerror = this.dump_environment;
      }
    };

    _Class.prototype.check_module = function(module) {
      var errors;
      if (module.get('loaded') !== true) {
        errors = this.get('errors');
        if (module.get("external_script_url") !== false) {
          errors.push({
            name: module.get('name'),
            message: "Problem loading " + (module.get('external_script_url'))
          });
        }
        this.set('errors', errors);
        sparrow.EventHandler.trigger_event_by_name('error');
      }
    };

    _Class.prototype.dump_environment = function(msg, url, line) {
      var log;
      log = function(label, logger) {
        var error;
        try {
          return console.log(label, logger());
        } catch (_error) {
          error = _error;
          return console.log("Failed to log:", label, logger);
        }
      };
      console.log("An error has occured!");
      console.log("Message:", msg, "URL:", url, "Line:", line);
      console.log("");
      console.log("Environment:");
      log("Loaded dependencies:", function() {
        return sparrow.BaseModuleHandler.loaded_dependencies;
      });
      log("Modules:", function() {
        return sparrow.models;
      });
      log("Collections:", function() {
        return sparrow.collections;
      });
      log("Views:", function() {
        return sparrow.views;
      });
      log("Queued modules:", function() {
        return sparrow.queued_modules.models;
      });
      log("Loaded modules:", function() {
        return sparrow.loaded_modules.models;
      });
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.image_holder';

    _Class.prototype.name = 'image_view';

    _Class.prototype.collection = 'test_collection';

    return _Class;

  })(sparrow.BaseView));

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref1 = _Class.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    _Class.prototype.local_attributes = {
      name: "image_module",
      view: 'image_view',
      collection: 'test_collection',
      html_content: "",
      dependencies: [],
      element_selector: "img",
      no_of_manual_events_fired: 0,
      events: [
        {
          type: "in_screen",
          callback: "load_high_res",
          run_once: true
        }
      ]
    };

    _Class.prototype.on_load = function() {};

    _Class.prototype.load_high_res = function() {
      jQuery('.image_holder').append("<img src='" + (jQuery('.image_holder').attr('data-high-res-url')) + "' />");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      this.check_for_height_change = __bind(this.check_for_height_change, this);
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: 'responsive_iframe',
      dependencies: ['jQuery'],
      events: [
        {
          type: "manual",
          callback: "init_as_child",
          run_once: true,
          name: "run_in_iframe"
        }
      ]
    };

    _Class.prototype.on_load = function() {
      this.iframes = jQuery('iframe[data-responsive-iframe]');
      return this.init_as_parent();
    };

    _Class.prototype.init_as_parent = function() {
      return this.add_event_listener();
    };

    _Class.prototype.add_event_listener = function() {
      if (window.addEventListener) {
        return window.addEventListener("message", this.message_handler.bind(this), false);
      } else {
        return window.attachEvent("onmessage", this.message_handler.bind(this));
      }
    };

    _Class.prototype.message_handler = function(event) {
      if (this.is_family_iframe(event)) {
        return this.handle_family_iframe_event(event);
      } else if (this.is_familybooking_iframe(event)) {
        return this.handle_familybooking_iframe_event(event);
      } else {
        return this.handle_iframe_event(event);
      }
    };

    _Class.prototype.event_is_valid = function(event) {
      var data, e;
      if (!event.data) {
        return false;
      }
      try {
        data = JSON.parse(event.data);
      } catch (_error) {
        e = _error;
        return false;
      }
      if (!data.source) {
        return false;
      }
      if (jQuery("[src^='" + data.source + "']").size() === 0) {
        return false;
      }
      if (!data.height || typeof data.height !== 'number') {
        return false;
      } else {
        return true;
      }
    };

    _Class.prototype.handle_iframe_event = function(event) {
      var data, iframe;
      if (!this.event_is_valid(event)) {
        return;
      }
      data = JSON.parse(event.data);
      iframe = jQuery("[src^='" + data.source + "']");
      if (iframe.height() !== data.height) {
        return iframe.height(data.height);
      }
    };

    _Class.prototype.is_familybooking_iframe = function(event) {
      if (event.data && (typeof event.data) === "string") {
        if (event.data.substring(0, 22) === "FAMILJEBOKNING_HEIGHT:" || event.data.substring(0, 21) === "FAMILJEBOKNING_TO_TOP") {
          return true;
        }
      } else {
        return false;
      }
    };

    _Class.prototype.is_family_iframe = function(event) {
      if (event.data && (typeof event.data) === "string") {
        if (event.data.substring(0, 14) === "FAMILJ_HEIGHT:" || event.data.substring(0, 14) === "FAMILJ_TO_TOP") {
          return true;
        }
      } else {
        return false;
      }
    };

    _Class.prototype.handle_family_iframe_event = function(event) {
      var height;
      if (event.data.substring(0, 14) === "FAMILJ_HEIGHT:") {
        height = parseInt(event.data.substring(14));
        if (height) {
          jQuery('.iframe_family').height(height);
        }
      }
      if (event.data.substring(0, 14) === "FAMILJ_TO_TOP") {
        return jQuery('.iframe_family')[0].scrollIntoView();
      }
    };

    _Class.prototype.handle_familybooking_iframe_event = function(event) {
      var height;
      if (event.data.substring(0, 22) === "FAMILJEBOKNING_HEIGHT:") {
        height = parseInt(event.data.substring(22));
        if (height) {
          jQuery('.iframebooking_family').height(height);
        }
      }
      if (event.data.substring(0, 21) === "FAMILJEBOKNING_TO_TOP") {
        return jQuery('.iframebooking_family')[0].scrollIntoView();
      }
    };

    _Class.prototype.init_as_child = function() {
      this.current_height = 0;
      this.current_url = location.protocol + '//' + location.host + location.pathname + location.search;
      window.requestAnimFrame(this.check_for_height_change);
    };

    _Class.prototype.check_for_height_change = function() {
      var _this = this;
      if (this.height_has_changed()) {
        this.update_current_height();
        this.notify_change();
      }
      return setTimeout((function() {
        return window.requestAnimFrame(_this.check_for_height_change);
      }), 500);
    };

    _Class.prototype.height_has_changed = function() {
      return this.current_height !== jQuery('body').height();
    };

    _Class.prototype.update_current_height = function() {
      return this.current_height = jQuery('body').height();
    };

    _Class.prototype.notify_change = function() {
      var payload;
      payload = {
        source: this.current_url,
        height: Math.round(this.current_height)
      };
      return window.parent.postMessage(JSON.stringify(payload), "*");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "site_module",
      collection: 'env_collection',
      dependencies: [],
      view_ads: false,
      debug: false,
      events: [
        {
          type: "manual",
          callback: "set_attributes_from_site_object",
          run_once: false,
          name: "update_site_module"
        }, {
          type: "window_resize",
          callback: "device_changed",
          run_once: false
        }
      ],
      current_device: void 0
    };

    _Class.prototype.on_load = function() {
      this.set('current_device', this.get_device());
      this.set_attributes_from_site_object();
      this.register_active_section();
    };

    _Class.prototype.before_filter = function() {
      if (!window.SiteObject) {
        this.local_attributes.dependencies.push('site_object');
      }
      return _Class.__super__.before_filter.apply(this, arguments);
    };

    _Class.prototype.register_active_section = function() {
      if (this.get('section') !== null) {
        window.sparrow.BaseModuleHandler.trigger_event('section_loaded');
      }
    };

    _Class.prototype.set_attributes_from_site_object = function() {
      var attribute_name, _i, _len, _ref1;
      _ref1 = _.keys(window.SiteObject);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attribute_name = _ref1[_i];
        this.set(attribute_name, window.SiteObject[attribute_name]);
      }
    };

    _Class.prototype.get_device = function() {
      var device;
      device = 'desktop';
      if (window.innerWidth <= 1024) {
        device = 'tablet';
      }
      if (window.innerWidth < 768) {
        device = 'mobile';
      }
      return device;
    };

    _Class.prototype.device_changed = function() {
      if (this.get('current_device') === this.get_device()) {
        return;
      }
      this.set('current_device', this.get_device());
      return sparrow.EventHandler.trigger_event_by_name("change_fusion_layout");
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {


}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = 'body.articles.show .article';

    _Class.prototype.name = 'article';

    _Class.prototype.collection = 'env_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.ad_container';

    _Class.prototype.name = 'fusion_ads_view';

    _Class.prototype.collection = 'fusion_ads_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = 'head';

    _Class.prototype.name = 'header_view';

    _Class.prototype.collection = 'header_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.element = '.layout_wrapper';

    _Class.prototype.name = 'test_view';

    _Class.prototype.collection = 'env_collection';

    return _Class;

  })(sparrow.BaseView));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "google_analytics",
      view: 'header_view',
      collection: 'header_collection',
      dependencies: ["site_module"],
      external_script_url: "http://www.google-analytics.com/ga.js"
    };

    _Class.prototype.on_load = function() {
      if (window.sparrow.models.site_module.get("ga_id") != null) {
        (function(i, s, o, g, r, a, m) {
          i["GoogleAnalyticsObject"] = r;
          i[r] = i[r] || function() {
            return (i[r].q = i[r].q || []).push(arguments);
          };
          i[r].l = 1 * new Date();
          a = s.createElement(o);
          m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          return m.parentNode.insertBefore(a, m);
        })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
        ga('create', window.sparrow.models.site_module.get("ga_id"), 'auto');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');
      }
    };

    _Class.prototype.trigger_event = function(category, action, label, value) {
      if (label == null) {
        label = null;
      }
      if (value == null) {
        value = null;
      }
      return ga('send', 'event', category, action, label, value);
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "mixpanel",
      dependencies: ["site_module", "never_load"]
    };

    _Class.prototype.on_load = function() {
      if (window.sparrow.models.site_module.get("mixpanel_token") == null) {
        return;
      }
      (function(c, a) {
        var b, d, e, h;
        window.mixpanel = a;
        b = void 0;
        d = void 0;
        h = void 0;
        e = void 0;
        b = c.createElement("script");
        b.type = "text/javascript";
        b.async = !0;
        b.src = ("https:" === c.location.protocol ? "https:" : "http:") + "//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";
        d = c.getElementsByTagName("script")[0];
        d.parentNode.insertBefore(b, d);
        a._i = [];
        a.init = function(b, c, f) {
          var g;
          d = function(a, b) {
            c = b.split(".");
            2 === c.length && (a = a[c[0]], b = c[1]);
            return a[b] = function() {
              return a.push([b].concat(Array.prototype.slice.call(arguments_, 0)));
            };
          };
          g = a;
          if ("undefined" !== typeof f) {
            g = a[f] = [];
          } else {
            f = "mixpanel";
          }
          g.people = g.people || [];
          h = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "alias", "name_tag", "set_config", "people.set", "people.set_once", "people.increment", "people.track_charge", "people.append"];
          e = 0;
          while (e < h.length) {
            d(g, h[e]);
            e++;
          }
          return a._i.push([b, c, f]);
        };
        return a.__SV = 1.2;
      })(document, window.mixpanel || []);
      return mixpanel.init(window.sparrow.models.site_module.get("mixpanel_token"));
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  new ((function(_super) {
    __extends(_Class, _super);

    function _Class() {
      _ref = _Class.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    _Class.prototype.local_attributes = {
      name: "foundation_loader",
      dependencies: ["jQuery"]
    };

    _Class.prototype.on_load = function() {
      if (typeof jQuery(document).foundation === 'function') {
        jQuery(document).foundation(function(response) {
          return sparrow.BaseModuleHandler.register_available_dependency("foundation");
        });
      }
    };

    return _Class;

  })(sparrow.BaseModule));

}).call(this);
