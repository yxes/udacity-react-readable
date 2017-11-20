
export const ADD_CATEGORY = 'ADD_CATEGORY'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DEL_POST = 'DEL_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'
export const DEL_COMMENT_PARENT = 'DEL_COMMENT_PARENT'

export const DEC_POST = 'DEC_POST'
export const INC_POST = 'INC_POST'

export const DEC_COMMENT = 'DEC_COMMENT'
export const INC_COMMENT = 'INC_COMMENT'

export function addCategory ( { name, path }) {
  return {
    type: ADD_CATEGORY,
    name,
    path
  }
}

export function addPost ( { id, title, body, author, category, timestamp, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp: timestamp === undefined ? Date.now() : timestamp,
    title,
    body,
    author,
    category,
    voteScore: voteScore === undefined ? 0 : voteScore,
    deleted: deleted === undefined ? false : deleted
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

export function incPost( { id } ) {
  return {
    type: INC_POST,
    id
  }
}

export function decPost( { id } ) {
  return {
    type: DEC_POST,
    id
  }
}

export function addComment( { id, parentId, body, author, timestamp, voteScore, parentDeleted, deleted }) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp: timestamp === undefined ? Date.now() : timestamp,
    body,
    author,
    voteScore: voteScore === undefined ? 0 : voteScore,
    parentDeleted: parentDeleted === undefined ? false : parentDeleted,
    deleted: deleted === undefined ? false : deleted
  }
}

export function editComment( { id, timestamp, body, author }) {
  
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
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

export function delCommentParent( { id } ) {
  return {
    type: DEL_COMMENT_PARENT,
    id
  }
}

export function incComment( { id } ) {
  return {
    type: INC_COMMENT,
    id
  }
}

export function decComment( { id } ) {
  return {
    type: DEC_COMMENT,
    id
  }
}

