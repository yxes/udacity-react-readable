/*
 * CommentForm.js - edit / create new comment
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, editComment } from '../actions'
import { Button, Form  } from 'semantic-ui-react'
import * as PostsAPI from '../utils/PostsAPI'
import PropTypes from 'prop-types'


class CommentForm extends Component {
  static propTypes = {
    post_id: PropTypes.string.isRequired,
    comment: PropTypes.object
  }

  state = {
    comment: { // editing comment
      author: '',
      body: ''
    }
  }

  // just keeps the state in sync with the form
  updateComment = (e, {name, value}) =>
    this.setState({ 
      comment: { 
	...this.state.comment, 
        [name]: value 
      } 
    })

  // form submitted - either adding or editing
  addComment = (e) => {
    e.preventDefault()

    const comment = {
      ...this.state.comment,
      parentId: this.props.post_id,
      timestamp: Date.now()
    }

    if (this.state.comment.id !== undefined) { // edit comment
      comment.id = this.state.comment.id
      this.props.modifyComment(comment)
      PostsAPI.editComment(comment)
    } else {                                  // new comment
      comment.id = require('uuid/v1')()
      this.props.createComment(comment)
      PostsAPI.newComment(comment)
    }

    // reset our state
    this.setState({ comment: { author: '', body: '' } })
  }

  // initialize our state if we are editing a comment
  componentWillReceiveProps = (nextProps) => this.setState({ comment: nextProps.comment })

  render() {
    const { author, body }  = this.state.comment

    return (
      <Form reply onSubmit={this.addComment}>
	<Form.Input name='author' label="author" value={author} placeholder="Your Name"
	  disabled={ this.state.comment.id ? true : false }
	  onChange={this.updateComment} />
	<Form.TextArea name='body' label="new comment" value={body} rows='3'
	  onChange={this.updateComment}/>
	<Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return {
    createComment: (data) => dispatch(addComment(data)),
    modifyComment: (data) => dispatch(editComment(data)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
