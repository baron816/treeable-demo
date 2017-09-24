import { fromJS, List } from 'immutable';
import faker from 'faker';
import * as actp from './actionTypes';

var initialState = fromJS({
    notes: [
        {
            id: 1,
            subject: 'first note',
            body: 'the body of the note',
            parentId: null
        },
        {
            id: 2,
            subject: 'subnote 1',
            body: 'the subnote body',
            parentId: 1
        },
        {
            id: 3,
            subject: 'subnote 2',
            body: faker.lorem.paragraph(6),
            parentId: 1
        },
        {
            id: 4,
            subject: 'second note',
            body: 'the body of the note',
            parentId: null
        },
        {
            id: 5,
            subject: 'subnote 3',
            body: 'Some body content',
            parentId: 4
        },
        {
            id: 6,
            subject: 'subnote 4',
            body: 'body of note',
            parentId: 4
        },
        {
            id: 7,
            subject: 'subsubnote 1',
            body: 'more body stuff',
            parentId: 2
        },
        {
            id: 8,
            subject: 'subsubnote 2',
            body: 'boenboneboneo',
            parentId: 2
        },
        {
            id: 9,
            subject: 'subsubsubnote 1',
            body: 'egobigenao',
            parentId: 8
        }
    ]
});

function createNote(state, {id, parentId = null}) {
    return state.updateIn(['notes'], function(notes){
        return notes.push(fromJS({
            id,
            parentId,
            subject: 'Place Holder',
            body: 'Body Place Holder'
        }));
    });
}

function removeNote(state, id) {
  var ids = getChildIds(state.get('notes'), id);
  return state.updateIn(['notes'], function(notes) {
    return notes.filterNot(function(note) {
      var noteId = note.get('id');
      return ids.includes(noteId) || noteId === id;
    });
  });
}

function getChildIds(notes, id, acc = List()) {
  notes.forEach(function(note) {
    if (note.get('parentId') === id) {
      var noteId = note.get('id');
      acc = getChildIds(notes, noteId, acc.push(noteId));
    }
  });

  return acc;
}

function changeNoteField(field) {
  return function (state, {id, newValue}) {
    return state.updateIn(['notes'], function(notes) {
      var index = notes.findIndex(note => note.get('id') === id);

      return notes.setIn([index, field], newValue);
    });
  }
}

var changeSubject = changeNoteField('subject');
var changeBody = changeNoteField('body');

export default function(state = initialState, {type, payload}) {
    switch (type) {
        case actp.CREATE_NOTE:
          return createNote(state, payload);
        case actp.REMOVE_NOTE:
          return removeNote(state, payload);
        case actp.CHANGE_SUBJECT:
          return changeSubject(state, payload);
        case actp.CHANGE_BODY:
          return changeBody(state, payload);
        default:
            return state;
    }
}
