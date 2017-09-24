import { combineReducers } from 'redux-immutable';
import notes from './Note/reducer';
import base from './App/reducer';

export default combineReducers({
  notes,
  base
});
