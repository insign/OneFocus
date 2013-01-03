// @TODO Cordava ondeviceready & cordova_in_use

jQuery(document).ready(function($) {
  _ = {
    body: $('body'),
    wind: $(window)
  };
  _e.resize();

  _.wind.on('resize', _e.resize);

});

_e = {
  resize: function() {
    _.body.css({
	 height: _.body.height()
    });
  }
};