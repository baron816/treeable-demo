import React from 'react';
import PropTypes from 'prop-types';
import AppComponent from './AppComponent';

import { enhancedConnect } from '../propHelper';

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

var mapStateToProps = ['rootNotes', 'searchTerm'];
var mapDispatchToProps = ['updateSearchTerm'];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(App);
