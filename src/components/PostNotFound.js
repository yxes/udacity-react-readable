/*
 * PostNotFound - display loading or does not exist button
 *
 * requires 'loading' prop type (boolean)
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Dimmer, Loader, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class PostNotFound extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render () {
    return (
      <Container text>
        <br />
        <Segment raised textAlign='center'>
        { (this.props.loading) ?
            <span>
              <br /><br />
              <Dimmer inverted active>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </span>
            :
            <span>
              This Post Does Not Exist<br />
              <Link to="/">
                <Button positive>Return to Posts that DO exist</Button>
              </Link>
            </span>
        }
        </Segment>
      </Container>
    )
  }
}

export default PostNotFound
