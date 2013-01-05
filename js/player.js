
of_player = {
  play_pause: function(json) {
    $('.about .name').html(json.name);
    $('.about .author').html(json.author);

    cordova_media.play(json.url);
  },
  next: function() {
  }
};

of_playlist = {
  list: {},
  use_one: function() { // Play a random song of the list or request a new list
    if (this.list.length > 0) {
	 var random_item = Math.floor(Math.random() * this.list.length);

	 // Select a random item
	 of_player.play_pause(this.list[random_item]);

	 // Remove the song used to play
	 this.list.splice($.inArray(random_item, this.list), 1);
    }
    else {
	 this.request();
    }
  },
  register: function(json) { // Register the new list then play a new one
    this.list = json;
    this.use_one();
  },
  request: function() {
    // @TODO show "loading" and hide it when ready
    of_ajax.get(null, {send_playlist: 1});
  }
};