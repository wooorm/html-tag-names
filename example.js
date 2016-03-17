// Dependencies:
var htmlTagNames = require('./index.js');

// Slicing the first 20:
var first = htmlTagNames.slice(0, 20);
// Yields:
console.log('js', require('util').inspect(first));

// And `length`:
var length = htmlTagNames.length;
// Yields:
console.log('js', String(length));
