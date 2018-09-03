import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Provider from "./context/Provider";
import Context from "./context/Context";

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
    user: null
  };

  render() {
    return (
      <Provider>
        <Context.Consumer>
          {context => {
            return (
              <div className="app">
                <Header user={this.state.user} />
                <Search />
                <Modal/>
              </div>
            );
          }}
        </Context.Consumer>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
