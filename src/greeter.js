'use strict';

var moment = require('moment'); // http://momentjs.com/docs/

function Greeter() {

    return {
        greet: function() {
            return 'Oh boy, what should I say? It is ' + moment().format('h:m a') + '!';
        }
    };
}

module.exports = Greeter;