'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var diff = _interopDefault(require('deep-diff'));

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
babelHelpers;

var hasOwnProperty = Object.prototype.hasOwnProperty;

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
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : babelHelpers.typeof(objA)) !== 'object') {
    console.log('current value is a ' + (typeof objA === 'undefined' ? 'undefined' : babelHelpers.typeof(objA)) + ' and an object is required.');
    return false;
  }
  if (objA === null) {
    console.log('current value is null');
    return false;
  }
  if ((typeof objB === 'undefined' ? 'undefined' : babelHelpers.typeof(objB)) !== 'object') {
    console.log('next value is a ' + (typeof objB === 'undefined' ? 'undefined' : babelHelpers.typeof(objB)) + ' and an object is required.');
    return false;
  }
  if (objB === null) {
    console.log('Next value is null');
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    console.log('Object.keys().length mismatch between current and next value');
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i])) {
      console.log('Next value does not have key \'' + keysA[i] + '\'');
      return false;
    }

    if (!is(objA[keysA[i]], objB[keysA[i]])) {
      console.log('Object.is returned false for ' + keysA[i]);
      return false;
    }
  }

  return true;
}

var STATE_GROUP = 'state';
var PROPS_GROUP = 'props';

function shouldComponentUpdateDev(nextProps, nextState) {
  var shouldUpdateProps = !shallowEqual(this.props, nextProps);
  var shouldUpdateState = !shallowEqual(this.state, nextState);
  var shouldUpdate = shouldUpdateProps || shouldUpdateState;

  if (process.env.NODE_ENV !== 'development') return shouldUpdate;
  if (!shouldUpdate) return shouldUpdate;

  var displayName = this.constructor.name;

  console.group(displayName);
  console.group(PROPS_GROUP);
  console.log('shouldUpdateProps: ' + shouldUpdateProps);
  console.log('diff: ' + diff(this.props, nextProps));
  console.groupEnd(PROPS_GROUP);
  console.group(STATE_GROUP);
  console.log('shouldUpdateState: ' + shouldUpdateState);
  console.log('diff: ' + diff(this.state, nextState));
  console.groupEnd(STATE_GROUP);
  console.groupEnd(displayName);
  return shouldUpdate;
}

module.exports = shouldComponentUpdateDev;