import React from "react";
import Context from "../context/Context";
import Logo from "../assets/logo.png";
import untapptd from "../assets/untapptd.png";

class Header extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="header">
              <div className="logo_container">
                <div className="img_container"><img src={Logo} alt="logo"/></div>
                <div className="img_container"><img src={untapptd} alt="Untapptd"/></div>
              </div>
              <div className="nav_container">
                <a href="/profile">{window.location.pathname === "/" ? "Profile" : "Discover"}</a>
                <a href="/login">{this.props.user ? "Logout" : "Login"}</a>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Header;
