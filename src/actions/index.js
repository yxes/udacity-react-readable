import * as PostsAPI from '../utils/PostsAPI'

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

export const initPosts = () => dispatch => (
  PostsAPI
    .posts()
    .then(posts => 
      posts.forEach(post => {
	dispatch(newPost(post))
	PostsAPI // populate comments for each post
	  .comments(post.id)
	  .then(comments =>
	    comments.forEach(comment =>
	      dispatch(newComment(comment))
	    )
	  )
      })
    )
)

export const initCategories = () => dispatch => (
  PostsAPI
    .categories()
    .then( (categories) => {
      categories.forEach( (category) => {
	dispatch(newCategory(category))
      })
    })
)

export const addPost = (post) => dispatch => {
  post = {
    ...post,
    id: require('uuid/v1')(),
    voteScore: 1 // API defaults to 1
  }

  PostsAPI
    .newPost(post)
    .then(() => dispatch(newPost(post)))

  return post
}

export const modPost = (post) => dispatch => (
  PostsAPI
    .editPost(post)
    .then(() => dispatch(editPost(post)))
)

export const delPost = (post) => dispatch => (
  PostsAPI
    .delPost(post.id)
    .then(() => {
      post
	.comments.forEach(comment => (
	  dispatch(rmCommentParent(comment.id))
	))
      dispatch(rmPost(post.id))
    })
)

export const incPost = ( id ) => dispatch => (
  PostsAPI
    .votePost(id, 'upVote')
    .then(() => dispatch(posPost(id)))
)

export const decPost = ( id ) => dispatch => (
  PostsAPI
    .votePost(id, 'downVote')
    .then(() => dispatch(negPost(id)))
)

export const addComment = (comment) => dispatch => {
  comment = {
    ...comment,
    id: require('uuid/v1')(),
    voteScore: 1 // API defaults to 1
  }

  PostsAPI
    .newComment(comment)
    .then(() => dispatch(newComment(comment)))
}

export const modComment = (comment) => dispatch => (
  PostsAPI
    .editComment(comment)
    .then(() => dispatch(editComment(comment)))
)

export const delComment = (id) => dispatch => (
  PostsAPI
    .delComment(id)
    .then(() => dispatch(rmComment(id)))
)

export const incComment = (id) => dispatch => (
  PostsAPI
    .voteComment(id, 'upVote')
    .then(() => dispatch(posComment(id)))
)

export const decComment = (id) => dispatch => (
  PostsAPI
    .voteComment(id, 'downVote')
    .then(() => dispatch(negComment(id)))
)

/* Functions for Updating Redux */

export const newCategory = ({ name, path }) => ({
  type: ADD_CATEGORY,
  name,
  path
})

export const newPost = ( { id, title, body, author, category, timestamp, voteScore, deleted }) => ({
    type: ADD_POST,
    id,
    timestamp: timestamp === undefined ? Date.now() : timestamp,
    title,
    body,
    author,
    category,
    voteScore: voteScore === undefined ? 0 : voteScore,
    deleted: deleted === undefined ? false : deleted
})

export const editPost = ( { id, title, body, author, category }) => ({
    type: EDIT_POST,
    id,
    title,
    body,
    author,
    category
})

export const rmPost = (id) => ({
    type: DEL_POST,
    id
})

export const posPost = (id) => ({
  type: INC_POST,
  id
})

export const negPost = (id) => ({
  type: DEC_POST,
  id
})

export const newComment = ( { id, parentId, body, author, timestamp, voteScore, parentDeleted, deleted }) => ({
  type: ADD_COMMENT,
  id,
  parentId,
  timestamp: timestamp === undefined ? Date.now() : timestamp,
  body,
  author,
  voteScore: voteScore === undefined ? 0 : voteScore,
  parentDeleted: parentDeleted === undefined ? false : parentDeleted,
  deleted: deleted === undefined ? false : deleted
})

export const editComment = ( { id, timestamp, body, author }) => ({
    type: EDIT_COMMENT,
    id,
    timestamp,
    body,
    author
})

export const rmComment = (id) => ({
  type: DEL_COMMENT,
  id
})

export const rmCommentParent = (id) => ({
  type: DEL_COMMENT_PARENT,
  id
})

export const posComment = (id) => ({
  type: INC_COMMENT,
  id
})

export const negComment = (id) => ({
  type: DEC_COMMENT,
  id
})

