jQuery(document).ready(function($) {
  _ = {
    body: $('body'),
    wind: $(window)
  };
  _e.resize();

  _.wind.on('resize', _e.resize);

//  jPlayer
  $("#player").jPlayer({
    ready: function(e) {
	 $(this).jPlayer("setMedia", {
	   mp3: "audio/strobe.mp3",
	   oga: "audio/strobe.ogg"
	 });
    },
    swfPath: "js/jplayer",
    supplied: "mp3, oga",
    preload: 'auto'
  });

});

_e = {
  resize: function() {
    _.body.css({
	 height: _.wind.height()
    });
  }
};