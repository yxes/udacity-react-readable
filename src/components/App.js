/*
 * App.js - loads the header for all pages
 *        - populates our props from the API
 */

import React, { Component } from 'react'
import logo from '../icons/logo.svg'
import bgImage from '../icons/books.jpg'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { initCategories, initPosts } from '../actions'
import { Image, Container, Header } from 'semantic-ui-react'
import Posts from './Posts'
import EditPost from './EditPost'
import Post from './Post'


class App extends Component {

  componentDidMount() {
    this.props.initializeCategories()
    this.props.initializePosts()
  }

  render() {
    return (
      <div>
        <Container className="app-header" style={{backgroundImage: `url(${bgImage})`}}>
	  <Link to="/">
            <Header as='h1' icon textAlign='center' title="return to main page">
              <Image src={logo} className="app-logo" alt="logo" />
              <Header.Content>Readable</Header.Content>
	      <Header sub>a udacity project</Header>
	    </Header>
	  </Link>
        </Container>

        <Switch>
          <Route exact path="/" component={Posts} />

	  <Route exact path="/:category" component={Posts} />
	  <Route exact path="/:category/:post_id" component={Post} />

          <Route path="/post/new/:category" component={EditPost} />
	  <Route path="/post/edit/:post_id" component={EditPost} />
        </Switch>
      </div>
    )
  }

}


function mapDispatchToProps (dispatch) {
  return {
    initializeCategories: () => dispatch(initCategories()),
         initializePosts: () => dispatch(initPosts()),
  }
}

export default connect(null, mapDispatchToProps, null, { pure: false })(App)
