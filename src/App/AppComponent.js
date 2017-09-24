import React from 'react';
import PropTypes from 'prop-types';
import ChildNotes from '../Note/ChildNotes';

export default function AppComponent(props) {
  var { handleUpdateSearch, searchTerm, rootNotes } = props;
  return (
    <div>
      <input placeholder='Search'
        onChange={handleUpdateSearch}
        value={searchTerm}
      />

      <ChildNotes notes={rootNotes} />
    </div>
  );
}

AppComponent.propTypes = {
  rootNotes: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleUpdateSearch: PropTypes.func.isRequired
}
