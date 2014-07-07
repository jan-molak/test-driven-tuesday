'use strict';

function Document(title, contents) {
    // private
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


    // privileged

    this.title = function() {
        return titleised(title);
    };

    this.contents = function() {
        return contents;
    };
}

module.exports = Document;