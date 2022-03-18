// A little fun file to test Lerna bootstrap
const isNumber = require("is-number");

console.log('"Hello" is ' + (isNumber("Hello") ? "a number" : "not a number"));
console.log('"123" is ' + (isNumber("123") ? "a number" : "not a number"));
