// Audio player
//
var mediaTimer = null;
cordova_media = {
  obj: null,
  play: function(src) {
    if (this.obj == null) {
	 // Create Media object from src
	 this.obj = new Media(src, this.success, this.error, this.status);
    } // else play current audio
    // Play audio
    this.obj.play();
    // Update my_media position every second
    if (mediaTimer == null) {
	 mediaTimer = setInterval(function() {

	   this.obj.getCurrentPosition(
			 // success callback
				    function(pos) {
					 console.info('Posição', pos);
					 if (pos > -1) {
					   cordova_media.position(pos);
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
    if (this.obj) {
	 this.obj.pause();
    }
  },
  stop: function() {
    if (this.obj) {
	 this.obj.stop();
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
  status: function(s) {
    console.log('S', s);
  },
  position: function(pos) {
    return pos;
  },
  log_position: function(pos) {
    $('#audio_position').text(this.position(pos));
  }
};