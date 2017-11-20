import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, editPost } from '../actions'
import { Container, Divider, Form, Header, Icon } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments.js'
//import { uniqueId } from 'underscore'
import * as PostsAPI from '../utils/PostsAPI'


class NewPost extends Component {
  state = {
    redirectToPost: false,
    post: {
      id: undefined,
      title: '',
      author: '',
      body: '',
      category: '',
    }
  }

  componentDidMount() {
    // are we editing an existing post?
    if (this.props.match.params.post_id && this.props.posts.length) {
      const { id, title, body, author, category } = 
	this.props.posts.filter( 
	  (post) => post.id === this.props.match.params.post_id)[0]

      // note that the category of a specific post overrides the
      // category of the url
      if (id) {
        this.setState({ 
	  post: {
	    id,
	    title,
	    body,
	    author,
	    category
	  }
       	})
      }
    // when creating a post you can select your category
    // however, if you are coming from a specific category that
    // category is selected by default
    } else if (this.props.match.params.category) {
      this.setState({
	post: {
	  ...this.state.post,
	  category: this.props.match.params.category
	}
      })
    }
  }

  // each change to the form keeps the state in sync
  updatePost = (e, {name, value}) => this.setState({ 
    post: { ...this.state.post, [name]: value }
  })

  // modify or add a post - form was submitted
  addPost = (e) => {
    e.preventDefault()

    const {post} = this.state

    if (post.id !== undefined) { // modifying a post
      this.props.modifyPost(post)
      PostsAPI.editPost(post).then(this.setState({ redirectToPost: true }))
    } else {                     // adding a post
      post.id = require('uuid/v1')()
      post.timestamp = Date.now()
      post.voteScore = 1 // the API call initializes to 1 - this keeps props in sync

      this.setState({ post })

      this.props.createPost(post)
      PostsAPI.newPost(post).then(this.setState({ redirectToPost: true }))
    }

  }

  render() {
    const options_category = this.props.categories.map( (category) => {
	    return {
	      key: category['name'],
	      text: category['name'].charAt(0).toUpperCase() + category['name'].slice(1),
	      value: category['path']
	    }
    })

    const {id, title, author, category, body} = this.state.post

    if (this.state.redirectToPost) {
      return (
	<Redirect to={`/${category}/${id}`} />
      )
    }

    return (
	<Container text>
	  <Link to="/"><Icon name="home" size="large" bordered circular/></Link>
	  <Divider />
	  <Header as='h2'>
	    {(this.state.post.id ? 'Edit' : 'Add New')} Post
	  </Header>
	  <Form onSubmit={this.addPost}>
	    <Form.Group widths='equal'>
	      <Form.Input label="title" name='title' value={title} 
	        placeholder="Title of Post" onChange={this.updatePost} />
	      <Form.Input label="author" name='author' value={author}
	        disabled={ this.state.post.id ? true : false }
	        placeholder="Your Name" onChange={this.updatePost} />
	      <Form.Select label="category" name='category' value={category}
	        disabled={ this.state.post.id ? true : false }
	        options={options_category} placeholder="Category" onChange={this.updatePost}/>
	    </Form.Group>
	    <Form.TextArea label='post' rows='5' name='body' value={body}
	      onChange={this.updatePost} />
	    <Form.Button content={(this.state.post.id ? 'Edit' : 'Add') + ' Post'} />
	  </Form>
	</Container>
    )
  }

}


function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(addPost(data)),
    modifyPost: (data) => dispatch(editPost(data))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps, 
  null, 
  { pure: false })(NewPost)
