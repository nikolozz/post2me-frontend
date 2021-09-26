import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/Post';

export class home extends Component {
  constructor() {
    super();
    this.state = {
      posts: null,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/posts?limit=25&offset=0`)
      .then((res) => res.json())
      .then((body) => this.setState({ posts: body }));
  }

  render() {
    const { posts } = this.state;
    const recentPostsMarkup = posts ? (
      posts.map((post) => <Post key={post.id} post={post}></Post>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <p>Profile</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default home;
