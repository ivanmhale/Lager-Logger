import React, { useContext } from "react";
import Context from "../config/Context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import Attribution from "../assets/attribution.jpg";

const renderLogout = context => {
  if (context.state.user._id) {
    return (
      <PowerSettingsNew
        onClick={() => {
          window.location.pathname = "/auth/logout";
        }}
        id="logout"
        className="user_panel_toolbar_icon"
        style={{ fontSize: 40 }}
      />
    );
  }
};

const Header = () => {
  const context = useContext(Context);

  const user = context.state.user || null;
  let userPhoto;
  if (user.photo && user.photo.indexOf("platform-lookaside") > -1) {
    userPhoto = `https://graph.facebook.com/${user.userId}/picture?type=large`;
  } else if (user.photo) {
    userPhoto = user.photo;
  }
  console.log(user);
  return (
    <AppBar className="header">
      <Toolbar className="toolbar">
        <div className="logo">
          <h1>LagerLogger</h1>
          <div className="logo_container">
            <img src={Attribution} alt="Powered by UNTAPPD" />
          </div>
        </div>
        {
          !context.state.loading && (
              <div className="toolbar_tools">
                <div className="search_container">
                  <div className="search">
                    <div className="search_icon">
                      <SearchIcon style={{ fontSize: 25 }} />
                    </div>
                    <form
                        onSubmit={e => {
                          e.preventDefault();
                          context.search(document.getElementById("input").value);
                        }}
                    >
                      <InputBase
                          inputProps={{
                            placeholder: "Find a beer"
                          }}
                          onClick={() => {
                            document
                                .getElementsByClassName("search")[0]
                                .classList.add("grow");
                          }}
                          id="input"
                          className="search_inputbase"
                      />
                    </form>
                  </div>
                </div>
                {user._id ? (
                    <button className="avatar" onClick={() => context.toggleDrawer()}>
                      <img src={userPhoto} alt={user.name} />
                    </button>
                ) : (
                    <AccountCircle
                        className="account_circle"
                        onClick={() => context.toggleDrawer()}
                        style={{ fontSize: 40 }}
                    />
                )}
                {renderLogout(context)}
              </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Header;
