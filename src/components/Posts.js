import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Divider, Icon, Button, Container, Header } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments'
import Categories from './Categories'
import PostItems from './PostItems'


class Posts extends Component {
  state = {
    sort: {
      key: 'rank',
      order: 'descending'
    }
  }

  sortBy = (e, key) => {
    this.setState({ 
      sort: {
	key, 
	order: this.state.sort.order === "ascending" ? "descending" : "ascending" 
      }
    })
  }

  all_posts = () => {
    const sort_key = this.state.sort.key
    const sort_order = this.state.sort.order

    return this.props.posts
      .filter( (post) => !post.deleted )
      .sort( (a, b) => sort_order === "ascending" ? 
	      a[sort_key] - b[sort_key] : b[sort_key] - a[sort_key] )
  }

  render() {
    const { categories } = this.props
    const myCategory = this.props.match.params.category || 'Posts'
    const sortIconName = 'sort numeric ' + this.state.sort.order

    return (
      <div>
        <Container className="categories">
          <Grid columns={3}>
            <Grid.Column width={4}>
	      <Categories categories={categories} myCategory={myCategory} />
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as='h2' textAlign='center'>
	        <Header.Content>{ myCategory.toUpperCase() }</Header.Content>
	      </Header>
	      <Divider />
	      <Grid columns={2}>
	        <Grid.Column width={8}>
	          <Button basic animated
		    onClick={ (e) => this.sortBy(e, 'timestamp') }>
		    <Button.Content title="sort posts by time" hidden><Icon name={ sortIconName }
		      color="teal"/></Button.Content>
	            <Button.Content visible>date</Button.Content>
	  	  </Button>
	        </Grid.Column>
	        <Grid.Column width={8} textAlign='right'>
	          <Button basic animated
		    onClick={ (e) => this.sortBy(e, 'voteScore') }>
		    <Button.Content title="sort posts by likes" hidden><Icon name={ sortIconName }
		      color="teal"/></Button.Content>
		    <Button.Content visible>rank</Button.Content>
		  </Button>
	        </Grid.Column>
	      </Grid>
	      <PostItems posts={ this.all_posts().filter( 
		post => myCategory === "Posts" ? true : post.category === myCategory )} />
           </Grid.Column>

	   <Grid.Column width={4}>
	     <Link to={`/post/new/${myCategory}`}>
	     <Button>
	       <Button.Content>
	         <Icon name="write" />
	         New Post
	       </Button.Content>
	     </Button>
	     </Link>
	   </Grid.Column>


         </Grid>
       </Container>
     </div>
    )
  }

}

export default connect(mapStateToProps)(Posts)
