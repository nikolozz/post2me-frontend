import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { loadingPosts } from '../redux/actions/dataActions';

const home = ({ data: { posts }, loadingPosts }) => {
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

home.propTypes = {
  data: PropTypes.object.isRequired,
  loadingPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  loadingPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
