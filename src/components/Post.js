import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment, delComment, delCommentParent, 
	 delPost, incPost, decPost, editComment, incComment, decComment } from '../actions'
import { Button, Comment, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments.js'
import userImage from '../icons/user.svg'
import * as PostsAPI from '../utils/PostsAPI'


class Post extends Component {

  state = {
    comment: { // editing comment
      id: undefined,
      author: '',
      body: '',
    }
  }

  formatTimestamp(timestamp) {
    if (timestamp !== undefined) {
      var d = new Date(timestamp)
      return d.toUTCString().split(' ').splice(1,4).join(' ')
    }

    return ''
  }

  // just keeps the state in sync with the form
  updateComment = (e, {name, value}) =>
    this.setState({ comment: { ...this.state.comment, [name]: value } })

  // form submitted - either adding or editing
  addComment = (e) => {
    e.preventDefault()

    const comment = {
      ...this.state.comment,
      parentId: this.props.match.params.post_id,
      timestamp: Date.now()
    }

    if (comment.id !== undefined) {
      this.props.modifyComment(comment)
      PostsAPI.editComment(comment)
    } else {
      comment.id = require('uuid/v1')()
      this.props.createComment(comment)
      PostsAPI.newComment(comment)
    }

    // reset our state
    this.setState({ comment: { id: undefined, author: '', body: '' } })
  }

  // populates the form
  editComment = (e) => {
    const id = e.target.name

    const comment = this.props.posts
      .filter( (post) => post.id === this.props.match.params.post_id)[0]
      .comments.filter( (comment) => comment.id === id )[0]

    this.setState({ comment: { id, author: comment.author, body: comment.body } })
  }

  // delete comment
  dumpComment = (e) => {
    const id = e.target.name
    this.props.removeComment({ id })
    PostsAPI.delComment(id)
  }

  deletePost = (e) => { 
    const id = this.props.match.params.post_id
    this.props.posts
      .filter( (post) => post.id === id )[0]
      .comments.forEach( (comment) => this.props.removeCommentParent(comment) )

    this.props.removePost({ id })
    PostsAPI.delPost(id)
  } 

  likePost = (e) => { 
    e.preventDefault(); 
    const id = this.props.match.params.post_id
    this.props.likePost({ id })
    PostsAPI.votePost(id, 'upVote')
  }

  dislikePost = (e) => {
    e.preventDefault();
    const id = this.props.match.params.post_id
    this.props.dislikePost({ id }) 
    PostsAPI.votePost(id, 'downVote')
  }

  likeComment = (e) => {
    const id = e.target.name
    this.props.likeComment({ id })
    PostsAPI.voteComment( id, 'upVote' )
  }

  dislikeComment = (e) => {
    const id = e.target.name
    this.props.dislikeComment({ id })
    PostsAPI.voteComment( id, 'downVote' )
  }

  initialPost = {
    id: '',
    title: '',
    author: '',
    timestamp: '',
    voteScore: 1,
    body: '',
    comments: []
  }

  render() {

    // extract our post from props or initialize with a blank post
    const post = this.props.posts.filter( 
      (post) => !post.deleted && post.id === this.props.match.params.post_id
    )[0] || this.initialPost

    // for interacting with our form
    const {author, body} = this.state.comment

    const no_of_comments = post.comments.filter( (comment) => !comment.deleted).length

    return (
      <Container text>
        <Grid columns={2}>
	  <Grid.Column width={8}>
            <Link to="/">
	      <Icon name="home" size="large" title="home" bordered circular />
	    </Link>
	    <Link to={ "/post/edit/" + post.id }>
	      <Icon name="edit" size="large" title="edit post" bordered circular/>
	    </Link>
	    <Link to="/" onClick={this.deletePost}>
	      <Icon name="delete" size="large" title="delete post" bordered circular />
	    </Link>
	  </Grid.Column>
	  <Grid.Column width={8} textAlign="right">
	    <Link to="/" onClick={this.likePost}>
	      <Icon name="thumbs up" size="large" title="like" bordered circular/>
	    </Link>
	    <Link to="/" onClick={this.dislikePost}>
	      <Icon name="thumbs down" size="large" title="dislike" bordered circular/>
	    </Link>
	  </Grid.Column>
	</Grid>
        <Divider />
	<Grid columns={2}>
	  <Grid.Column width={8}>
	    { this.formatTimestamp(post.timestamp) }
	  </Grid.Column>
	  <Grid.Column width={8} textAlign='right'>
	    rank { post.voteScore }
	  </Grid.Column>
	</Grid>
	<Header as='h2' textAlign='center'>
	  <Header.Content>{ post.title }</Header.Content>
	  <Header sub> ~~ { post.author }</Header>
	</Header>
	<Container text className='post'>
	  { post.body }
	</Container>
	<Comment.Group>
	  <Header as='h3' dividing>
	    {no_of_comments}&nbsp;
	    Comment{ no_of_comments === 1 ? '' : 's'} 
	  </Header>
	  {
	    post.comments
	      .filter( (comment) => !comment.deleted )
	      .map( (comment) => (
	      <Comment key={comment.id}>
	        <Comment.Avatar src={userImage} />
	        <Comment.Content>
		  <Comment.Author as='a'>{comment.author}</Comment.Author>
		  <Comment.Metadata>
		    <div>{ this.formatTimestamp(comment.timestamp) }</div>
		    <div><Icon name='star' />{comment.voteScore} Faves</div>
		  </Comment.Metadata>
		  <Comment.Text>{ comment.body }</Comment.Text>
		  <Comment.Actions>
		    <Comment.Action name={comment.id} onClick={this.editComment}>
		      <Icon name="edit" />edit
		    </Comment.Action>
		    <Comment.Action name={comment.id} onClick={this.dumpComment}>
		      <Icon name="delete" />delete
		    </Comment.Action>
		    &nbsp;&nbsp;&nbsp;&nbsp;
		    &nbsp;&nbsp;&nbsp;&nbsp;
		    <Comment.Action name={comment.id} onClick={this.likeComment}>
		      <Icon name="thumbs up" />like
		    </Comment.Action>
		    <Comment.Action name={comment.id} onClick={this.dislikeComment}>
		      <Icon name="thumbs down" />dislike
		    </Comment.Action>
		  </Comment.Actions>
		</Comment.Content>
	        <Divider />
	      </Comment>
	    ))
	  }
	  
	  <Form reply onSubmit={this.addComment}>
	    <Form.Input name='author' label="author" value={author} placeholder="Your Name"
	      disabled={ this.state.comment.id ? true : false }
	      onChange={this.updateComment} />
	    <Form.TextArea name='body' label="new comment" value={body} rows='3'
	      onChange={this.updateComment}/>
	    <Button content="Add Reply" labelPosition="left" icon="edit" primary />
	  </Form>

	</Comment.Group>
      </Container>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return {
          createComment: (data) => dispatch(addComment(data)),
          modifyComment: (data) => dispatch(editComment(data)),
          removeComment: (data) => dispatch(delComment(data)),
    removeCommentParent: (data) => dispatch(delCommentParent(data)),
             removePost: (data) => dispatch(delPost(data)),
	       likePost: (data) => dispatch(incPost(data)),
	    dislikePost: (data) => dispatch(decPost(data)),
	    likeComment: (data) => dispatch(incComment(data)),
	 dislikeComment: (data) => dispatch(decComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Post)
