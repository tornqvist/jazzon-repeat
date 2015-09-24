# jazzon-repeat

> Repeat given value n number of times

## Installation

```bash
$ npm install --save jazzon-repeat
```

## Usage

The helper "repeat" clones (deep) the current state given number of times and puts them in an array.

```javascript
let jazzon = require('jazzon');
let repeat = require('jazzon-repeat');

jazzon
  .use(repeat())
  .compile({ foo: '@{ random(1, 10) | repeat(3) }'})
  .then(result => console.log(result)) // => {foo: [7, 7, 7]}
```
