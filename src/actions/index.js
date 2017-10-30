export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DEL_POST = 'DEL_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'

export const INC_VOTE_SCORE = 'INC_VOTE_SCORE'
export const DEC_VOTE_SCORE = 'DEC_VOTE_SCORE'

export function addPost ( { id, timestamp, title, body, author, category, voteScore }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted: false
  }
}

export function editPost( { id, title, body, author, category }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
    author,
    category
  }
}

export function delPost( { id }) {
  return {
    type: DEL_POST,
    id
  }
}

export function addComment( { parent_id, body, author }) {
  return {
    type: ADD_COMMENT,
    parentId: parent_id,
    body: body,
    author: author
  }
}

export function editComment( { id, parent_id, body, author }) {
  return {
    type: EDIT_COMMENT,
    id,
    parentId: parent_id,
    body,
    author
  }
}

export function delComment( { id } ) {
  return {
    type: DEL_COMMENT,
    id
  }
}

export function incVoteScore( { id } ) {
  return {
    type: INC_VOTE_SCORE,
    id
  }
}

export function decVoteScore( { id } ) {
  return {
    type: DEC_VOTE_SCORE,
    id
  }
}

