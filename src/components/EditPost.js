/*
 * EditPost.js - Form to create or change a post
 */

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, getPost, modPost } from '../actions'
import { Button, Container, Divider, Form, Header, Icon, Message } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments.js'
import PropTypes from 'prop-types'
import PostNotFound from './PostNotFound'


class NewPost extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired
  }

  state = {
    redirectToPost: false, // true once we submit the form
    post: {
      id: undefined,
      title: '',
      author: '',
      body: '',
      category: '',
    },
    touched: {
      title: false,
      body: false,
      category: false
    },
    form_error: false,
  }

  componentDidMount() {
    const { category, post_id } = this.props.match.params

    if (post_id) {
      if (! this.props.posts.length) { // page was reloaded
         this.props.fetchPost(post_id)
	   .then(post => this.initializePost(post))
      } else { // no need to bother with api call
	 const post = this.props.posts
	   .filter(post => post.id === post_id)[0]
	 this.initializePost(post)
      }

    // when creating a post you can select your category
    // however, if you are coming from a specific category that
    // category is selected by default
    } else if (category !== "Posts") {
      this.setState({
	post: {
	  ...this.state.post,
	  category
	}
      })
    }
  }

  // called in the event that we are editing a post (not creating a new one)
  initializePost(post) {
    if (post !== undefined && post.id) {
      this.setState({ 
	post: {
	  ...this.state.post,
	  id: post.id, 
	  title: post.title,
	  author: post.author, 
	  body: post.body, 
	  category: post.category
	}
      })
    }else{
      this.setState({ 
	post: { 
	  ...this.state.post, 
	  id: '' // indicates the id isn't found
	}
      })
    }
  }

  // to determine if a field was left empty (not initialized that way)
  touched = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    })
  }

  // Controlled Component: each change to the form keeps the state in sync
  updatePost = (e, {name, value}) => this.setState({ 
    post: { ...this.state.post, [name]: value },
    form_error: false
  })

  // modify or add a post - form was submitted
  addPost = (e) => {
    e.preventDefault()

    const { post } = this.state
    post.timestamp = Date.now()

    // required fields
    if (['title','body','category'].filter(field => post[field].length === 0)[0]) {
      this.setState({ form_error: true })
      return
    }

    // modify or add? 
    if (post.id !== undefined) {
      this.props.modifyPost(post)
	.then( () => this.setState({ redirectToPost: true }))
    } else {
      post.author = post.author.length ? post.author : 'anonymous'

      const new_post = this.props.createPost(post)
      this.setState({ post: new_post, redirectToPost: true })
    }

  }

  // error = the field was empty
  hasError = (field) => {
    return this.state.touched[field] && this.state.post[field].length === 0
  }

  options_category = this.props.categories.map( (category) => {
    return {
      key: category['name'],
      text: category['name']
	.charAt(0)
	.toUpperCase() + category['name']
	.slice(1),
      value: category['path']
    }
  })

  render() {
    const {post} = this.state

    // Post Not Found Error
    if ( this.props.match.params.post_id && !post.id) {
      const loading = (post.id === undefined) ? true : false
      return <PostNotFound loading={loading} />
    }

    // Submitted Form: keep link history in tact
    if (this.state.redirectToPost) {
      return <Redirect to={`/${post.category}/${post.id}`} />
    }

    return (
	<Container text>
	  <Link to="/"><Icon name="home" size="large" bordered circular/></Link>
	  <Divider />
	  <Header as='h2'>
	    {post.id ? 'Edit' : 'Add New'} Post
	  </Header>
	  <Form onSubmit={this.addPost} error={this.state.form_error}>
	    <Message
	      error
	      header='Submission Halted'
	      content="All required fields need to filled in before continuing" />
	    <Form.Group widths='equal'>

	      <Form.Input label="title" name='title' value={post.title} required
	        onBlur={this.touched('title')} error={this.hasError('title')}
	        placeholder="Title of Post" onChange={this.updatePost} />

	      <Form.Input label="author" name='author' value={post.author}
	        disabled={ post.id ? true : false }
	        placeholder="anonymous" onChange={this.updatePost} />

	      <Form.Select label="category" name='category' value={post.category} required
	        disabled={ post.id ? true : false } onBlur={this.touched('category')}
		error={this.hasError('category')} options={this.options_category} 
		placeholder="Select Category" onChange={this.updatePost}/>
		
	    </Form.Group>
	    <Form.TextArea label='post' rows='5' name='body' value={post.body} required
	      onBlur={this.touched('body')} 
	      error={this.hasError('body')}
	      onChange={this.updatePost} />
	    <Form.Group>  
	      <Form.Button labelPosition="left" icon="edit" primary
		content={(post.id ? 'Edit' : 'Add') + ' Post'} />
	      { Object.keys(this.state.touched).filter(key => this.state.touched[key])[0] ?
		  <Link to="/">
		    <Button content="Cancel" labelPosition="left" icon="cancel"/>
		  </Link> :
		  ""
	      }
	    </Form.Group>
	  </Form>
	</Container>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return {
     fetchPost: (data) => dispatch(getPost(data)),
    createPost: (data) => dispatch(addPost(data)),
    modifyPost: (data) => dispatch(modPost(data))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(NewPost)
