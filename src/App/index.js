import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppComponent from './AppComponent';

import { makePropsFromActions, makePropsFromSelectors } from '../propHelper';

function App(props) {
  var { rootNotes, updateSearchTerm, searchTerm } = props;
  return (
    <AppComponent
      rootNotes={rootNotes}
      searchTerm={searchTerm}
      handleUpdateSearch={handleUpdateSearch}
    />
  );

  function handleUpdateSearch({target: {value}}) {
    updateSearchTerm(value);
  }
}

App.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired
}

var mapStateToProps = makePropsFromSelectors(['rootNotes', 'searchTerm']);
var mapDispatchToProps = makePropsFromActions(['updateSearchTerm']);

export default connect(mapStateToProps, mapDispatchToProps)(App);
