import React, { PropTypes } from 'react';

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.slice_name}</li>
      )}
    </ul>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
