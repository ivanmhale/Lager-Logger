import React from "react";
import Context from "./Context";

class Provider extends React.Component {
  state = {
    selectedBeer: {},
    beersList: null,
    modalType: null,
    modalData: null,
    snackbarMessage: null
  };
  render() {
    return (
      <Context.Provider
        value={{
          selectedBeer: this.state.selectedBeer,
          beersList: this.state.beersList,
          modalType: this.state.modalType,
          modalData: this.state.modalData,
          snackbarMessage: this.state.snackbarMessage,
          snackbar: text => {
            this.setState(
              {
                snackbarMessage: text
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    snackbarMessage: null
                  });
                }, 5000);
              }
            );
          },

          setUser: selectedBeer => {
            this.setState({ selectedBeer });
          },

          setBeersList: beersList => {
            this.setState({ beersList: beersList });
          },

          setModal: (type, data) => {
            this.setState({
              modalType: type,
              modalData: data
            });
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
