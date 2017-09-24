import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppComponent from './AppComponent';

import {
  updateSearchTerm
} from '../actions';

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

function mapStateToProps(state) {
  return {
    rootNotes: state.getIn(['notes', 'notes']).filter(function(note) {
      return note.get('parentId') === null;
    }),
    searchTerm: state.getIn(['base', 'searchTerm'])
  }
}

export default connect(mapStateToProps, { updateSearchTerm })(App);
