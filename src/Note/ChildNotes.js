import React from 'react';
import PropTypes from 'prop-types';
import Note from './index';

export default function ChildNotes(props) {
  var { notes } = props;
  if (notes) {
    return (
      <ul>
        { notes.map(function(child) {
          return <Note note={child} key={child.get('id')} />
        })}
      </ul>
    )
  } else {
    return <span />;
  }
}

ChildNotes.propTypes = {
  notes: PropTypes.object.isRequired
}
