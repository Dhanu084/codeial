import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/profile";
import { addNewFriend, removeFriend } from "../actions/friends";
import { APIUrls } from "../helpers/urls";

export class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: "",
      error: "",
      successMessage: "",
    };
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch(fetchUserProfile(params.id));
  }

  checkIfUserisFriend = () => {
    const { friends } = this.props;

    if (friends == undefined) return false;
    const userId = this.props.profile.user;
    const index = friends
      .map((friend) => friend != undefined && friend.to_user._id)
      .indexOf(userId._id);
    console.log(index, "index");
    if (index == -1) {
      return false;
    }
    return true;
  };

  addFriend = async () => {
    const userId = this.props.profile.user;
    const url = APIUrls.addFriend(userId._id);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      this.setState({
        success: true,
        error: null,
        successMessage: "Friend Added Successfully",
      });
      this.props.dispatch(addNewFriend(data.data.friendship));
    } else {
      this.setState({
        success: "",
        error: data.message,
        successMessage: "",
      });
    }
  };

  removeFriend = async () => {
    const userId = this.props.profile.user._id;
    const url = APIUrls.removeFriend(userId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        error: null,
        successMessage: "Removed Friend Successfully",
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
        successMessage: "",
      });
    }
  };
  render() {
    const { user } = this.props.profile;
    const { inProgress } = this.props.profile;
    const isFriend = this.checkIfUserisFriend();
    console.log(isFriend);
    console.log("Props", this.props, this.state);
    if (inProgress) {
      return <h4>Loading !</h4>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="btn-grp">
          {isFriend ? (
            <button className="button save-btn" onClick={this.removeFriend}>
              Remove friend
            </button>
          ) : (
            <button className="button save-btn" onClick={this.addFriend}>
              add friend
            </button>
          )}
        </div>
        {this.state.success && (
          <div className="alert success-dailog">
            {this.state.successMessage}
          </div>
        )}
        {this.state.error && (
          <div className="alert error-dailog">{this.state.error}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    profile: state.profile,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(userProfile);
