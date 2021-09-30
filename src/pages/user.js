import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const user = ({ match, data: { posts }, getUserData }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const id = match.params.id;

  useEffect(() => {
    if (loading) {
      getUserData(id);
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(({ data }) => setProfile(data))
        .then(setLoading(false));
    }
  }, [posts]);

  const recentPostsMarkup = posts ? (
    posts.map((post) => <Post key={post.id} post={post}></Post>)
  ) : posts === null ? (
    <p>No posts yet.</p>
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
          {profile && <StaticProfile profile={profile} />}
        </Grid>
      </Grid>
    </div>
  );
};

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
