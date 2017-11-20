import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import * as PostsAPI from '../utils/PostsAPI'
import { connect } from 'react-redux'
import { incPost, decPost, delPost, delCommentParent } from '../actions'
import { Grid, Divider, List, Icon, Button, Container, Header } from 'semantic-ui-react'
import mapStateToProps from './utils/combinePostsComments.js'


class AllPosts extends Component {
  state = {
    sort: {
      key: 'rank',
      order: 'descending'
    }
  }

  formatTimestamp(timestamp) {
    var d = new Date(timestamp)
    return d.toUTCString().split(' ').splice(1,4).join(' ')
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

  // unlink selected category (essentially highlighting it)
  renderCategory = (myCategory, category) => {
    return (myCategory === category.name) ?
      <List.Item icon='tag' content={category.name} /> :
      <Link to={`/${category.path}`}>
        <List.Item icon='tag' content={category.name} />
      </Link>
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
    const { categories } = this.props

    const myCategory = this.props.match.params.category || 'Posts'

    const sortIconName = 'sort numeric ' + this.state.sort.order

    return (
      <div>
        <Container className="categories">
          <Grid columns={3}>
            <Grid.Column width={4}>
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
              {
	        this.all_posts()
		  .filter( post => myCategory === "Posts" ? true : post.category === myCategory )
		  .map( (post) => (
		    <div key={post.id} className="post">
		      <Grid columns={2}>
			<Grid.Column width={8}>{ this.formatTimestamp(post.timestamp) }</Grid.Column>
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

function mapDispatchToProps (dispatch) {
  return {
               likePost: (data) => dispatch(incPost(data)),
            dislikePost: (data) => dispatch(decPost(data)),
    removeCommentParent: (data) => dispatch(delCommentParent(data)),
             removePost: (data) => dispatch(delPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false })(AllPosts)
