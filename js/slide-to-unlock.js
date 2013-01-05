var happy_end = false, $stn, $well, $slider, $label, touch_way = false, inicial_slider_os;

function stu_vars() {
  $stn = $('#stn');
  $well = $('#stn .well');
  $slider = $('#stn .slider');
  $label = $('#stn .well .label');
}

function slide_to_unlock_reach_limit() {
  stu_vars();

  return $label.offset().left + ($label.width() / 3);
}

jQuery(document).ready(function($) {
  stu_vars();

  inicial_slider_os = $slider.offset();

  $(window).on('resize', function() {
    inicial_slider_os = $slider.offset();
  });

  $slider.drags();
});

$.fn.drags = function(opt) {

  stu_vars();

  $slider.animate({left: 0}, function() {
    if (!touch_way) {
	 happy_end = false;
    }
  });

  $well.fadeIn();

  opt = $.extend({handle: "", cursor: "move"}, opt);

  if (opt.handle === "") {
    var $el = this;
  } else {
    var $el = this.find(opt.handle);
  }

  stu_touch_way();

  return $el.css('cursor', opt.cursor)
		.on("mousedown", function(e) {
    if (opt.handle === "") {
	 var $drag = $(this).addClass('draggable');
    } else {
	 var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
    }
    var z_idx = $drag.css('z-index'),
		  drg_h = $drag.outerHeight(),
		  drg_w = $drag.outerWidth(),
		  pos_y = $drag.offset().top + drg_h - e.pageY,
		  pos_x = $drag.offset().left + drg_w - e.pageX;
    $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
	 var var_x = e.pageX + pos_x - drg_w
	 $drag.offset({
	   top: inicial_slider_os.top,
	   left: var_x
	 })
		    .on("mouseup", function(e) {
	   $(this).removeClass('draggable').css('z-index', z_idx);
	 });
	 if ($el.offset().left > slide_to_unlock_reach_limit()) { // Swipe finished! (mouse still holded)
	   swipe_event('reached');
	   $slider.trigger('mouseup')
	 }
    });
    e.preventDefault(); // disable selection
  }).on("mouseup", function() {
    if (opt.handle === "") {
	 $(this).removeClass('draggable');
    } else {
	 $(this).removeClass('active-handle').parent().removeClass('draggable');
    }
    if ($el.offset().left < slide_to_unlock_reach_limit()) { // No reach
	 $el.animate({left: 0})
    }
  });
}

function swipe_event(step) {
  stu_vars();

  if (step == 'reached') {
    if (!happy_end) {
	 happy_end = true;
	 $well.fadeOut(0, function() {
	   swipe_event(2)
	 });
    }
  } else if (step == 2) {
    stored_well = $well.clone();
    $well.remove();
    $stn.prepend(stored_well);
    stu_vars();

    $slider.drags();

    go_happy();
  }
}

function go_happy() {
  console.info("Happy!");
  navigator.notification.vibrate(200);
}

function stu_touch_way() {
  stu_vars();

  $slider[0].addEventListener('touchmove', function(event) {
    touch_way = true;
    event.preventDefault();
    var el = event.target;
    var touch = event.touches[0];
    this.style.webkitTransition = 'none';
    curX = touch.pageX - this.offsetLeft - 30;
    if (curX > slide_to_unlock_reach_limit()) {
	 this.style.webkitTransform = 'translateX(0px)';
	 swipe_event('reached');
    } else if (curX > 0) {
	 el.style.webkitTransform = 'translateX(' + curX + 'px)';
    } else {
	 return;
    }
  }, false);

  $slider[0].addEventListener('touchend', function(event) {
    this.style.webkitTransition = '-webkit-transform 0.5s ease-in';
    this.addEventListener('webkitTransitionEnd', function(event) {
	 this.style.webkitTransition = 'none';
    }, false);
    this.style.webkitTransform = 'translateX(0px)';
    happy_end = false;
  }, false);
}