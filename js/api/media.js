// Audio player
//
var cordova_media_obj = null;
var mediaTimer = null;
cordova_media = {
  play: function(src) {
    if (cordova_media_obj == null) {
// Create Media object from src
	 cordova_media_obj = new Media(src, cordova_media.success, cordova_media.error, cordova_media.status);
    } // else play current audio
// Play audio
    cordova_media_obj.play();
    // Update my_media position every second
    if (mediaTimer == null) {
	 mediaTimer = setInterval(function() {
// get my_media position
	   cordova_media_obj.getCurrentPosition(
			 // success callback
				    function(pos) {
					 console.info('Posição', pos);
					 if (pos > -1) {
					   $('#audio_position').text(this.position(pos + " sec"));
					 }
				    }.bind(this),
				    // error callback
						  function(e) {
						    console.log("Error getting pos=" + e);
						    position("Error: " + e);
						  }
				    );
				  }, 1000);
		  }
  },
  pause: function() {
    if (cordova_media_obj) {
	 cordova_media_obj.pause();
    }
  },
  stop: function() {
    if (cordova_media_obj) {
	 cordova_media_obj.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
  },
  success: function() {
    console.log("Cordova Audio played with success");
  },
  error: function(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  },
  status: function(s, t) {
    console.log('S', s);
    console.log('T', t);
  },
  position: function(position) {
    return position;
  }
};


// Pause audio
//


// Stop audio
//


// onSuccess Callback
//


// onError Callback
//


// Set audio position
//
