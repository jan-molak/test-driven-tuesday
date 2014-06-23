'use strict';

var q       = require('q'),

    numbers = [2, 3, 7];

function fetchNumbers(callback) {

    function fetchNumbersUsingCallback(callback) {
        setTimeout(function () {
            callback(null, numbers);
        }, 10);
    }

    function fetchNumbersUsingPromise() {
        return q.resolve(numbers);
    }

    return callback ? fetchNumbersUsingCallback(callback) : fetchNumbersUsingPromise();
}

function multiplyThem(numbers, callback) {

    function multiplyThemUsingCallback(numbers, callback) {
        setTimeout(function () {
            var total = numbers.reduce(function (acc, number) {
                return acc * number;
            }, 1);

            callback(null, total);
        }, 10);
    }

    function multiplyThemUsingPromise(numbers) {
        return q.resolve(numbers.reduce(function (acc, number) {
            return acc * number;
        }, 1));
    }

    return callback ?
        multiplyThemUsingCallback(numbers, callback) :
        multiplyThemUsingPromise(numbers);
}

function attachDescription(total) {
    return 'The answer to life the universe and everything: ' + total;
}

function noop() {}

module.exports.noop              = noop;
module.exports.fetchNumbers      = fetchNumbers;
module.exports.multiplyThem      = multiplyThem;
module.exports.attachDescription = attachDescription;
