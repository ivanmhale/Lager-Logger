import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Context from "../context/Context";

class SnackbarCompopnent extends Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={context.snackbarMessage}
              message={context.snackbarMessage}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}

export default SnackbarCompopnent;
