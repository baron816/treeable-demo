import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteComponent from './NoteComponent';
import './Note.css'

import {
  createNote,
  removeNote,
  changeSubject,
  changeBody
} from '../actions';

function Note(props) {
  var c = new React.Component(props);

  c.state = {
    changingSubject: false,
    changingBody: false,
    showAll: false
  }

  function flipField(field, bool) {
    return function(event) {
      event.stopPropagation();
      c.setState({[field]: bool});
    }
  }

  function computeMatchStyle() {
    var { note, term } = c.props;
    var subject = note.get('subject');
    var matchSubject = new RegExp(term, 'i', 'g').test(subject);

    return matchSubject && term.length ? {border: '1px solid coral'} : {}
  }

  function handleAddNote(event) {
    event.stopPropagation();
    var { createNote, note } = c.props;
    var id = note.get('id');

    createNote(id);
  }

  function handleRemoveNote(event) {
    event.stopPropagation();
    var { removeNote, note } = c.props
    var id = note.get('id');

    removeNote(id);
  }

  function handleSubjectChange({target: {value}}) {
    var { changeSubject, note } = c.props;
    var id = note.get('id');

    changeSubject(id, value);
  }

  function handleBodyChange({target: {value}}) {
    var { changeBody, note } = c.props;
    var id = note.get('id');

    changeBody(id, value)
  }

  c.render = function() {
    var { note, childNotes } = c.props;
    var { changingSubject, changingBody, showAll } = c.state;
    var style = computeMatchStyle();

    return (
      <NoteComponent
        style={style}
        subject={note.get('subject')}
        body={note.get('body')}
        childNotes={childNotes}
        handleAddNote={handleAddNote}
        handleRemoveNote={handleRemoveNote}
        handleSubjectChange={handleSubjectChange}
        handleBodyChange={handleBodyChange}
        flipField={flipField}
        changingSubject={changingSubject}
        changingBody={changingBody}
        showAll={showAll}
      />
    );
  }

  return c;
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  term: PropTypes.string.isRequired,
  removeNote: PropTypes.func.isRequired,
  changeSubject: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    childNotes: state.getIn(['notes', 'notes']).filter(function(note) {
      return note.get('parentId') === ownProps.note.get('id');
    }),
    term: state.getIn(['base', 'searchTerm'])
  };
}

export default connect(mapStateToProps, {
  createNote,
  removeNote,
  changeSubject,
  changeBody
})(Note);
