import React from "react";
import Context from "../context/Context";

class Header extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="header">
              {this.props.user.name}
              <div className="logo_container" />
              <div className="nav_container">
                <a href="/auth/google">Sign in with Google</a>
                <a href="/auth/facebook">Sign in with Facebook</a>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Header;
