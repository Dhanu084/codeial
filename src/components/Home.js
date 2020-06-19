import React from "react";
import { PostsList, friendsList as Friends, Chat } from "./";

export default class Home extends React.Component {
  render() {
    const { posts } = this.props;
    const { isLoggedIn } = this.props;
    //console.log("home", this.props);
    return (
      <div className="home">
        {isLoggedIn && <PostsList posts={posts} />}
        {isLoggedIn && <Friends friends={this.props.friends} />}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}
