import React from 'react';
import { connect } from 'react-redux';
import AppComponent from './AppComponent';

import {
  updateSearchTerm
} from '../actions';

import {
  rootNotes,
  searchTerm
} from '../selectors';

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

function mapStateToProps(state) {
  return {
    rootNotes: rootNotes(state),
    searchTerm: searchTerm(state)
  }
}

export default connect(mapStateToProps, { updateSearchTerm })(App);
