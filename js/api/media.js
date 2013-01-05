// Audio player
//
var cordova_media_obj = null;
var mediaTimer = null;

// Play audio
//
function cordova_play_audio(src) {
  if (cordova_media_obj == null) {
    // Create Media object from src
    cordova_media_obj = new Media(src, onSuccess, onError);
  } // else play current audio
  // Play audio
  cordova_media_obj.play();

  // Update my_media position every second
  if (mediaTimer == null) {
    mediaTimer = setInterval(function() {
	 // get my_media position
	 cordova_media_obj.getCurrentPosition(
		    // success callback
				  function(position) {
				    console.info('Posição', position);
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
function cordova_pause_audio() {
  if (cordova_media_obj) {
    cordova_media_obj.pause();
  }
}

// Stop audio
//
function stopAudio() {
  if (cordova_media_obj) {
    cordova_media_obj.stop();
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