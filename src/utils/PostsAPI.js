const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'myapp'
}

export const categories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const postsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const posts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const newPost = (postId, timestamp, title, body, author, category) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId, timestamp, title, body, author, category })
  }).then(data => data.status)

export const fetchPost = (postId) => 
  fetch(`${api}/posts/${postId}`, { headers })
  .then(res => res.json())

// direction = 'upVote' or 'downVote'
export const vote = (postId, direction) => 
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ direction })
  }).then(res => res.json())

export const editPost = (postId, title, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())

export const delPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }}).then(res => res.json())

export const comments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const newComment = (id, timestamp, body, author, postId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, body, author, postId })
  }).then(data => data.status)

export const fetchComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())

export const delComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(data => data.status)

