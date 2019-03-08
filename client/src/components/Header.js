import React, { useContext } from "react";
import Context from "../config/Context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const renderLogout = context => {
  if (context.state.user.userId) {
    return (
      <PowerSettingsNew
        onClick={() => {
          window.location.pathname = "/auth/logout";
        }}
        className="user_panel_toolbar_icon"
        style={{ fontSize: 40 }}
      />
    );
  }
};

const Header = () => {
  const context = useContext(Context);
  return (
    <AppBar className="header">
      <Toolbar className="toolbar">
        <h1>LagerLogger</h1>
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
          <AccountCircle
            onClick={() => context.toggleDrawer()}
            style={{ fontSize: 40 }}
          />
          {renderLogout(context)}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
