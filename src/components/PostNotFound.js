import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Dimmer, Loader, Segment } from 'semantic-ui-react'

class PostNotFound extends Component {
  //   - post_id = undefined --> we haven't loaded a post yet
  //   - post_id = ''        --> the post doesn't exist
  render () {
    return (
      <Container text>
        <br />
        <Segment raised textAlign='center'>
        { (this.props.post_id === undefined) ?
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
