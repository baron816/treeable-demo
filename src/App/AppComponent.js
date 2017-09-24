import React from 'react';
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
