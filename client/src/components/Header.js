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
                <div className="img_container">
                  <img src={Logo} alt="logo" />
                </div>
                <div className="img_container">
                  <img src={untapptd} alt="Untapptd" />
                </div>
              </div>
              <div className="nav_container">
                <a
                  href={
                    window.location.pathname === "/profile"
                      ? "/discover"
                      : "/profile"
                  }
                  className="nav_item"
                >
                  {window.location.pathname === "/profile"
                    ? "Discover"
                    : "Profile"}
                </a>
                {this.props.user.name ? (
                  <a href="/auth/logout" className="nav_item">
                    {this.props.user ? "Logout" : "Login"}
                  </a>
                ) : (
                  <div
                    onClick={() => context.setModal("login", {})}
                    className="nav_item"
                  >
                    Login
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Header;
