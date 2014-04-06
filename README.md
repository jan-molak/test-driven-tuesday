# Test-Driven Friday TDD Katas

## (British) Postcode

The postcodes are **alphanumeric** and **between six and eight characters long**,
including a **single space separating the outward and inward** parts of the code.
Each postcode unit generally represents a street, part of a street, or a single address. *[...]*

The **'outward'** part identifies first the **postcode area**, using **one or two letters** (for example L for Liverpool, RH Redhill and EH Edinburgh).
These letter(s) are **followed by one or two digits** (and **sometimes a final letter**) to identify the appropriate postcode district (for example W1A, RH1, RH10 or SE1P). *[...]*

The **'inward'** is used to assist with the delivery of post within a postal district.
The **first character is a number** denoting a 'sector' and the **final two letters** identify the postcode unit,
which may be a group of properties, a single property, a sub-section of the property,
an individual organisation or a subsection of the organisation. The level of discrimination is often based on the amount of mail received by the premises or business. *[...]*

### Validation

The format is as follows, where **A signifies a letter and 9 a digit**:

| Format   | Example  |
|----------|----------|
| AA9A 9AA | EC1A 1BB |
| A9A 9AA  | W1A 1HQ  |
| A9 9AA   | M1 1AA   |
| A99 9AA  | B33 8TH  |
| AA9 9AA  | CR2 6XH  |
| AA99 9AA | DN55 1PT |

source: [Wikipedia](http://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom)

_Postcode exercise has been originally designed by [Antony Marcano](http://antonymarcano.com/blog/)_

## The FizzBuzz Kata

_"The 'Fizz-Buzz test' is an interview question designed to help filter out the 99.5% of programming job candidates who can't seem to program their way out of a wet paper bag."_ - Ward Cunningham

- Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".

Steps:

Lets divide this into different steps so, we can easily write and test this:
- Print numbers from 1 to 100
- Print "Fizz" instead of number which is divisible by 3
- Print "Buzz" instead of number which is divisible by 5
- Print "FizzBuzz" instead of number which is divisible by both 3 and 5

_FizzBuzz kata has been designed by [Imran Ghory](http://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/)_

## String Calculator

- Create a simple String calculator with a method `add("taking,a,string,of,comma,separated,numbers")`
    - The method can take 0, 1 or 2 numbers, and will return their sum (for an empty string it will
      return 0) for example `""` or `"1"` or `"1,2"`
    - Start with the simplest test case of an empty string and move to 1 and two numbers
    - Remember to solve things as simply as possible so that you force yourself to write tests you did
      not think about
    - Remember to refactor after each passing test
- Allow the `add` method to handle an unknown number of numbers
- Allow the `add` method to handle new lines between numbers (instead of commas).
    - the following input is ok:  `"\n2,3"`  (will equal 6)
    - the following input is NOT ok:  `"1,\n"` (not need to prove it - just clarifying)
- Support different delimiters
        to change a delimiter, the beginning of the string will contain a separate line that looks like this:   
        `"//[delimiter]\n[numbers...]"` for example `"/;\n1;2"` should return three where the default delimiter is `';'` .
        the first line is optional. All existing scenarios should still be supported
- Calling `add` with a negative number will throw an exception "negatives not allowed" - and the negative that was passed.
  if there are multiple negatives, show all of them in the exception message 

## Functional programming

Functional programming katas are inspired by exercises from http://nodeschool.io/#functionaljs
Those exercises have been modified to make the automated verification of results more prominent and easier to understand.