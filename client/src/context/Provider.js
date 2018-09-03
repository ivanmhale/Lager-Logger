import React from "react";
import Context from "./Context";

class Provider extends React.Component {
  state = {
    selectedBeer: {},
    beersList: []
  };
  render() {
    return (
      <Context.Provider
        value={{
          selectedBeer: this.state.selectedBeer,
          beersList: this.state.beersList,

          setUser: selectedBeer => {
            this.setState({ selectedBeer });
          },

          setBeersList: beersList => {
            this.setState({ beersList });
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
