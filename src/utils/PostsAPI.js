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

export const newPost = ({ id, timestamp, title, body, author, category }) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, title, body, author, category })
  }).then(data => data.status)

export const fetchPost = (id) => 
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())

// option = 'upVote' or 'downVote'
export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { option } )
  }).then(res => res.json())

export const editPost = ({ id, title, body }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => console.log(res) ) //res.json())

export const delPost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }}).then(res => res.json())

export const comments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const newComment = ({ id, timestamp, body, author, parentId }) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, body, author, parentId })
  }).then(data => data.status)

export const editComment = ({ id, timestamp, body }) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  }).then(data => data.status)

export const fetchComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

// option = 'upVote' or 'downVote'
export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { option } )
  }).then(res => res.json())

export const delComment = (id) =>
  fetch(`${api}/comments/${id}`, { 
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }}).then(data => data.status)

