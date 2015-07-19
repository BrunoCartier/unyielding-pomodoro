/*jslint indent: 4, maxlen: 80 */
/*global window */

(function (win) {
    'use strict';

    var debounce,
        makeText,
        makeCircleOptions,
        addClass,
        removeClass;

    // Source: http://goo.gl/c3mZHP
    debounce = function (func, wait) {
        var timeout,
            args,
            context,
            timestamp;

        return function () {
            context = this;
            args = [].slice.call(arguments, 0);
            timestamp = new Date();

            var later = function () {
                var last = (new Date()) - timestamp;

                if (last < wait) {
                    timeout = win.setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    func.apply(context, args);
                }
            };

            if (!timeout) {
                timeout = win.setTimeout(later, wait);
            }
        };
    };

    makeText = function (val) {
        var output = parseInt(val, 10);

        if (output.toString().length === 1) {
            return '0' + output.toString();
        }

        return output;
    };

    makeCircleOptions = function (elementId, maxVal, color) {
        return {
            id: elementId,
            radius: 100,
            maxValue: maxVal,
            duration: null,
            width: 10,
            colors: ['#95a5a6', color],
            text: makeText
        };
    };

    addClass = function (el, klass) {
        if (!el.classList.contains(klass)) {
            el.classList.add(klass);
        }
    };

    removeClass = function (el, klass) {
        if (el.classList.contains(klass)) {
            el.classList.remove(klass);
        }
    };

    win.utils = {
        debounce: debounce,
        makeText: makeText,
        makeCircleOptions: makeCircleOptions,
        addClass: addClass,
        removeClass: removeClass
    };
}(window));
