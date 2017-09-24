import { createSelector } from 'reselect';

function notes(state) {
  return state.getIn(['notes', 'notes']);
}

export var rootNotes = createSelector(
  notes,
  function (notes) {
    return notes.filter(function (note) {
      return note.get('parentId') === null;
    });
  }
);

var idProps = (_, {note}) => note.get('id');

export var childNotes = createSelector(
  [notes, idProps],
  function (notes, id) {
    return notes.filter(function (note) {
      return note.get('parentId') === id;
    });
  }
);

export function searchTerm(state) {
  return state.getIn(['base', 'searchTerm']);
}
