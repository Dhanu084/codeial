import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/profile";

export class userProfile extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch(fetchUserProfile(params.id));
  }
  render() {
    const { user } = this.props.profile;
    const { inProgress } = this.props.profile;
    console.log("Props", this.props);
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
          <button className="button save-btn">add friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(userProfile);
