'use strict';

var expect   = require('chai').expect,

    Postcode = require('../../../src/postcode');

describe('Postcode', function() {

    /*
        FORMAT    EXAMPLE
        ------------------
        AN NAA    M1 1AA
        ANN NAA   M60 1NW
        AAN NAA   CR2 6XH
        AANN NAA  DN55 1PT
        ANA NAA   W1A 1HQ
        AANA NAA  EC1A 1BB
     */

    it('is instantiated with a string representing a post code', function() {
        var postcode = new Postcode('E14 5EP');

        expect(postcode).to.be.instanceOf(Postcode);
    });
});
