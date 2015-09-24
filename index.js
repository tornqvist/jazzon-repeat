'use strict';

let clone = require('lodash.clonedeep');

module.exports = function () {
  return function (state, helper, args) {
    switch (helper) {
    case 'repeat':
      let arr = [];
      let num = (args && +args[0]);

      if (isNaN(num)) {
        return state;
      }

      for (let i = 0; i < num; i += 1) {
        arr.push(clone(state));
      }

      return arr;
    default:
      return state;
    }
  };
};
