import { combineReducers } from 'redux'

import {
  ADD_CATEGORY,

  ADD_POST,
  EDIT_POST,
  DEL_POST,

  ADD_COMMENT,
  EDIT_COMMENT,
  DEL_COMMENT,
  DEL_COMMENT_PARENT,

  INC_POST,
  DEC_POST,

  INC_COMMENT,
  DEC_COMMENT
} from '../actions'


function categories (state = [], action) {
  const { name, path } = action

  switch (action.type) {
    case ADD_CATEGORY:
      return state
	      .concat({ name, path })
	      .sort( (a, b) => a.name < b.name ? -1 : 1)
    default:
      return state
  }
}

function posts (state = {}, action) {
  const { id, title, body, author, category, timestamp, voteScore, deleted } = action

  switch (action.type) {
    case ADD_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          timestamp: timestamp === undefined ? Date.now() : timestamp,
	  title,
	  body,
	  author,
	  category,
	  voteScore: voteScore === undefined ? 1 : voteScore,
	  deleted: deleted === undefined ? false : deleted
	}
      }
    case EDIT_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
	  title,
	  body,
	  author,
	  category,
	}
      }
    case DEL_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          deleted: true
	}
      }
    case INC_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          voteScore: state[id]['voteScore'] + 1
	}
      }
    case DEC_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          voteScore: state[id]['voteScore'] - 1
	}
      }
    default:
      return state
  }
}

function comments (state = {}, action) {
  const { id, parentId, body, author, timestamp, voteScore, deleted, parentDeleted } = action

  switch (action.type) {
    case ADD_COMMENT:
      return {
	...state,
        [id]: {
	  ...state[id],
          parentId,
	  timestamp: timestamp === undefined ? Date.now() : timestamp,
	  body,
	  author,
	  voteScore: voteScore === undefined ? 1 : voteScore,
	  deleted: deleted === undefined ? false : deleted,
	  parentDeleted: parentDeleted === undefined ? false : parentDeleted
	}
      }
    case EDIT_COMMENT:
      return {
	...state,
        [id]: {
	  ...state[id],
	  body,
	  timestamp,
	  author
	}
      }
    case DEL_COMMENT:
      return {
	...state,
        [id]: {
	  ...state[id],
          deleted: true
	}
      }
    case DEL_COMMENT_PARENT:
      return {
	...state,
        [id]: {
	  ...state[id],
	  parentDeleted: true
	}
      }
    case INC_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id]['voteScore'] + 1
        }
      }
    case DEC_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id]['voteScore'] - 1
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})
