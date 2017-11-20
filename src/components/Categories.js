import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { List, Header } from 'semantic-ui-react'


class Categories extends Component {

  // unlink selected category (essentially highlighting it)
  renderCategory = (myCategory, category) => {
    return (myCategory === category.name) ?
      <List.Item icon='tag' content={category.name} /> :
      <Link to={`/${category.path}`}>
        <List.Item icon='tag' content={category.name} />
      </Link>
  }

  render() {
    const { myCategory, categories } = this.props

    return (
      <div>
	<Header as='h3' textAlign='left'>
	  <Header.Content>Categories</Header.Content>
	  <List>
	  { categories.map( (category) => (
	    <div key={category.name}>
	    { this.renderCategory(myCategory, category) }
	    </div>
	  ))}
	  </List>
	</Header>
	<p>
	  <i>click the rotating 'R' at any time to return to the main page</i>
	</p>
	<p>
	  <i>use the 'date' and 'rank' buttons to sort your posts</i>
	</p>
      </div>
    )
  }

}

export default Categories
