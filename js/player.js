
of_player = {
  play: function(json) {
    if (json) {
	 this.set_about(json);

	 console.info('Sending URL to play now', json.url);
	 cordova_media.play(json.url);
    } else {
	 cordova_media.play();
    }
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
    if (this.list.length > 1) {
	 console.info('use_one() - Exist items at playlist', this.list);
	 var random_index = Math.floor(Math.random() * this.list.length);
	 var random_item = this.list[random_index];


	 // Remove the song used to play
	 this.list.splice($.inArray(random_index, this.list), 1);
	 console.info('Removed the item used to play', this.list);

	 // Select a random item
	 console.log('Selected random item of playlist to play', random_item);
	 of_player.play(random_item);
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