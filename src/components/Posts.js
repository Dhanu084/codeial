import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Comments } from "./";
import { createNewComment } from "../actions/posts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNewlike } from "../actions/posts";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleKeyPress = (e, post_id) => {
    if (e.key == "Enter") {
      //console.log(this.props);
      this.props.dispatch(createNewComment(this.state.comment, post_id));
    }
  };

  handleLike = () => {
    const { post, user } = this.props;
    // console.log(post._id, user.id);
    if (!post.likes.includes(user.id))
      this.props.dispatch(addNewlike(post._id, "Post", user.id));
  };
  render() {
    const { post, user } = this.props;
    const isLikedByUser = post.likes.includes(user.id);
    console.log(isLikedByUser);
    return (
      <div>
        <div className="post-wrapper" key={post._id}>
          <div className="post-header">
            <div className="post-avatar">
              <Link to={`/user/${post.user._id}`} post={post}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
              </Link>
              <div>
                <span className="post-author">{post.user.name}</span>
                <span className="post-time">a minute ago</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button className="post-like no-btn" onClick={this.handleLike}>
                {isLikedByUser ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                    alt="likes-icon"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                )}

                <span>{post.likes.length}</span>
              </button>

              <div className="post-comments-icon">
                <img
                  src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className="post-comment-box">
              <input
                placeholder="Start typing a comment"
                onChange={this.handleChange}
                onKeyPress={(e) => this.handleKeyPress(e, post._id)}
              />
            </div>

            <div className="post-comments-list">
              {post.comments.map((comment) => (
                <Comments
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Posts);
