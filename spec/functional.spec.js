'use strict';

var chai       = require('chai'),
    expect     = chai.expect,
    sinon      = require('sinon'),
    sinonChai  = require('sinon-chai'),
    loremIpsum = require('lorem-ipsum'),

    uppercase   = require('../src/functional/uppercase'),
    repeat      = require('../src/functional/repeat'),
    doubleAll   = require('../src/functional/double_all'),
    onlyShort   = require('../src/functional/only_short'),
    bouncer     = require('../src/functional/bouncer'),
    stocktaker  = require('../src/functional/stocktaker'),
    reduce      = require('../src/functional/reduce'),
    duckCount   = require('../src/functional/duck_count');

chai.use(sinonChai);

/*
    Functional programming is based on a simple premise with far-fetching implications:
    - we construct our programs using only Pure Functions
    In other words, functions that have no side effects.

    Functional programming is a restriction on how we write programs,
    but not on what programs we can write.

    It turns out that accepting this restriction is tremendously beneficial
    because of the increase in modularity that we gain from programming with pure functions.
    Because of this modularity, pure functions are easier to test, to reuse, to parallelise,
    to generalise and to reason about.
 */

describe('Functional Programming', function() {

    describe('uppercase', function() {

        it('returns an upper-case version of the string provided', function() {
            // pure function, no side effects
            expect(uppercase('hello world')).to.equal('HELLO WORLD');
        });
    });

    describe('Higher-order functions', function() {

        describe('repeat', function() {

            /*
                Iteration (looping) in functional languages is usually accomplished via recursion.
                Recursive functions invoke themselves, allowing an operation to be performed over
                and over until the base case is reached.

                Though some recursion requires maintaining a stack,
                tail recursion can be recognised
                and optimised by a compiler into the same code used to implement iteration in imperative
                languages

                http://stackoverflow.com/questions/33923/what-is-tail-recursion
             */

            it('calls a given function "n" times', function() {
                var operation = sinon.spy();

                repeat(operation, 10);

                expect(operation).to.have.callCount(10);
            });
        });
    });

    describe('Basics', function() {

        describe('Array#map', function() {

            describe.skip('doubleAll', function() {

                it('doubles the value of each element of the input array', function() {
                    var numbers        = [ 0, 1, 2, 3, 4,  9,  8,  7,  6,  5 ],
                        doubledNumbers = [ 0, 2, 4, 6, 8, 18, 16, 14, 12, 10 ];

                    expect(doubleAll(numbers)).to.eql(doubledNumbers);
                });
            });
        });

        describe('Array#filter', function() {

            describe.skip('onlyShort', function() {
                // generates an object { message: body } where body has no more characters than maxCharacters
                function message(maxCharacters) { return { message: loremIpsum({ units: 'words', count: Math.floor(maxCharacters / 2) }).substr(0, maxCharacters) }; }

                var shortMessage = message.bind(message, 49),
                    longMessage  = message.bind(message, 200);

                it('returns bodies of messages that are less than 50 characters long', function() {
                    var messages = [
                        longMessage(),
                        longMessage(),
                        longMessage(),
                        shortMessage(),
                        longMessage()
                    ];

                    var shortMessages = onlyShort(messages);

                    expect(shortMessages).to.have.lengthOf(1);
                    expect(shortMessages[0]).to.have.length.below(50);
                });
            });
        });

        describe('Array#every Array#some', function() {

            describe.skip('bouncer', function() {

                it('lets a group of guests in if all the guests are on the guestList', function() {
                    var guestList = [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 }
                    ];

                    var guests = [
                        { id: 2 },
                        { id: 1 }
                    ];

                    var shouldBeLetIn = bouncer(guestList);

                    expect(shouldBeLetIn(guests)).to.be.true;
                });

                it('does not let the whole group in if at least one guest is not on the guestList', function() {
                    var guestList = [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 }
                    ];

                    var guests = [
                        { id: 4 },
                        { id: 1 },
                        { id: 2 }
                    ];

                    var shouldBeLetIn = bouncer(guestList);

                    expect(shouldBeLetIn(guests)).to.be.false;
                });
            });
        });

        describe('Array#reduce', function() {

            describe.skip('stocktaker', function() {

                it('calculates quantities of fruits', function() {
                    var fruits = [ 'apple', 'banana', 'orange', 'orange', 'orange', 'banana' ];

                    var expectedQuantities = {
                        apple:  1,
                        banana: 2,
                        orange: 3
                    };

                    expect(stocktaker(fruits)).to.deep.equal(expectedQuantities);
                });
            });

            describe('reduce', function() {
                function summarise(previous, current, index, array) {
                    return previous + current;
                }

                describe.skip('implements Array#reduce using recursion', function() {

                    it('performs reduction of an array with one element', function() {
                        expect(reduce([ 1 ], summarise, 0)).to.equal(1);
                    });

                    it('performs reduction of an array with multiple elements', function() {
                        expect(reduce([ 1, 2, 3 ], summarise, 0)).to.equal(6);
                    });

                    it('calls the callback function with `previous`, `current`, `index` and `array` parameters', function() {
                        var callback = sinon.spy(),
                            previous = 0,
                            current  = 1,
                            index    = 0,
                            list     = [ 1 ],
                            initial  = 0;

                        reduce(list, callback, initial);

                        expect(callback).to.always.have.been.calledWithExactly(
                            previous, current, index, list
                        );
                    });
                });
            });
        });

        describe('"Borrowing" functionality', function() {

            describe.skip('call', function() {
                function duck() {
                    return { quack: true };
                }

                function duckWithNoPrototype() {
                    var duck = Object.create(null);
                    duck.quack = true;

                    return duck;
                }

                function duckImpostor() {
                    var prototype = duck();

                    return Object.create(prototype);
                }

                function notADuck() {
                    return Object.create(null);
                }

                it('returns 0 if there are no ducks to count', function() {
                    expect(duckCount()).to.equal(0);
                });

                it('counts real ducks', function() {
                    expect(duckCount(duck())).to.equal(1);
                });

                it('counts real ducks, even if they have no prototype', function() {
                    expect(duckCount(duckWithNoPrototype())).to.equal(1);
                });

                it('ignores a duck impostor', function() {
                    expect(duckCount(duckImpostor())).to.equal(0);
                });

                it('ignores objects that are not ducks', function() {
                    expect(duckCount(notADuck())).to.equal(0);
                });

                it('counts multiple ducks', function() {
                    expect(duckCount(duck(), duckWithNoPrototype())).to.equal(2);
                    expect(duckCount(duck(), duck(), duckWithNoPrototype())).to.equal(3);
                });

                it('counts ignores anything that is not a "real" duck', function() {
                    expect(duckCount(
                        duck(),
                        duckImpostor(),
                        notADuck(),
                        duckImpostor(),
                        duck()
                    )).to.equal(2);
                });
            });
        });
    });
});