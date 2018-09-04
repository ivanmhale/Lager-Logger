import React, { Component } from "react";
import Context from "../context/Context";
import ListGroupItem from "./ListGroupItem";

class Profile extends Component {
  componentDidMount() {
    fetch("/user/beers")
      .then(res => res.json())
      .then(beers => this.setState({ beers }));
  }

  state = {
    beers: []
  };

  renderHeader() {
    if (!this.props.user.name) {
      return "You must sign in first!";
    } else if (this.state.beers.length === 0) {
      return "List is empty. Go to the pub!";
    }
    return this.props.user.name + "'s saved beers";
  }

  renderBeersList() {
    if (this.state.beers.length === 0) return;
    return this.state.beers.map(beer => {
      let {
        bid,
        beer_name,
        beer_label,
        beer_description,
        beer_style,
        beer_abv,
        brewery_name
      } = beer.beer;
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
          rating={beer.rating}
          comments={beer.comments}
          mode="saved"
        />
      );
    });
  }

  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="profile">
              <h1 className="profile_header">{this.renderHeader()}</h1>
              <div id="list_group" className="list_group">
                {this.renderBeersList()}
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Profile;
