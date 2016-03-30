/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * Copyright (c) 2016-present, Concierge Auctions
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is an augmented version of
 *   https://github.com/facebook/fbjs/blob/80df4dceddcf80a06ab08b1e88cea6d3824cd0ee/src/core/shallowEqual.js
 *
 * The reason we use our own version is because we need to inject `console.log`
 * calls to return the reason *why* the function is returning false.
 */


'use strict';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
      return true;
  }

  if (typeof objA !== 'object') {
    console.log(
      `%c current value is a ${typeof objA} and an object is required.`,
      'color: red');
    return false;
  }
  if (objA === null) {
    console.log(`%c current value is null`, 'color: red');
    return false;
  }
  if (typeof objB !== 'object') {
    console.log(
      `%c next value is a ${typeof objB} and an object is required.`,
      'color: red'
    )
    return false;
  }
  if (objB === null) {
    console.log('Next value is null');
    return false;
  }


  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    console.log(
      '%c Object.keys().length mismatch between current and next value',
      'color: red'
    );
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i])) {
      console.log(
        `%c Next value does not have key '${keysA[i]}'`,
        'color: red'
      );
      return false
    }

    if (!is(objA[keysA[i]], objB[keysA[i]])) {
      console.log(
        `%c Object.is returned false for ${keysA[i]}`,
        'color: red'
      );
      return false;
    }
  }

  return true;
}
