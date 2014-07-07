'use strict';

function Document(title, contents) {
    // pseudo-private fields, underscore is only a hint to a developer
    // leaking implementation details!
    this._title    = title;
    this._contents = contents;
}

// public methods can only access public member fields. period.

Document.prototype.title = function() {
    // private function
    function titleised(text) {
        if (! text) {
            return '';
        }

        return String(text)
            .toLowerCase()
            .replace(/(?:^|\s|-)\S/g, function (first_letter) {
                return first_letter.toUpperCase();
            });
    }

    return titleised(this._title);
};

Document.prototype.contents = function() {
    return this._contents;
};

module.exports = Document;