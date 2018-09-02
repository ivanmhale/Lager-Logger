import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="logo_container" />
      <div className="nav_container">
        <a href="/auth/google">Sign in with Google</a>
        <a href="/auth/facebook">Sign in with Facebook</a>
      </div>
    </div>
  );
};

export default Header;
