import React from "react";
import { PostsList, friendsList as Friends } from "./";

export default class Home extends React.Component {
  render() {
    const { posts } = this.props;
    console.log("home", this.props);
    return (
      <div className="home">
        <PostsList posts={posts} />
        <Friends friends={this.props.friends} />
      </div>
    );
  }
}
