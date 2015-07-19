/*jslint indent: 4, maxlen: 80, todo: true */
/*globals window, document */

(function (win, doc) {
    'use strict';

    var // Constants
        INTERVAL_BIG = 1000,
        INTERVAL_SMALL = INTERVAL_BIG / 3,
        VISIBLE_CLASS = 'visible',

        // Imports
        circles = win.Circles,
        utils = win.utils,

        // Variables
        allCircles,
        workEl = doc.getElementsByClassName('working-message')[0],
        pauseEl = doc.getElementsByClassName('pause-message')[0],

        // Functions
        onResize,
        updateTime;

    onResize = function () {
        Object.keys(allCircles).forEach(function (key) {
            var newWidth = allCircles[key].element.offsetWidth;

            allCircles[key].circle.updateRadius(newWidth / 2);
            allCircles[key].circle.updateWidth(newWidth / 2 * 0.25);
        });
    };

    updateTime = function () {
        var currentTime = new Date(),
            currentMinutes = currentTime.getMinutes(),
            currentSeconds = currentTime.getSeconds();

        if ((currentMinutes >= 0 && currentMinutes < 25) ||
                (currentMinutes >= 30 && currentMinutes < 55)) {
            if (currentMinutes <= 25) {
                allCircles.minutes.circle.update(24 - currentMinutes);
            } else {
                allCircles.minutes.circle.update(54 - currentMinutes);
            }

            utils.addClass(workEl, VISIBLE_CLASS);
            utils.removeClass(pauseEl, VISIBLE_CLASS);
        } else {
            // TODO: Set minutes circle max value to 5, here

            if (currentMinutes <= 30) {
                allCircles.minutes.circle.update(29 - currentMinutes);
            } else {
                allCircles.minutes.circle.update(59 - currentMinutes);
            }

            utils.removeClass(workEl, VISIBLE_CLASS);
            utils.addClass(pauseEl, VISIBLE_CLASS);
        }

        allCircles.seconds.circle.update(59 - currentSeconds);
    };

    (function () {
        allCircles = {
            minutes: {
                element: doc.getElementById('minutes'),
                circle: circles.create(
                    utils.makeCircleOptions('minutes', 24, '#f39c12')
                )
            },
            seconds: {
                element: doc.getElementById('seconds'),
                circle: circles.create(
                    utils.makeCircleOptions('seconds', 60, '#f1c40f')
                )
            }
        };

        onResize();
        win.addEventListener(
            'resize',
            utils.debounce(onResize, INTERVAL_SMALL)
        );

        updateTime();
        win.setInterval(updateTime, INTERVAL_BIG);
    }());
}(window, document));
