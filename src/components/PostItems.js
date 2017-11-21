/*
 * PostItems.js - list of posts
 *              - thumbs up / down
 *              - delete post
 *              - link to edit screen
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as PostsAPI from '../utils/PostsAPI'
import { connect } from 'react-redux'
import { incPost, decPost, delPost, delCommentParent } from '../actions'
import { Grid, Icon, Header } from 'semantic-ui-react'

import formatTimestamp from './utils/formatTimestamp'
import PropTypes from 'prop-types'


class PostItems extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  likePost = (e) => { 
    const id = e.target.id
    this.props.likePost({ id })
    PostsAPI.votePost(id, 'upVote')
  }

  dislikePost = (e) => { 
    const id = e.target.id
    this.props.dislikePost({ id }) 
    PostsAPI.votePost(id, 'downVote')
  }

  dumpPost = (e) => {
    e.preventDefault()

    const post_id = e.target.id

    this.props.posts
      .filter( (post) => post.id === post_id )[0]
      .comments.forEach( (comment) => {
	PostsAPI.delComment(comment.id).then( (ret) => {
	  this.props.removeCommentParent(comment)
	})
      })

    PostsAPI.delPost(e.target.id).then( (ret) => {
      this.props.removePost({ id: post_id })
    })
  }

  render() {
    const { posts } = this.props

    return (
      <div>
       {
	 posts.map( (post) => (
	   <div key={post.id} className="post">
	     <Grid columns={2}>
	       <Grid.Column width={8}>{ formatTimestamp(post.timestamp) }</Grid.Column>
	       <Grid.Column width={8} textAlign='right'>
		 rank { post.voteScore } &nbsp;
		 <Icon 
		   name="thumbs up" 
		   id={post.id}
		   style={{ cursor: 'pointer' }}
		   onClick={this.likePost}/> &nbsp;
		 <Icon
		   name="thumbs down"
		   id={post.id}
		   style={{ cursor: 'pointer' }}
		   onClick={this.dislikePost}/>
	       </Grid.Column>
	     </Grid>
	     <Header as='h3' textAlign='center'>
	       <Link key={post.id} to={`/${post.category}/${post.id}`}>
		 <Header.Content>{post.title}</Header.Content>
	       </Link>
	       <Header sub> ~~ { post.author }</Header>
	     </Header>
	     <p>{ post.body }</p>

	     <Grid columns={2}>
	       <Grid.Column width={8}>
		 <p>
		   <Link to={`/post/edit/${post.id}`} name={post.id}>
		     <Icon name="edit" />edit&nbsp;&nbsp;
		   </Link>
		   <Link to='' id={post.id} onClick={this.dumpPost}>
		     <Icon name="delete" />delete
		   </Link>
		 </p>
	       </Grid.Column>
	       <Grid.Column width={8}>
		 <p style={{ textAlign: "right" }}>
		   <Icon name={ 'comment' + (post.comments.length === 1 ? "" : "s") } />
		   { post.comments.length + ' comment' }
		   { post.comments.length !== 1 && "s" }
		 </p>
	       </Grid.Column>
	     </Grid>
	   </div>
	 ))
       }
     </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return {
               likePost: (data) => dispatch(incPost(data)),
            dislikePost: (data) => dispatch(decPost(data)),
    removeCommentParent: (data) => dispatch(delCommentParent(data)),
             removePost: (data) => dispatch(delPost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostItems)
