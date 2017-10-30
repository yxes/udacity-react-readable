import React, { Component } from 'react'
import logo from '../icons/logo.svg'
import './App.css'
import * as PostsAPI from '../utils/PostsAPI'
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import CategoryIcon from 'react-icons/lib/fa/tag'


class App extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    PostsAPI.categories().then( (categories) => {
      this.setState({ categories })
    })

    PostsAPI.posts().then( (posts) => {
      posts.forEach( (post) => {
	this.props.createPost(post)
	PostsAPI.comments(post.id).then( (comments) => {
	  comments.forEach( (comment) => (
	    this.props.createComment(comment)
	  ))
	})
      })
    })

  }

  render() {
    const { categories } = this.state
    console.log('Props', this.props.posts)
    console.log('State', this.state)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Readable</h2>
	  <div className='categories'>
	  <h3>Categories</h3>
	  <p>
	    <ul>
	    { categories.map( (category) => (
	      <li key={category.name}><CategoryIcon size={15}/>{category.name}</li>
            ))}
	    </ul>
	  </p>
	  </div>
        </div>
	<div className="posts">
	<h2>POSTS</h2>
	{ 
	  this.props.posts.map( (post) => (
	    <div key={post.id} className="post">
	     <h3>{post.title}</h3> 
	     { post.voteScore }
	    </div> )
	  )
        }
      </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comments}) {
  return {
    posts: Object.keys(posts).map( (post_id) => (
      { ...posts[post_id], 
	id: post_id,
        comments: Object.keys(comments)
	  .map( (comment_id) => (
	    {
	      ...comments[comment_id],
	      id: comment_id
	    }
	  ))
          .filter( (comment) => {
	     return comment['parentId'] === post_id
          })
      }
    )),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(addPost(data)),
    createComment: (data) => dispatch(addComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);
