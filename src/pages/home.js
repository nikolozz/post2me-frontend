import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/Post';
import Profile from '../components/Profile';

const home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts?limit=25&offset=0`)
      .then((res) => res.json())
      .then((body) => setPosts(body));
  }, [posts.prop]);

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
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
};

export default home;
