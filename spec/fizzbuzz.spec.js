'use strict';

var expect   = require('chai').expect,

    fizzbuzz = require('../src/fizzbuzz');

describe.only('fizzbuzz', function() {
    var result = fizzbuzz();

    it('is an array', function() {
        expect(result).to.be.an.instanceOf(Array);
    });

    it('has 100 elements', function() {
        expect(result).to.have.length(100);
    });

    it('does not contain any numbers divisible by 3', function() {
        expect(result.filter(function( element ) {
            return !(isNaN(element)) && element % 3 == 0;
        })).to.have.length(0);
    });

    it('does not contain any numbers divisible by 5', function() {
        expect(result.filter(function( element ) {
            return !(isNaN(element)) && element % 5 == 0;
        })).to.have.length(0);
    });

    it('contains exactly 6 occurrences of "FizzBuzz"', function() {
        expect(result.filter(function( element ) {
            return element == 'FizzBuzz';
        })).to.have.length(6);
    });

    it('contains exactly 27 occurrences of "Fizz"', function() {
        expect(result.filter(function( element ) {
            return element == 'Fizz';
        })).to.have.length(27);
    });

    it('contains exactly 14 occurrences of "Buzz"', function() {
        expect(result.filter(function( element ) {
            return element == 'Buzz';
        })).to.have.length(14);
    });

    it('produces incrementing whole numbers between 1 and 100', function() {
        var justNumbers = result.filter(function( element ) {
            return !isNaN(element) && element % 1 == 0;
        });
        expect(justNumbers).to.have.length(53);
        expect(Math.min.apply(null, justNumbers)).to.equal(1);
        expect(Math.max.apply(null, justNumbers)).to.equal(98);
        expect(justNumbers.reduce( function(prev, curr) {
            var result = prev;
            if ( curr > prev ) {
                result++;
            }
            return result;
        },0)).to.equal(53);
    });
});