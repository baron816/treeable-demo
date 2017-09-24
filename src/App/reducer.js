import { fromJS } from 'immutable';
import * as actp from './actionTypes';

const initialState = fromJS({
  searchTerm: ''
});

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case actp.UPDATE_SEARCH_TERM:
      return state.set('searchTerm', payload);
    default:
      return state;
  }
}
