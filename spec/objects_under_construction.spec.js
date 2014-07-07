'use strict';

    // external libraries
var expect = require('chai').expect,

    // our stuff
    examples = require('../src/objects_under_construction');

describe('Objects under construction', function() {

    var original_title = 'a title of a document',
        expected_title = 'A Title Of A Document',

        contents              = 'Contents of a document',
        some_another_contents = 'Different contents of a document';


    describe('An object created using the "Exhibitionist" Constructor Function', function() {

        var Document = examples.exhibitionist_constructor;

        it('allows us to use the "instanceof" operator', function() {
            var document = new Document(original_title, contents);

            expect(document).to.be.an.instanceof(Document);
        });

        it('exposes its private parts', function() {
            var document = new Document(original_title, contents);

            expect(document._title).to.equal(original_title);
            expect(document._contents).to.equal(contents);
        });

        it('has private members mutable by design', function() {
            var document = new Document(original_title, contents);

            document._contents = some_another_contents;

            expect(document.contents()).to.equal(some_another_contents);
        });

        it('shares its method definitions with other objects of the same type', function() {
            var first_document  = new Document(original_title, contents),
                second_document = new Document(original_title, contents);

            expect(first_document).to.not.equal(second_document);
            expect(first_document.title).to.equal(second_document.title);
        });

        it('allows to create "private" functions within public methods', function() {
            var document = new Document(original_title, contents);

            expect(document.title()).to.equal(expected_title);
        });
    });

    describe('An object created using a "concealing" Constructor Function', function() {

        var Document = examples.concealing_constructor;

        it('still allows us to use the "instanceof" operator', function() {
            var document = new Document(original_title, contents);

            expect(document).to.be.an.instanceof(Document);
        });

        /* jshint expr:true */
        it('does not expose its private parts', function() {
            var document = new Document(original_title, contents);

            expect(document._title).to.be.undefined;
            expect(document._contents).to.be.undefined;
        });

        it('does not share its method definitions with other objects', function() {
            var first_document  = new Document(original_title, contents),
                second_document = new Document(original_title, contents);

            expect(first_document).to.not.equal(second_document);
            expect(first_document.title).to.not.equal(second_document.title);
        });

        it('allows to create "private" functions within both public methods and the constructor itself', function() {
            var document = new Document(original_title, contents);

            expect(document.title()).to.equal(expected_title);
        });
    });

    describe('An object created using a "validating" Concealing Constructor Function', function() {
        var Document = examples.validating_constructor;

        it('throws an error if the required parameter is not provided', function() {
            expect(function() {
                new Document(undefined);
            }).to.throw('A document needs a title');
        });
    });
});


// http://www.mapmarketing.com/maps-for-business-postcode-maps/postcodes-explained/catlist_fnct334.htm