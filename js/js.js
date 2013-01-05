// @TODO Cordava ondeviceready & cordova_in_use

jQuery(document).ready(function($) {
  _ = {
    body: $('body'),
    wind: $(window)
  };

  of_playlist.request();

  of_events.resize();
  _.wind.on('resize', of_events.resize);

});

of_events = {
  resize: function() {
    _.body.css({
	 height: _.body.height()
    });
  }
};



of_ajax = {
  get: function(json, query_string) {
    var _default_data = {api_version: 1, test: 'a'};
    var _default = {
	 // @TODO Send cordava data
	 url: 'test.json',
	 cache: false,
	 data: $.extend(_default_data, query_string),
	 success: function(data) {
	   this.success(data);
	 }.bind(this)
    };

    var settings = $.extend(_default, json);


    $.ajax(settings);
  },
  success: function(data) {
    $.each(data, function(i, j) {
	 switch (i) {
	   case 'playlist':
		of_playlist.register(j);
		break;
	 }
    });
  }
};
