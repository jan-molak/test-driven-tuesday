'use strict';

/**
 *
 * @param authoriser
 * @constructor
 */
function System(authoriser) {

    var login_count = 0;

    return {
        /**
         * @param {String} username
         * @param {String} password
         */
        login: function(username, password) {
            if (authoriser.authorise(username, password)) {
                ++login_count;
            }
        },

        /**
         * @return {Number} Number of "logged in" users
         */
        loginCount: function() {
            return login_count;
        }
    };
}

module.exports = System;