export function makeProps(selectors) {
  return function (state, ownProps) {
    return Object.keys(selectors).reduce(function (acc, key) {
      acc[key] = selectors[key](state, ownProps);
      return acc;
    }, {});
  }
}
