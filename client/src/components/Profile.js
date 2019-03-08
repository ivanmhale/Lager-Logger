import React from "react";
import Context from "../config/Context";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import user_placeholder from "../assets/user_placeholder.jpg";

class Profile extends React.Component {
  renderLogin = context => {
    return (
      <div className="user_panel">
        <h1>Login or create a new profile.</h1>
        <hr />
        <div className="buttons">
          <Button
            onClick={() => (window.location.pathname = "/auth/facebook")}
            variant="outlined"
            className="btn btn_login btn_login-fb"
          >
            Continue with Facebook
          </Button>
          <Button
            onClick={() => (window.location.pathname = "/auth/google")}
            variant="outlined"
            className="btn btn_login btn_login-google"
          >
            Continue with Google
          </Button>
        </div>
        <div className="form">
          <TextField
            id="username"
            variant="outlined"
            label="username"
            onChange={() => context.setErrorMessage("")}
          />
          <TextField
            id="password"
            variant="outlined"
            type="password"
            label="password"
            onChange={() => context.setErrorMessage("")}
          />
          {context.state.newUserMode ? (
            <TextField
              id="confirmPassword"
              variant="outlined"
              type="password"
              label="confirm password"
              onChange={() => context.setErrorMessage("")}
            />
          ) : (
            ""
          )}
          <Button
            onClick={() => {
              if (context.state.newUserMode) {
                if (document.getElementById("username").value.length < 6) {
                  return context.setErrorMessage(
                    "Username should be at least 6 characters."
                  );
                } else if (
                  document.getElementById("password").value.length < 6
                ) {
                  return context.setErrorMessage(
                    "Password should be at least 6 characters."
                  );
                } else if (
                  document.getElementById("password").value !==
                  document.getElementById("confirmPassword").value
                ) {
                  return context.setErrorMessage("Passwords do not match.");
                }
                return context.newUser({
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value
                });
              }
              // BLOCK BELOW SHOULD ONLY EXECUTE WHEN !CONTEXT.STATE.NEWUSERMODE
              context.loginLocal({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
              });
              //END BLOCK
            }}
            variant="outlined"
            className="btn btn_submit"
          >
            {context.state.newUserMode ? "sign up" : "sign in"}
          </Button>
          <p id="message_signin" />
        </div>
        <br />
        <hr />
        <Button
          onClick={() => context.toggleNewUserMode()}
          className="btn btn_signup"
          variant="outlined"
        >
          {context.state.newUserMode ? "I'm already a user" : "I am a new user"}
        </Button>
      </div>
    );
  };

  renderUser = context => {
    const user = context.state.user;
    return (
      <div className="user_panel">
        <div className="user_panel_info">
          <h2>{user.name}</h2>
          <div className="img_container">
            <img src={user.img ? user.img : user_placeholder} alt={user.name} />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="user_panel_beers">{this.renderBeersList(context)}</div>
      </div>
    );
  };

  renderBeersList(context) {
    if (!context.state.user.beers) {
      return <h3>Your log is empty, go to the pub!</h3>;
    }
    return (
      <Table className="table">
        <TableBody className="table_body">
          {context.state.user.beers.map(beerListItem => {
            return (
              <TableRow
                onClick={() => context.viewSavedBeer(beerListItem)}
                hover
                className="table_row"
                key={beerListItem.bid}
              >
                <TableCell className="table_cell table_cell-img">
                  <img
                    src={beerListItem.beer.beer_label}
                    alt={beerListItem.beer.beer_name}
                  />
                </TableCell>
                <TableCell className="table_cell">
                  <div className="rating">
                    <p>rating</p>
                    <p className="rating_num">{beerListItem.rating}</p>
                  </div>
                </TableCell>
                <TableCell className="table_cell">
                  <p className="name">{beerListItem.beer.beer_name}</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="profile">
              <Drawer
                className="profile_drawer"
                variant="temporary"
                anchor="left"
                open={context.state.openDrawer}
                onClose={() => context.toggleDrawer()}
              >
                {context.state.user.userId
                  ? this.renderUser(context)
                  : this.renderLogin(context)}
              </Drawer>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Profile;
