/*
 * Comments.js - display list of comments for a given post
 *             - call comment form at the end
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delComment, delCommentParent, incComment, decComment } from '../actions'
import { Comment, Divider, Header, Icon } from 'semantic-ui-react'
import userImage from '../icons/user.svg'
import * as PostsAPI from '../utils/PostsAPI'
import CommentForm from './CommentForm'
import formatTimestamp from './utils/formatTimestamp'
import PropTypes from 'prop-types'


class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    post_id: PropTypes.string.isRequired
  }

  state = {
    comment: {
      id: undefined,
      author: '',
      body: ''
    }
  }

  formatTimestamp = (timestamp) => {
    if (timestamp !== undefined) {
      var d = new Date(timestamp)
      return d.toUTCString().split(' ').splice(1,4).join(' ')
    }

    return ''
  }

  // populates the form
  editComment = (e) => {
    const id = e.target.name

    const comment = this.props.comments
      .filter( (comment) => comment.id === id )[0]

    this.setState({ comment })
  }

  // delete comment
  dumpComment = (e) => {
    const id = e.target.name
    this.props.removeComment({ id })
    PostsAPI.delComment(id)
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

  render() {

    const { comments } = this.props

    const no_of_comments = comments.filter( (comment) => !comment.deleted).length

    return (
      <Comment.Group>
	<Header as='h3' dividing>
	  {no_of_comments}&nbsp;
	  Comment{ no_of_comments === 1 ? '' : 's'} 
	</Header>
	{
	  comments
	    .filter( (comment) => !comment.deleted )
	    .map( (comment) => (
	      <Comment key={comment.id}>
		<Comment.Avatar src={userImage} />
		<Comment.Content>
		  <Comment.Author as='a'>{comment.author}</Comment.Author>
		  <Comment.Metadata>
		    <div>{ formatTimestamp(comment.timestamp) }</div>
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

	<CommentForm comment={this.state.comment} post_id={this.props.post_id} />

      </Comment.Group>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return {
          removeComment: (data) => dispatch(delComment(data)),
    removeCommentParent: (data) => dispatch(delCommentParent(data)),
	    likeComment: (data) => dispatch(incComment(data)),
	 dislikeComment: (data) => dispatch(decComment(data))
  }
}

export default connect(null, mapDispatchToProps)(Comments)
