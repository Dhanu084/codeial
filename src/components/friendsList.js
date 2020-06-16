import React from "react";
import { Link } from "react-router-dom";
import { friendslistItem as Friends } from "./";

export default function friendsList(props) {
  console.log("friendslist", props.friends);
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {!props.friends && <div className="no-friends">No friends found</div>}
      {props.friends &&
        props.friends.map((friend) => (
          <Friends friend={friend.to_user} key={friend._id} />
        ))}
      {props.friend}
    </div>
  );
}
