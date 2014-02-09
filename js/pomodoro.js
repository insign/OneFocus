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
        pomodoro.Timer = $.timer(updateTimer, incrementTime, false);

        // Setup form
        $pomo = $('._pomo');
        $pomo.click(function(e) {
            if (!pomodoro.isActive) {
                pomodoro.Timer.play();
            }
            else {
                window.plugins.toast.showShortCenter('You can`t pause! Go work!');
            }
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

        if (currentEvent == 'pomo') {
            pomodoro.Timer.stop();
        }

        var newTime = defaultTime;

        if (rounds < 3 && currentEvent == 'pomo') {
            // short break
            rounds++;

            currentEvent = 'shortbreak';
            newTime = shortBreak;

            // Alertando para uma pausa curta
            of_player.pause();
            navigator.notification.vibrate(700);
            navigator.notification.beep(1);
            setTimeout(function() {
                window.plugins.toast.showLongCenter('Go return calls, take breath or water');
            }, 3000);

            // @todo blink icons
            // @todo copy code to the longbreak
        }
        else if (currentEvent == 'pomo') {
            // Long break
            currentEvent = 'longbreak';
            newTime = longBreak;

            rounds = 0; // Clear rounds

            // Alertando para uma pausa longa
            of_player.pause();
            navigator.notification.vibrate(1000);
            navigator.notification.beep(1);
            setTimeout(function() {
                window.plugins.toast.showLongCenter('Go walk, talk with friend or maybe sleep');
            }, 3000);

        }
        else if (currentEvent == 'longbreak' || currentEvent == 'shortbreak') {
            // Back to pomo
            newTime = defaultTime;
            currentEvent = 'pomo';

            // Alertando para voltar ao trabalho
            navigator.notification.vibrate(1000);
            navigator.notification.beep(1);
            of_player.play();
            setTimeout(function() {
                window.plugins.toast.showLongCenter('Time to work! Respect the pomo!');
            }, 3000);
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