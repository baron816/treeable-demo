import { createStore } from 'redux';
import reducer from './rootReducer';

var devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

var store = createStore(reducer, devTools);

export default store;
