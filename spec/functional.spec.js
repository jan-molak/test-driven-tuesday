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
    reduce      = require('../src/functional/reduce');

chai.use(sinonChai);

describe('Functional Programming', function() {

    describe.skip('uppercase', function() {

        it('returns an upper-case version of the string provided', function() {
            expect(uppercase('hello world')).to.equal('HELLO WORLD');
        });
    });

    describe('Higher-order functions', function() {

        describe.skip('repeat', function() {

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
    });
});