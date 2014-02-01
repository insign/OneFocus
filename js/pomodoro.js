var pomodoro = new (function() {

    var $countdown;
    var $pomo;
    var incrementTime = 70;

    var shortBreak = 5000;// 300000 milliseconds == 5 minutes
    var longBreak = 10000; // 1200000 milliseconds == 20 minutes

    var defaultTime = 3000; // 1500000 milliseconds == 25 minutes
    var currentTime = defaultTime;
    var rounds = 0;

    var currentEvent = 'pomo';


    $(function() {

        // Setup the timer
        $countdown = $('._pomo');
        pomodoro.Timer = $.timer(updateTimer, incrementTime, true);

        // Setup form
        $pomo = $('._pomo');
        $pomo.click(function(e) {
            pomodoro.Timer.toggle();
            e.preventDefault();
        });

    });

    function updateTimer() {

        // Output timer position
        var timeString = formatTime(currentTime, 2);
        $countdown.html(timeString);

        // If timer is complete, trigger event
        if (currentTime == 0) {
            pomodoro.completed();
        } else {
            // Increment timer position
            currentTime -= incrementTime;
            if (currentTime < 0)
                currentTime = 0;
        }
    }

    this.completed = function() {
        console.info('evento completado', currentEvent);

        if (currentEvent == 'pomo')
            pomodoro.Timer.stop();

        var newTime = defaultTime;

        if (rounds < 4 && currentEvent == 'pomo') {
            // short break
            rounds++;

            currentEvent = 'shortbreak';
            newTime = shortBreak;
        }
        else if (currentEvent == 'pomo') {
            // Long break
            currentEvent = 'longbreak';
            newTime = longBreak;

            rounds = 0; // Clear rounds
        }
        else if (currentEvent == 'longbreak' || currentEvent == 'shortbreak') {
            // Back to pomo
            newTime = defaultTime;
            currentEvent = 'pomo';
        }

        console.info('entrando em', currentEvent);
        console.warn('rounds', rounds);

        pomodoro.resetCountdown(newTime);
        return;
    }

    this.resetCountdown = function(time, start) {
        currentTime = time ? time : defaultTime;

        // Stop and reset timer
        pomodoro.Timer.stop().once();

        if (start) {
            pomodoro.Timer.start();
        }

    };

});

// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
function formatTime(time, parts) {
    if (!parts)
        parts = 3;
    time = time / 10;
    var min = parseInt(time / 6000),
            sec = parseInt(time / 100) - (min * 60),
            hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + (parts > 1 ? ":" + pad(sec, 2) : '') + (parts > 2 ? ":" + hundredths : '');
}