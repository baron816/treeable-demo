import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

import * as actp from './actionTypes';

export var createNote = createAction(actp.CREATE_NOTE, (parentId) => ({parentId, id: uuid()}));

export var removeNote = createAction(actp.REMOVE_NOTE, id => id);

var idAndValue = (id, newValue) => ({id, newValue});
export var changeSubject = createAction(actp.CHANGE_SUBJECT, idAndValue);
export var changeBody = createAction(actp.CHANGE_BODY, idAndValue);
