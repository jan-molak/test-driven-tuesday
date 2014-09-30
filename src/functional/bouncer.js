/*

 Task:

 When 'bouncer' is called with a 'guestList', it returns a function that returns true if all
 of the supplied 'guests' exist on the original 'guestList'

 The 'bouncer' only checks if the ids match.

 Conditions:

 * Do not use any for/while loops.

 Hints:

 Use array#some and Array#every to check if every user passed to your returned
 function exists in the array passed to the exported function.

 Resources:

 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some

 */

'use strict';
module.exports = function bouncer(guestList) {
    return function(guests) {
        return guests.every(function(guest) {
            return guestList.some(function(guestListGuest) {
                    return guestListGuest.id == guest.id;
            });
        });
    };
};