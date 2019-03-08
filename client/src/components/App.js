import React, { Component } from "react";
import "../styles/index.css";
import Header from "./Header";
import Profile from "./Profile";
import List from "./List";
import ModalComponent from "./Modal";
import PopoverComponent from "./Popover";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  render() {
    return (
      <div className="app">
        <CssBaseline />
        <Header />
        <ModalComponent />
        <PopoverComponent />
        <div className="app_body">
          <Profile />
          <List />
        </div>
      </div>
    );
  }
}

export default App;
