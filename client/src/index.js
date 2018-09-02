import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
      <div className="app">
        <Header></Header>
        <Search></Search>
        <Modal></Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
