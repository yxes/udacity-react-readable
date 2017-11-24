/*
 * CommentForm.js - edit / create new comment
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, modComment} from '../actions'
import { Button, Form, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'


class CommentForm extends Component {
  static propTypes = {
    post_id: PropTypes.string.isRequired,
    comment: PropTypes.object
  }

  state = {
    comment: { // editing comment
      id: undefined,
      author: '',
      body: ''
    },
    touched: {
      author: false,
      body: false
    },
    form_error: false
  }

  resetCommentForm = () => {
    this.setState({ 
      comment: { id: undefined, author: '', body: '' },
      touched: { author: false, body: false } 
    })
  }

  // just keeps the state in sync with the form
  updateComment = (e, {name, value}) =>
    this.setState({ 
      comment: { 
	...this.state.comment, 
        [name]: value 
      },
      form_error: false
    })

  // form submitted - either adding or editing
  addComment = (e) => {
    e.preventDefault()

    const comment = {
      ...this.state.comment,
      parentId: this.props.post_id,
      timestamp: Date.now()
    }

    // required fields
    if (['author','body'].filter(field => comment[field].length === 0)[0]) {
      this.setState({ form_error: true })
      return    
    }

    // modify or add comment
    if (comment.id !== undefined) {
      this.props.modifyComment(comment)
    } else {
      this.props.createComment(comment)
    }

    this.resetCommentForm()
  }

  // initialize our state if we are editing a comment
  componentWillReceiveProps = (nextProps) => this.setState({ comment: nextProps.comment })

  touched = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    })
  }

  hasError = (field) => {
    return this.state.touched[field] && this.state.comment[field].length === 0
  }

  render() {
    const { author, body }  = this.state.comment

    return (
      <Form reply onSubmit={this.addComment} error={this.state.form_error}>
        <Message
	  error
	  header="Submission Halted"
	  content="All required fields need to be filled in before continuing..." />
	<Form.Input name='author' label="author" value={author} placeholder="Your Name"
	  onBlur={this.touched('author')} error={this.hasError('author')}
	  disabled={ this.state.comment.id ? true : false } required
	  onChange={this.updateComment} />
	<Form.TextArea name='body' label="comment" value={body} rows='3'
	  onBlur={this.touched('body')} error={this.hasError('body')}
	  onChange={this.updateComment} required/>
	<Button content="Add Reply" labelPosition="left" icon="edit" primary />
	{ Object.keys(this.state.touched).filter(key => this.state.touched[key])[0] ?
	    <Button content="Cancel" labelPosition="left" icon="cancel" 
	      onClick={this.resetCommentForm} /> :
	    "" 
	}

      </Form>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createComment: (data) => dispatch(addComment(data)),
    modifyComment: (data) => dispatch(modComment(data)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
