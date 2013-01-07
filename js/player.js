
of_player = {
  play: function(json) {
    console.log('Stoping any music..');
    cordova_media.stop();

    this.set_about(json);

    console.info('Sending URL to play now', json.url);
    cordova_media.play(json.url);

  },
  pause: function() {
    cordova_media.pause();
  },
  next: function() {

  },
  set_about: function(json) {
    console.log('Setting the text of author', json);
    $('.about .name').html(json.name);
    $('.about .author').html(json.author);
  },
  set_status: function(s) {
    switch (s) {
	 case 1: // Starting/loading
	   this.set_status_class('waiting');
	   break;
	 case 2:
	   this.set_status_class('playing');
	   break;
	 case 3:
	   this.set_status_class('paused');
	   break;
	 default:
	   this.set_status_class('stopped');
	   console.log('Song stopped, trying to play next song');
	   of_playlist.use_one();

	   break;
    }
  },
  set_status_class: function(s) {
    $('body')
		  .removeClass('waiting playing paused stopped')
		  .addClass(s);
  }

};
of_playlist = {
  list: {},
  use_one: function() { // Play a random song of the list or request a new list
    if (this.list.length > 0) {
	 console.info('use_one() - Exist items at playlist', this.list);
	 var random_item = Math.floor(Math.random() * this.list.length);

	 // Select a random item
	 console.log('Selected random item of playlist to play', this.list[random_item]);
	 of_player.play(this.list[random_item]);

	 // Remove the song used to play
	 console.info('Removing the item used to play', this.list);
	 this.list.splice($.inArray(random_item, this.list), 1);
    }
    else {
	 console.log('No items at playlist, request a new playlist...');
	 this.request();
    }
  },
  register: function(json) { // Register the new list then play a new one
    this.list = json;
    console.log('Playlist registered', json);
    console.log('Will use_one() after playlist registered');
    this.use_one();
  },
  request: function() {
    // @TODO show "loading" and hide it when ready

    var req_data = {send_playlist: 1};
    console.log('Requesting a playlist', req_data);
    of_ajax.get(null, req_data);
  }
};