import { fromJS } from 'immutable';

import reducer from './reducer';

import * as actions from './actions';

describe('Reducer', () => {
  var initialState = fromJS({
    notes: [
      {
        id: 1,
        subject: 'Node 1'
      },
      {
        id: 2,
        subject: 'Node 2'
      }
    ]
  });

  describe('#createNode', () => {
    it('adds a node', () => {

      var action = {
        type: "CREATE_NOTE",
        payload: {
          id: 3,
          parentId: 2
        }
      };

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        notes: [
          {
            id: 1,
            subject: 'Node 1'
          },
          {
            id: 2,
            subject: 'Node 2'
          },
          {
            id: 3,
            parentId: 2,
            subject: 'Place Holder',
            body: 'Body Place Holder'
          }
        ]
      }))
    });
  });

  describe('#changeName', () => {
    it('changes the subject of a node', () => {
      var action = actions.changeSubject(1, 'New Name Here');

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        notes: [
          {
            id: 1,
            subject: 'New Name Here'
          },
          {
            id: 2,
            subject: 'Node 2'
          }
        ]
      }))
    });
  });

  describe('#removeNode', () => {
    it("removes a node and its descendants", () => {
      var initialState = fromJS({
        notes: [
          {
            id: 1,
            subject: 'Node 1'
          },
          {
            id: 2,
            subject: 'Node 2'
          },
          {
            id: 3,
            subject: 'Node 3',
            parentId: 1
          },
          {
            id: 4,
            subject: 'Node 4',
            parentId: 1
          },
          {
            id: 5,
            subject: 'Node 5',
            parentId: 4
          },
          {
            id: 6,
            subject: 'Node 6',
            parentId: 5
          },
          {
            id: 7,
            subject: 'Node 7',
            parentId: 2
          }
        ]
      });

      var action = actions.removeNote(1);

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        notes: [
          {
            id: 2,
            subject: 'Node 2'
          },
          {
            id: 7,
            subject: 'Node 7',
            parentId: 2
          }
        ]
      }));
    });
  });
});
