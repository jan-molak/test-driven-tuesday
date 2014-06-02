'use strict';

var chai        = require('chai'),
    expect      = chai.expect,
    sinon       = require('sinon'),
    sinon_chai  = require('sinon-chai'),

    System        = require('../src/little_mocker/system'),
    Authoriser    = require('../src/little_mocker/authoriser'),

    noop = function() {};


chai.use(sinon_chai);

/*
 http://blog.8thlight.com/uncle-bob/2014/05/14/TheLittleMocker.html
 http://www.ccs.neu.edu/research/demeter/related-work/extreme-programming/MockObjectsFinal.PDF
 http://martinfowler.com/articles/mocksArentStubs.html
 */
describe('Little Mocker', function() {

    /*
     Dummy objects are passed around but never actually used.
     Usually they are just used to fill parameter lists.
     */
    describe('A Dummy', function() {

        var dummy_authoriser = { authorise: noop };

        describe('A newly created System', function() {

            it('has no logged in users', function() {
                var system = new System(dummy_authoriser);

                expect(system.loginCount()).to.equal(0);
            });
        });
    });

    /*
     Stubs provide canned answers to calls made during the test,
     usually not responding at all to anything outside what's programmed in for the test.
     */
    describe('A Stub', function() {

        describe('In plain-old JavaScript', function() {

            var accepting_authoriser = { authorise: function() { return true; } };

            describe('A System with a logged in user', function() {
                it('has a loginCount of 1', function() {
                    var system = new System(accepting_authoriser);

                    system.login('bob', 'SecretPassword');

                    expect(system.loginCount()).to.equal(1);
                });
            });
        });


        describe('Using Sinon.js', function() {

            var accepting_authoriser;

            describe('A System with a logged in user', function() {

                beforeEach(function() {
                    accepting_authoriser = sinon.createStubInstance(Authoriser);    // does not call the constructor
                    accepting_authoriser.authorise.returns(true);
                });

                it('has a loginCount of 1', function() {
                    var system = new System(accepting_authoriser);

                    system.login('bob', 'SecretPassword');

                    expect(system.loginCount()).to.equal(1);
                });
            });
        });
    });

    /*
     Spies record information about calls, such as an email gateway stub that remembers the messages it 'sent',
     or maybe only how many messages it 'sent'.
     */
    describe('A Spy', function() {

        describe('In plain-old JavaScript', function() {

            var accepting_authoriser_spy = {

                authorise_was_called: false,
                authorise:            function() {
                    this.authorise_was_called = true;
                    return true;
                }
            };

            describe('A System', function() {
                it('delegates logging users in to the authoriser', function() {
                    var system = new System(accepting_authoriser_spy);

                    system.login('bob', 'SecretPassword');

                    expect(accepting_authoriser_spy.authorise_was_called).to.equal(true);
                });
            });
        });


        describe('Using Sinon.js', function() {

            // no longer an 'accepting_authoriser', sinon.spy is a proxy
            var authoriser = new Authoriser(),
                authorise_spy;

            // the more you spy, the more tight coupling you introduce
            beforeEach(function() {
                authorise_spy = sinon.spy(authoriser, 'authorise');
            });

            afterEach(function() {
                authorise_spy.restore();
            });

            describe('A System', function() {
                it('delegates logging users in to the authoriser', function() {
                    var system = new System(authoriser);

                    system.login('bob', 'SecretPassword');

                    expect(authorise_spy).to.have.been.calledWithExactly('bob', 'SecretPassword');
                });
            });
        });

    });

    /*
     Mocks are objects pre-programmed with expectations which form a specification
     of the calls they are expected to receive.
     */
    describe('A Mock', function() {

        describe('In plain-old JavaScript', function() {

            var accepting_authoriser_mock = {
                
                authorise_was_called: false,
                authorise:            function() {
                    this.authorise_was_called  = true;
                    return true;
                },
                verify:             function() {
                    return this.authorise_was_called;
                }
            };

            describe('A System', function() {
                it('delegates logging users in to the authoriser', function() {
                    var system = new System(accepting_authoriser_mock);

                    system.login('bob', 'SecretPassword');

                    expect(accepting_authoriser_mock.verify()).to.equal(true);
                });
            });
        });


        describe('Using Sinon.js', function() {

            var authoriser = new Authoriser(),                      // call to the real constructor
                accepting_authoriser_mock;

            beforeEach(function() {
                accepting_authoriser_mock = sinon.mock(authoriser); // a mock is created from an instance of Authoriser
            });

            afterEach(function() {
                accepting_authoriser_mock.restore();                // original authoriser object is restored
            });

            describe('A System', function() {
                it('delegates logging users in to the authoriser', function() {
                    // prepare
                    var system = new System(authoriser);

                    // expect
                    accepting_authoriser_mock.expects('authorise').once();

                    // act
                    system.login('bob', 'SecretPassword');

                    // assert
                    accepting_authoriser_mock.verify();
                });
            });
        });
    });

    /*
     A Fake has business behavior. You can drive a fake to behave in different ways by giving it different data.
     */
    describe('A Fake', function() {

        var accepting_authoriser_fake = {
            authorise: function(username, password) {
                return (username === 'bob' && password === 'SecretPassword');
            }
        };

        describe('A System', function() {
            it('allows Bob in', function() {
                var system = new System(accepting_authoriser_fake);

                system.login('bob', 'SecretPassword');

                expect(system.loginCount()).to.equal(1);
            });

            it('does not allow Alice in', function() {
                var system = new System(accepting_authoriser_fake);

                system.login('alice', 'password');

                expect(system.loginCount()).to.equal(0);
            });
        });
    });
});