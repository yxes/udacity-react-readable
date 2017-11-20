

function mapStateToProps ({ categories, posts, comments }) {

  return {
    categories,
    posts: Object.keys(posts).map( (post_id) => (
      { ...posts[post_id],
        id: post_id,
        comments: Object.keys(comments)
          .map( (comment_id) => (
            {
              ...comments[comment_id],
              id: comment_id
            }
          ))
          .filter( (comment) => {
             return comment['parentId'] === post_id
          })
          .sort( (a, b) => b.voteScore - a.voteScore )
      }
    )).sort( (a, b) => b.voteScore - a.voteScore ),
  }

}

export default mapStateToProps
