
of_player = {
  play: function(json) {
    console.info('Pre-tocando');
    cordova_media.stop();

    console.info('Passou pelo stop');

    $('.about .name').html(json.name);
    $('.about .author').html(json.author);
    console.info('Passou pelo sobre');

    cordova_media.play(json.url);
    console.info('Passou pelo play');

  },
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
	 console.info('Existe pilhas na playlist', this.list);
	 var random_item = Math.floor(Math.random() * this.list.length);

	 // Select a random item
	 of_player.play(this.list[random_item]);
	 console.info('Pos-tocando');

	 // Remove the song used to play
	 this.list.splice($.inArray(random_item, this.list), 1);
	 console.info('Removido da playlist', this.list);
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