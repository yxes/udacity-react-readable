/*
 * Post.js - details of a single post
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { delPost, incPost, decPost }  from '../actions'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments'
import formatTimestamp from './utils/formatTimestamp'
import Comments from './Comments'
import PropTypes from 'prop-types'
import * as PostsAPI from '../utils/PostsAPI'
import PostNotFound from './PostNotFound'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = { post: { id: undefined } }

  // ensure we change id from undefined to '' in case PostNotFound
  initializePost = (post) => 
    this.setState({
      post: {
	...this.state.post,
        id: '',
	post
      }
    })

  componentDidMount() {
    const id = this.props.match.params.post_id

    if (! this.props.posts.length) {
      PostsAPI.fetchPost(id).then( post => this.initializePost(post) )
    }else{
      const post = this.props.posts.filter(
	post => post.id === id)[0]
      this.initializePost(post)
    }
  }

  render() {

    const { post } = this.state

    if (post === undefined || ! post.id) {
      return ( <PostNotFound post_id={post.id} /> )
    }

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
	    <Link to="/">
	      <Icon name="delete" size="large" title="delete post" bordered circular 
		onClick={() => this.props.removePost(post)} />
            </Link>
	  </Grid.Column>
	  <Grid.Column width={8} textAlign="right">
	    <Icon name="thumbs up" size="large" title="like" bordered circular
	      onClick={() => this.props.likePost(post.id)} color="blue"
	      style={{ cursor: 'pointer' }}/>
	    <Icon name="thumbs down" size="large" title="dislike" bordered circular
	      onClick={() => this.props.dislikePost(post.id)} color="blue"
	      style={{ cursor: 'pointer' }}/>
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
    dislikePost: (data) => dispatch(decPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Post)
