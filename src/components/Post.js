/*
 * Post.js - details of a single post
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { delPost, incPost, decPost, delCommentParent }  from '../actions'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments'
import formatTimestamp from './utils/formatTimestamp'
import * as PostsAPI from '../utils/PostsAPI'
import Comments from './Comments'
import PropTypes from 'prop-types'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  deletePost = (e) => { 
    const id = this.props.match.params.post_id
    this.props.posts
      .filter( (post) => post.id === id )[0]
      .comments.forEach( (comment) => this.props.removeCommentParent(comment) )

    PostsAPI.delPost(id).then( (ret) => this.props.removePost({ id }) )
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
	    { formatTimestamp(post.timestamp) }
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
	<Comments 
	  comments={post.comments.filter( (comment) => !comment.deleted )}
	  post_id={this.props.match.params.post_id} />
      </Container>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return {
             removePost: (data) => dispatch(delPost(data)),
	       likePost: (data) => dispatch(incPost(data)),
    removeCommentParent: (data) => dispatch(delCommentParent(data)),
	    dislikePost: (data) => dispatch(decPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Post)
