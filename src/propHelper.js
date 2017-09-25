import * as selectors from './selectors';
import * as actions from './actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

export function makeProps(selectors) {
  return function (state, ownProps) {
    return Object.keys(selectors).reduce(function (acc, key) {
      acc[key] = selectors[key](state, ownProps);
      return acc;
    }, {});
  };
}

function pick(obj, list) {
  return list.reduce(function (acc, curr) {
    var val = obj[curr];

    if (val === undefined) {
      throw Error('Key does not exist: ' + curr);
    } else {
      acc[curr] = val;
      return acc;
    }
  }, {});
}

function curry(fn) {
  var arity = fn.length;

  return (function resolve(...prevArgs) {
      return function (...newArgs) {
        var currArgs = [...prevArgs, ...newArgs];

        if (arity - currArgs.length <= 0) {
          return fn(...currArgs);
        } else {
          return resolve(...currArgs)
        }
      };
  }());
}

var picks = curry(pick);
var pickSelectors = picks(selectors);

export var makePropsFromActions = picks(actions);
export var makePropsFromSelectors = compose(makeProps, pickSelectors);

export function enhancedConnect(selectorList, actionList) {
  return function (component) {
    var mapStateToProps = selectorList.length ? makePropsFromSelectors(selectorList) : () => ({});
    var mapDispatchToProps = actionList.length ? makePropsFromActions(actionList) : undefined

    return connect(mapStateToProps, mapDispatchToProps)(component);
  }
}
