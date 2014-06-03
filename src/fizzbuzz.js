module.exports = function fizzbuzz() {
    var result = [];
    for (var i=1; i<=100; i++) {
        if (i % 3 == 0) {
            if (i % 5 == 0) {
                result.push('FizzBuzz');
            } else {
                result.push('Fizz');
            }
        } else if (i % 5 == 0) {
            result.push('Buzz')
        } else{
            result.push(i);
        }
    }
    return result;
};