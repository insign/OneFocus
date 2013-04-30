// Audio player
//
mediaTimer = null;
last_src = null
cordova_media = {
    obj: null,
    status_code: 0,
    play: function(src) {
        if (src && (!this.obj || last_src != src)) { // no object or new song
            try {
                this.obj = new Media(src, this.success, this.error, this.status);
                console.log('Created a new Media object to play', this.obj);
                last_src = src;
            }
            catch (err) {
                console.error('Impossible to create Cordova Media object:', err.message);
            }
        }
        console.log('Trying to play the audio', this.obj.play());

        // Update my_media position every second
        if (mediaTimer == null) {
            mediaTimer = setInterval(function() {
                cordova_media.obj.getCurrentPosition(
                        function(pos) {
                            console.info('Playing', pos);
                            if (pos > -1) {
                                cordova_media.log_position(pos);
                            }
                        },
                        function(e) {
                            console.error("Error getting pos=" + e);
                        }
                );
            }, 1000);
        }
    },
    pause: function() {
        if (this.obj) {
            console.log('Audio paused', this.obj.pause());
        }
        else {
            console.warn('Pause is not possible without audio object');
        }
    },
    stop: function() {
        if (this.obj) {
            console.log('Audio stopped', this.obj.stop());
            console.log('Audio released', this.obj.release());
        }
        clearInterval(mediaTimer);
        mediaTimer = null;
    },
    success: function() {
        console.log("Audio played with success");
    },
    error: function(error) {
        console.error('Trying to play but error', error);
    },
    status: function(s) {
        console.log('Cordova Media Status', s);
        of_player.set_status(s);
    },
    position: function(pos) {
        return pos;
    },
    log_position: function(pos) {
        if (in_dev) {
            $('#audio_position').text(this.position(pos));
        }
    }
};