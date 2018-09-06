import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Provider from "./context/Provider";
import Context from "./context/Context";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Profile from "./components/Profile";

class App extends Component {
  componentDidMount() {
    fetch("/auth/user")
      .then(res => res.json())
      .then(parsed => this.setState({ user: parsed }));
  }

  state = {
    user: {}
  };

  renderBody() {
    switch (window.location.pathname) {
      case "/profile":
        return <Profile user={this.state.user} />;
      default:
        return <Search />;
    }
  }

  render() {
    return (
      <Provider>
        <Context.Consumer>
          {context => {
            return (
              <div className="app">
                <Header user={this.state.user} />
                {this.renderBody()}
                <Modal user={this.state.user} />
                <div id="snackbar" />
              </div>
            );
          }}
        </Context.Consumer>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
