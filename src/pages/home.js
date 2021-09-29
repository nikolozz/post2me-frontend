import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { loadingPosts } from '../redux/actions/dataActions';

const home = ({ loadingPosts, posts }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      loadingPosts();
      setLoading(false);
    }
  }, [posts]);

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

const mapStateToProps = (state) => ({
  posts: state.data.posts,
  loading: state.data.loading,
});

const mapActionsToProps = {
  loadingPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
