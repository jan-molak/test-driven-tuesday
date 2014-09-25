# Test-Driven Tuesday
This repository contains supporting materials for the Test-Driven Tuesday workshop I'm currenly running.

The code katas and other exercises you'll find here should help you to understand the basics of JavaScript and Test-Driven Development (TDD) using node.js and popular automation tools.

## Prerequisites
You can use any IDE or text editor you like to play with the code here, but for the purpose of this workshop and its context I'll assume the following:
* You have [IntelliJ](http://www.jetbrains.com/idea/) or [WebStorm](http://www.jetbrains.com/webstorm/) installed
* You have a [GitHub account](https://github.com/join) (you'll need it to fork this repository)
* You have [git](http://git-scm.com/) [installed](https://help.github.com/articles/set-up-git) on your machine
* You have [node.js and npm set up](http://nodejs.org/)
* You're using a *nix operating system
* You've done some programming before and you're comfortable with using terminal

## Workshop Workflow

We will now create a fork of our repo so you can easily keep it in sync with this one. You will be able to easily pull from this repo, but push to your fork. 

* **Fork this repo**: [click here](https://github.com/jan-molak/test-driven-tuesday/fork) to create your fork: `https://github.com/<MyGitHubAccount>/test-driven-tuesday` (learn more about forking from [github manual](https://help.github.com/articles/fork-a-repo))
* **Clone this repo** (not your fork): `git clone https://github.com/jan-molak/test-driven-tuesday`
* **Configure push to your fork ** (rather than this repo): `git remote set-url --push origin https://github.com/<MyGitHubAccount>/test-driven-tuesday`

Now you can `git pull` from origin and `git push` to your fork without verbose commands like `git pull origin master`. Later when you want to contribute back please raise a Pull Request (PR) on your fork in github site to merge changes.

* Install node modules by running `npm install` in the directory where you've cloned the project to. **Remember to re-run npm install whenever the `package.json` file is changed**
* Make sure you node_modules executables are on your `$PATH` by adding the following entry to your `.bashrc` or `.zshrc`
```
PATH=$PATH:./node_modules/.bin # Add node_modules binaries
```
* Validate your clone by running: `grunt` in your project directory. You should get output similar to the following:
```
$> grunt                                                                                                               Running "clean:0" (clean) task

Running "mochacov:watch" (mochacov) task

# ... here goes the test output

  0 passing (7ms)
  38 pending

Done, without errors.
```
* set up IntelliJ to run [mocha](http://visionmedia.github.io/mocha/) tests:
  1. create a new run configuration called 'unit tests' for 'mocha' as per [the docs](https://www.jetbrains.com/idea/webhelp/creating-and-editing-run-debug-configurations.html)
  2. set your 'mocha node package' to /path/to/your/project/**node_modules/grunt-mocha-cov/node_modules/mocha**


### Do the exercise
* Sync your fork with my original repository - [full instructions on how to do this](https://help.github.com/articles/syncing-a-fork]
```
$> git stash
$> git pull upstream master
$> git stash apply
```
* Solve a problem of your choosing and make sure all the tests are passing :)

### Submit your solution
* Whenever you get the tests to pass - commit and push the solution to your forked repository
* Raise a pull request so I can merge your solution

# TDD Katas

## (British) Postcode

You can find the details under [spec/exercises/objects_under_construction](https://github.com/jan-molak/test-driven-tuesday/tree/master/spec/exercises/objects_under_construction)

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

## Little Mocker

The Little Mocker exercise is based on [The Little Mocker blog post](http://blog.8thlight.com/uncle-bob/2014/05/14/TheLittleMocker.html) by
[Uncle Bob Martin](http://en.wikipedia.org/wiki/Robert_Cecil_Martin)
