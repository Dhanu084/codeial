import React from "react";
import { Link } from "react-router-dom";
import friendslistItem from "./";

export default function friendsList(props) {
  console.log("friendslist", props);
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {!props.friends && <div className="no-friends">No friends found</div>}
      {props.friends && props.friends.map((friend) => {})}
      {props.friend}
    </div>
  );
}
