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
              <div className="nav_container">
                <div className="nav_item">
                  <img src={Logo} alt="logo" />
                </div>
                <a href="https://untappd.com/" target="_blank" className="nav_item">
                Powered by
                  <img src={untapptd} alt="Untapptd" />
                </a>
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
                {this.props.user.userId ? (
                  <a href="/auth/logout" className="nav_item">
                    Logout
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
