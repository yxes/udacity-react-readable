import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  DEL_POST,

  ADD_COMMENT,
  EDIT_COMMENT,
  DEL_COMMENT,

  INC_VOTE_SCORE,
  DEC_VOTE_SCORE
} from '../actions'


const initialPostState = {}
//  { id: null,
//    timestamp: null,
//    title: null,
//    body: null,
//    author: null,
//    category: null,
//    voteScore: 0,
//    deleted: false }

function posts (state = initialPostState, action) {
  const { id, timestamp, title, body, author, category, voteScore, deleted } = action

  switch (action.type) {
    case ADD_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          timestamp,
	  title,
	  body,
	  author,
	  category,
	  voteScore,
	  deleted
	}
      }
    case EDIT_POST:
      return {
	...state,
        [id]: {
	  ...state[id],
          timestamp,
	  title,
	  body,
	  author,
	  category,
	  voteScore,
	  deleted
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
    default:
      return state
  }
}


const initialCommentState = { }
//  {  id: null,
//    parentId: null,
//    timestamp: null,
//    body: null,
//    author: null,
//    voteScore: 0,
//    deleted: false,
//    parentDeleted: false }

function comments (state = initialCommentState, action) {
  const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action

  switch (action.type) {
    case ADD_COMMENT:
      return {
	...state,
        [id]: {
	  ...state[id],
          parentId,
	  timestamp,
	  body,
	  author,
	  voteScore,
	  deleted,
	  parentDeleted
	}
      }
    case EDIT_COMMENT:
      return {
	...state,
        [id]: {
	  ...state[id],
          parentId,
	  timestamp,
	  body,
	  author,
	  voteScore,
	  deleted,
	  parentDeleted
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
    default:
      return state
  }
}


const initialVoteScore = 0

function voteScore (state = initialVoteScore, action) {
  const { id } = action

  switch (action.type) {
    case INC_VOTE_SCORE:
      return {
	...state,
        [id]: {
	  ...state[id],
          voteScore: state[id][voteScore] + 1
	}
      }
    case DEC_VOTE_SCORE:
      return {
	...state,
        [id]: {
	  ...state[id],
          voteScore: state[id][voteScore] - 1
	}
      }
    default:
      return state
  }
}


export default combineReducers({
  posts,
  comments,
  voteScore
})
