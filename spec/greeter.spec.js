'use strict';

var chai       = require('chai'),
    expect     = chai.expect,
    sinon_chai = require('sinon-chai'),

    moment  = require('moment'),    // http://momentjs.com/docs/
    rewire  = require('rewire');    // https://www.npmjs.org/package/rewire

chai.use(sinon_chai);

describe('Greeter', function() {

    var Greeter = require('../src/greeter');

    it.skip('says "Good morning!" before 5 AM and noon', function() {
        var greeter = new Greeter();

        expect(greeter.greet()).to.equal('good morning');
    });

    it.skip('says "Good afternoon!" between noon and 6 PM', function() {

    });

    it.skip('says "Good evening!" between 6 PM and midnight', function() {

    });

    it.skip('says "Hello!" between midnight and 5 AM', function() {

    });
});