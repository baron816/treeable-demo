import React from 'react';
import { connect } from 'react-redux';
import AppComponent from './AppComponent';

import { makePropsFromActions, makePropsFromSelectors } from '../propHelper';

function App(props) {
  var { rootNotes, updateSearchTerm } = props;
  return (
    <AppComponent
      rootNotes={rootNotes}
      handleUpdateSearch={handleUpdateSearch}
    />
  );

  function handleUpdateSearch({target: {value}}) {
    updateSearchTerm(value);
  }
}

var mapStateToProps = makePropsFromSelectors(['rootNotes', 'searchTerm']);
var mapDispatchToProps = makePropsFromActions(['updateSearchTerm']);

export default connect(mapStateToProps, mapDispatchToProps)(App);
