import { createAction } from 'redux-actions';

import * as actp from './actionTypes';

export var updateSearchTerm = createAction(actp.UPDATE_SEARCH_TERM, term => term);
