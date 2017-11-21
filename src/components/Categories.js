/*
 * Categories.js - display a given list of categories and a possible
 *                 selected category
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'


class Categories extends Component {

  static propTypes = {
    myCategory: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
  }

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
      </div>
    )
  }

}

export default Categories
