/*

 Partial application allows you create new functions from existing functions, while fixing
 some number of arguments. After setting the arguments to be partially applied, you get a
 new function ready to take the rest of the arguments and perhaps execute the original function.


 Task

   Implement a logging function that prepends a namespace string to its output.

   Your implementation should take a namespace string, and return a function that prints
   messages to the console with the namespace prepended.

   Make sure *all* arguments passed to the returned logging function are printed.

   ** Print the output to the console directly **

 Arguments

   * namespace: a String to prepend to each message passed to the returned function.

 Example

   var info = logger('INFO:')
   info('this is an info message')

   // INFO: this is an info message

   var warn = logger('WARN:')
   warn('this is a warning message', 'with more info')
   // WARN: this is a warning message with more info

 Conditions

   * Do not use Function#bind

 Resources

   * https://en.wikipedia.org/wiki/Partial_application
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

 Hints

   * Remember `console.log` takes any number of arguments and prints them, separated by spaces:

     console.log('hello', 'world') // => 'hello world'
     console.log(1,2,3) // => 1 2 3

     We simply want to 'partially apply' the first argument to `console.log`.
 */

'use strict';
var slice = Array.prototype.slice;

module.exports = function log(namespace) {
    return function() {
        var args = slice.call(arguments,0);
        args.unshift(namespace);
        console.log.apply(null,args)
    }
};