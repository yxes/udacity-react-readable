# Readable - udacity-react-readable
_Second project of the Udacity React Nanodegree_

## Mini-Blog

Uses React, Redux and Semantic-UI to create a tiny blog

## INSTALLATION

To start you will need to have a running copy of
[reactnd-project-readable-starter](https://github.com/udacity/reactnd-project-readable-starter)
to run alongside this so it has something to connect to.

- `npm install`
- `npm start`

### API Access

API commands are housed [PostsAPI.js](src/utils/PostsAPI.js)

### Redux

[Actions](src/actions/index.js)
[Reducers](src/reducers/index.js) 

### Code Reuse

Occasionally there arose issues where the same function would be needed in
multiple component libraries. I opted to house these in [utils](src/components/utils)
as I'm afraid I don't know what is cononical in these cases.

### URL Mapping

_all references are to components under the /src/components directory_

`/`

List of all posts and categories

Loads:
```
  App - main application
    Posts - all posts page
      Categories - list of categories
      PostItems - list of posts
```

`/:category`

Limit posts to a specific category

Loads:
```
  App - main application
    Posts - specific to given category
      Categories - list of categories
      PostItems - list of posts
```

`/:category/:post_id`

Details of a specific post

Loads:
```
  App - main application
    Post - post details
      Comments - display comments
        CommentForm - edit / create new comment
```

`/post/new/:category`

Select category from dropdown by default

Loads:
```
  App - main application
    EditPost - Add New Post
```

`/post/edit/:post_id`

Edit a given post

Loads:
```
  App - main application
    EditPost - Edit Post by post_id
```

## AUTHOR

Originally initialized using [create-react-app](https://github.com/facebookincubator/create-react-app)
functionality supplied by [Steve Wells](https://linkedin.com/in/sdwells)
