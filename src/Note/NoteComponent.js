import React from 'react';
import PropTypes from 'prop-types';
import ChildNotes from './ChildNotes';

export default function NoteComponent({
  flipField,
  style,
  handleAddNote,
  handleRemoveNote,
  handleSubjectChange,
  changingSubject,
  changingBody,
  showAll,
  subject,
  body,
  childNotes,
  handleBodyChange
}) {

  return (
    <li>
      <div style={style} onClick={flipField('showAll', true)}>
        <button onClick={handleRemoveNote}>
          -
        </button>

        {changingSubject ?
          <input
           value={subject}
           onChange={handleSubjectChange}
           onBlur={flipField('changingSubject', false)}
           onClick={((e) => e.target.select())}
          /> :
          <span onClick={flipField('changingSubject', true)}>
            {subject}
          </span>
        }

        <button onClick={handleAddNote}>
          +
        </button>

        {showAll ?
          <span>
            <button onClick={flipField('showAll', false)}>
              X
            </button>
            {changingBody ?
              <span>
              <br />
                <form>
                  <textarea
                    value={body}
                    onChange={handleBodyChange}
                    onBlur={flipField('changingBody', false)}
                  />
                </form>
              </span>:
                <span>
                  <p onClick={flipField('changingBody', true)}>
                    {body}
                  </p>
                </span>
            }
          </span>:
          <span />
        }

      </div>

      <ChildNotes notes={childNotes} />
    </li>
  )
}

NoteComponent.propTypes = {
  style: PropTypes.object.isRequired,
  handleRemoveNote: PropTypes.func.isRequired,
  handleSubjectChange: PropTypes.func.isRequired,
  handleBodyChange: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
  flipField: PropTypes.func.isRequired,
  changingSubject: PropTypes.bool.isRequired,
  changingBody: PropTypes.bool.isRequired,
  showAll: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}
