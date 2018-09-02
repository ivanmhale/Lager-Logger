import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

class App extends Component {
  render() {
    return (
      <div className="app">
        <a href="/auth/google">google</a>
        <a href="/auth/facebook">facebook</a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
