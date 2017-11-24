// Format: (presorted with deleted removed)
//   categories: [ { name, path }, ... ]
//   posts: [ { 
//     id, title, author, ..., comments: [ { id, body, ... } ]
//   } ]
const mapStateToProps = ({ categories, posts, comments }) => ({
  categories,
  posts: Object.keys(posts)
    .filter(post_id => !posts[post_id].deleted)
    .map(post_id => ({
      ...posts[post_id],
      id: post_id,
      comments: Object.keys(comments)
	.filter(comment_id => 
	  !comments[comment_id].deleted &&
	  comments[comment_id].parentId === post_id)
	.map(comment_id => ({
	  ...comments[comment_id],
	  id: comment_id
	}))
	.sort((a, b) => b.voteScore - a.voteScore)
    }))
    .sort((a, b) => b.voteScore - a.voteScore)
})

export default mapStateToProps
