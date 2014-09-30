/*

 Use Array#filter to write a function called `shortMessages`.

 `shortMessages` takes an array of objects with '.message' properties
 and returns any messages that are *less than < 50 characters long*.

 Conditions:

 * Do not use for loops or Array#forEach.

 Hints

 * Try chaining some Array methods!

 Expected Output:

 The output should be an array containing the messages themselves, without their containing object.

    e.g.

 [
    'Tempor quis esse consequat sunt ea eiusmod.',
    'Id culpa ad proident ad nulla laborum incididunt.',
    'Ullamco in ea et ad anim anim ullamco est.',
    'Est ut irure irure nisi.'
 ]

 Resources:

 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

 */

'use strict';
module.exports = function onlyShort(messages) {
    return messages.filter( function(element) {
        return element.message.length < 50;
    }).map( function(element) {return element.message} );
};