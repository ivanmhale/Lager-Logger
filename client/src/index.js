import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Provider from "./context/Provider";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Search from "./components/Search";

class App extends Component {
  componentDidMount() {
    fetch("/auth/user")
      .then(res => res.json())
      .then(parsed => this.setState({ user: parsed }));
  }

  state = {
    user: {}
  };

  render() {
    console.log(this.state.user);
    return (
      <Provider>
        <div className="app">
          <Header user={this.state.user} />
          <Search />
          {/* <Modal /> */}
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
