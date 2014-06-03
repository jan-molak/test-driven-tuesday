/*

 Convert the below implementation from a for-loop to Array#map

 Conditions:

 * Do not use any for/while loops.
 * You do not need to define any additional functions

 Resources:

 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

*/

'use strict';
module.exports = function doubleAll(numbers) {
    return numbers.map(function(n) {return n*2});
};