import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createPost as CreatePost } from "./";
import { Posts } from "./";

export default class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Posts post={post} key={post._id} />
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};
