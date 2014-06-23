'use strict';

var q              = require('q'),
    chai           = require('chai'),
    expect         = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    sinon          = require('sinon'),
    sinonChai      = require('sinon-chai'),

    promise           = require('../src/promise'),
    noop              = promise.noop,
    fetchNumbers      = promise.fetchNumbers,
    multiplyThem      = promise.multiplyThem,
    attachDescription = promise.attachDescription;

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe.only('promises', function () {

    describe('the motivation', function () {

        // our data flow:
        //   fetchNumbers (async) -> multiplyThem (async) -> attachDescription (sync)

        it('looks like this when using Continuation-Passing Style (CPS, a.k.a. callbacks)', function (done) {
            fetchNumbers(function (err, numbers) {
                if (err) {
                    // handle error from fetchNumbers
                    console.error(err);
                }

                multiplyThem(numbers, function (err, product) {
                    if (err) {
                        // handle error from multiplyThem
                        console.error(err);
                        throw err;
                    }
                    // .. what if we don't break the execution: forgot to "return" or throw?

                    // like in the block above this one? :)

                    var message = attachDescription(product);

                    expect(message).to.equal('The answer to life the universe and everything: 42');

                    done();
                });
            });
        });

        it('can be also expressed like that with promises...', function (done) {
            fetchNumbers().then(multiplyThem).then(attachDescription).then(function (message) {
                expect(message).to.equal('The answer to life the universe and everything: 42');
            }).done(done);
        });
    });

    describe('basics', function() {
        it('can be resolved', function(done) {
            var deferred = q.defer();

            // important: a promise is guaranteed to be executed on the next tick of the node event loop
            // a callback isn't
            deferred.resolve('Resolved');

            deferred.promise.then(function(value) {
                expect(value).to.equal('Resolved');

                done();
            });
        });

        it('can be rejected', function(done) {
            var deferred = q.defer();

            deferred.reject('Something bad happened');

            deferred.promise.then(noop, function(error) {
                expect(error).to.equal('Something bad happened');

                done();
            });
        });

        it('can be either resolved or rejected, never both', function(done) {
            var deferred = q.defer(),
                result   = '';

            deferred.resolve('OK');
            deferred.reject('FAIL');

            deferred.promise.

                then(function(value) {
                    result = value;
                }, function(error) {
                    result = error;
                }).

                then(function() {
                    expect(result).to.equal('OK');
                }).done(done);
        });

        it('can be chained with functions returning either promises or values', function(done) {
            // returns a promise
            function getPromised(value) {
                return q.resolve('promised ' + value);
            }

            // returns a value
            function getExcited(value) {
                return value + '!';
            }

            getPromised('land').then(getExcited).then(function(result) {
                expect(result).to.equal('promised land!');
            }).done(done);
        });

        describe('error handling', function() {

            var malformed_json = '{ junk: json data }';

            function parse(json) {
                return JSON.parse(json);    // no error handling here, will blow up
            }

            function performAssertion(error) {
                expect(error.name).to.equal('SyntaxError');
                expect(error.message).to.equal('Unexpected token j');
            }

            it('can be done using #fcall to trap errors', function(done) {
                q.fcall(parse, malformed_json).fail(performAssertion).done(done);
            });

            it('can be done using #try to do the same', function(done) {
                q.try(parse, malformed_json).fail(performAssertion).done(done);
            });

            it('can catch errors using #catch too', function(done) {
                q.try(parse, malformed_json).catch(performAssertion).done(done);
            });

            it('can be done as part of a promise chain', function() {
                var call_spy = sinon.spy();

                q.try(call_spy).then(call_spy).then(call_spy).

                    then(function() {
                        throw new Error('something bad happened');
                    }).

                    then(call_spy).then(call_spy).       // never gets executed

                    fail(function(error) {
                        expect(call_spy).to.have.callCount(3);  // not 5

                        expect(error.message).to.equal('something bad happened');
                    }).done();
            });

            // Ending a promise chain with #done makes sure that,
            // if an error doesn’t get handled before the end, it will get rethrown and reported.

            it.skip('needs to be done-done', function(done) {

                // remember that a promise can only be resolved or rejected once

                q.try(noop).then(function() {
                    throw new Error('boom');
                }, function(error) {                        // this will make the test hang, not cool
                    expect(error.message).to.equal('boom');
                    done();
                });
//              .done(done);
            });
        });
    });

    describe('testing promises', function () {

        it('can be "done(done)" the old-school way', function(done) {
            fetchNumbers().then(multiplyThem).then(attachDescription).
                then(function (message) {
                    expect(message).to.equal('The answer to life the universe and everything: 42');
                }).
                done(done);
        });

        it('does not need "done" when a promise is returned', function() {
            return fetchNumbers().then(multiplyThem).then(attachDescription).
                then(function (message) {
                    expect(message).to.equal('The answer to life the universe and everything: 42');
                });
        });

        // https://github.com/domenic/chai-as-promised/
        it('can be used with nicer assertion libraries, such as chai-as-promised', function(done) {
            expect(fetchNumbers().then(multiplyThem).then(attachDescription)).

                to.eventually.equal('The answer to life the universe and everything: 42').

                notify(done);
        });
    });
});