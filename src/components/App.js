import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import fetchPosts from "../actions/posts";

import {
  Navbar,
  Home,
  Page404,
  Login,
  Signup,
  Settings,
  userProfile,
} from "./index";
import * as jwtDecode from "jwt-decode";
import { authenticate_user } from "../actions/auth";
import { fetchFriends } from "../actions/friends";

const PrivateRoute = (props) => {
  const { component: Component, isLoggedIn, path } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      this.props.dispatch(
        authenticate_user({
          email: user.email,
          id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchFriends(user._id));
    }
  }

  render() {
    console.log("Props", this.props);
    const { posts } = this.props;
    const { friends } = this.props;
    const { isLoggedIn } = this.props.auth;
    console.log("Friends from APP", friends);
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            {/* Switch is used to display the first component that matches */}
            <Route
              exact
              path="/"
              render={(props) => {
                {
                  /*default props that contains info such as location,history. Passing this along with our posts */
                }
                return <Home {...props} posts={posts} friends={friends} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={isLoggedIn}
            />
            <PrivateRoute
              path="/user/:id"
              component={userProfile}
              isLoggedIn={isLoggedIn}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
