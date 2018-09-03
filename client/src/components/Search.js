import React, { Component } from "react";
import Context from "../context/Context";

class Search extends Component {
  state = {
    term: ""
  };
  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="search">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  context.setBeersList(this.state.term);
                }}
              >
                <input
                  onChange={e => this.setState({ term: e.target.value })}
                  type="text"
                  placeholder="Search for a beer"
                />
                <button className="btn search_button" type="submit">
                  Go
                </button>
              </form>
              <div className="list_group">{context.beersList}</div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Search;
