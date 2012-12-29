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
	   mp3: "audio/ghosts_n_stuff.mp3",
	   oga: "audio/spirit_of_life.ogg"
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