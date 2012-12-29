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
	 height: _.wind.height()
    });
  }
};

// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
  playAudio("http://sensy.me/cdn/onefocus/deadmau5_strobe_192bit.mp3");
}

// Audio player
//
var my_media = null;
var mediaTimer = null;

// Play audio
//
function playAudio(src) {
  if (my_media == null) {
    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);
  } // else play current audio
  // Play audio
  my_media.play();

  // Update my_media position every second
  if (mediaTimer == null) {
    mediaTimer = setInterval(function() {
	 // get my_media position
	 my_media.getCurrentPosition(
		    // success callback
				  function(position) {
				    if (position > -1) {
					 setAudioPosition((position) + " sec");
				    }
				  },
				  // error callback
						function(e) {
						  console.log("Error getting pos=" + e);
						  setAudioPosition("Error: " + e);
						}
				  );
				}, 1000);
		}
}

// Pause audio
//
function pauseAudio() {
  if (my_media) {
    my_media.pause();
  }
}

// Stop audio
//
function stopAudio() {
  if (my_media) {
    my_media.stop();
  }
  clearInterval(mediaTimer);
  mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
  console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
  alert('code: ' + error.code + '\n' +
		'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
  document.getElementById('audio_position').innerHTML = position;
}