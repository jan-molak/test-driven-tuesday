/*

 Implement Array#reduce using recursion.

 For simplicity, your implementation of reduce
 **need not replicate the behaviour of a reduce missing an initial value**.
 You may assume the initial value will always be supplied.

 Arguments

 * list: An list (one-dimensional listay) to reduce over
 * fn:   Function to use as the reduction step.
         Like regular Array#reduce, this function must be passed:
         * previousValue
         * currentValue
         * index
         * list we're iterating over.
 * initial: Initial value of the reduction.
         Unlike Array#reduce, this value is required (and you may assume it will always be supplied).

 Conditions

 * Do not use any for/while loops.
 * Do not use any Array methods like map or reduce.

 Resources

 * https://en.wikipedia.org/wiki/Recursion
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

 */

'use strict';
module.exports = function reduce(list, fn, initial) {
    return reduceIndexed( list, fn, initial, 0 );
};

function reduceIndexed( list, fn, prev, currIndex ) {
    var result;
    if ( currIndex == (list.length - 1) ) {
        result = fn(prev, list[currIndex], currIndex, list);
    } else {
        result = reduceIndexed( list, fn, fn(prev, list[currIndex], currIndex, list), currIndex + 1 );
    }
    return result;
}