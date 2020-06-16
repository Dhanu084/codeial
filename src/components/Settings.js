import React from "react";
import { connect } from "react-redux";
import { edit, clear_edit_state } from "../actions/editProfile";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      password: "",
      confirm_password: "",
      id: this.props.auth.user.id,
      editMode: false,
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clear_edit_state());
  }
  handleChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  editUser = () => {
    const { name, password, confirm_password, id } = this.state;
    this.props.dispatch(edit(name, password, confirm_password, id));
  };
  render() {
    const { user } = this.props.auth;
    const { editMode } = this.state;
    const { error } = this.props.edit;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        {error && <div className="error-dailog">{error}</div>}
        {error == false && (
          <div className="error success-dailog">successfully updated</div>
        )}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange("name", e.target.value)}
              placeholder={user.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange("password", e.target.value)}
              placeholder="password"
            />
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={(e) =>
                this.handleChange("confirm_password", e.target.value)
              }
              placeholder="confirm password"
              value={user.password}
            />
          </div>
        )}

        <div className="btn-group">
          {editMode ? (
            <button className="button save-btn" onClick={this.editUser}>
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={(e) => this.handleChange("editMode", true)}
            >
              Edit profile
            </button>
          )}
        </div>

        {editMode && (
          <div
            className="go-back"
            onClick={(e) => this.handleChange("editMode", false)}
          >
            Go back
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    edit: state.editProfile,
  };
}

export default connect(mapStateToProps)(Settings);
