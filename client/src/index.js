import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends Component {
  render(){
    return (
      <div className="app">
        <a href="/auth/google">Sign in with Google</a>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
