'use strict';

var expect   = require('chai').expect,

    Postcode = require('../src/postcode');

describe.skip('Postcode', function() {

    it('is instantiated with a string representing a post code', function() {
        // prepare

        // expect

        // act
        var postcode = new Postcode('E14 5EP');

        // assert
        expect(postcode).to.be.an('object');
    });

    describe('a valid post code', function() {

        it('...', function() {
        });
    });

});
