import React, { Component } from "react";
import Context from "../context/Context";
import ListGroupItem from "./ListGroupItem";

class Search extends Component {
  state = {
    term: ""
  };

  renderBeersList(list) {
    if (!list) return;
    return list.map(beer => {
      let {
        bid,
        beer_name,
        beer_label,
        beer_description,
        beer_style,
        beer_abv
      } = beer.beer;
      let brewery_name = beer.brewery.brewery_name;
      return (
        <ListGroupItem
          key={bid}
          bid={bid}
          beer_name={beer_name}
          beer_label={beer_label}
          beer_description={beer_description}
          beer_style={beer_style}
          beer_abv={beer_abv}
          brewery_name={brewery_name}
        />
      );
    });
  }

  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="search">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  fetch("/search/" + this.state.term)
                    .then(res => res.json())
                    .then(parsed => context.setBeersList(parsed));
                }}
              >
                <input
                  onChange={e => this.setState({ term: e.target.value })}
                  type="text"
                  placeholder="Search for a beer"
                />
                <button className="btn btn-aqua search_button" type="submit">
                  Go
                </button>
              </form>
              <div id="list_group" className="list_group">
                {this.renderBeersList(context.beersList)}
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Search;
