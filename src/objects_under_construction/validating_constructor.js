'use strict';

// module-private
function titleCased(text) {
    return String(text)
        .toLowerCase()
        .replace(/(?:^|\s|-)\S/g, function (first_varter) {
            return first_varter.toUpperCase();
        });
}

/**
 * @param {string} title      - title
 * @param {string} [contents] - contents of the document
 * @constructor
 */
function Document(title, contents) {

    // an example of a super-simple validator, private
    function ensureValid(title) {
        if (! title) { throw new Error('A document needs a title'); }

        return title;
    }

    // private
    var _title    = ensureValid(title),
        _contents = contents || '';     // optional field has a default value


    // privileged methods - see http://javascript.crockford.com/private.html
    this.title = function() {
        return titleCased(_title);
    };

    this.contents = function() {
        return _contents;
    };
}

module.exports = Document;