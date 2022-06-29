const morseCode = require('morse-code-js');

const str = '-...  --. --..  -..- -.--  -.- ';

const words = str
  .replaceAll('.', '*')
  .trim()
  .split(' ')
  .map((w) => w.trim());

// decode mores into string
const decoded = words.map((w) => morseCode.string(w)).join('');

// convet string to code
const codes = [];
for (let i = 0; i < decoded.length; i++) {
  codes.push(decoded.charCodeAt(i));
}

// shift space
const shift = 7;

// shift code
const newCodes = codes.map((c) => {
  if (c + shift > 90) {
    const diff = c + shift - 90;
    return 64 + diff;
  } else {
    return c + shift;
  }
});

// convert code to string back
console.log(newCodes.map((c) => String.fromCharCode(c)));
