import React from "react";
import Context from "./Context";
import axios from "axios";

export default class Provider extends React.Component {
  state = {
    beerList: null,
    selectedBeer: null,
    savedBeer: {},
    user: {},
    loading: true,
    popover: {
      anchorEl: null,
      text: ""
    },
    openDrawer: false,
    newUserMode: false,
    saving: false,
    editing: false
  };

  componentDidMount = async () => {
    const res = await fetch("/search/hutton smith");
    const parsed = await res.json();
    this.setState({ beerList: parsed }, () => {
      this.setState({ loading: false });
    });

    const userRes = await fetch("/auth/user");
    const parsedUSer = await userRes.json();
    this.setState(
      {
        user: parsedUSer
      },
      () => {
        this.setUserBeers(this.state.user.userId);
      }
    );

    if (window.location.href.indexOf("/profile") > -1) {
      this.setState({ openDrawer: true });
    }
  };

  setUserBeers = async userId => {
    let res = await axios.get("user/beers", userId);
    this.setState({
      user: {
        ...this.state.user,
        beers: res.data
      }
    });
  };
  setErrorMessage = message => {
    document.getElementById("message_signin").innerHTML = message;
  };
  render() {
    console.log(this.state);
    return (
      <Context.Provider
        value={{
          state: this.state,
          setSelectedBeer: selectedBeer => {
            this.setState({ loading: true }, () => {
              this.setState({ selectedBeer }, () => {
                this.setState({ loading: false });
              });
            });
          },
          loginLocal: async userData => {
            const res = await axios.post("/auth/init", userData);
            if (res.data.message) {
              return this.setErrorMessage(res.data.message);
            }
            this.setState({ user: res.data }, () => {
              this.setUserBeers(res.data.userId);
            });
          },
          loginOauth: async type => {
            const res = await axios.get("/auth/type");
            console.log(res);
            this.setState({ user: res.data }, () => {
              this.setUserBeers(res.data.userId);
            });
          },
          toggleDrawer: () =>
            this.setState({ openDrawer: !this.state.openDrawer }),
          search: async term => {
            this.setState({ loading: true });
            const res = await fetch("/search/" + term);
            const parsed = await res.json();
            this.setState({ beerList: parsed }, () => {
              this.setState({ loading: false });
            });
          },
          setPopover: (anchorEl, text) => {
            this.setState({ popover: { anchorEl, text } });
          },
          toggleNewUserMode: () => {
            this.setState({ newUserMode: !this.state.newUserMode });
          },
          setErrorMessage: message => this.setErrorMessage(message),
          newUser: async userObj => {
            const res = await axios.post("/auth/signup", userObj);
            if (res.data.message) {
              return this.setErrorMessage(res.data.message);
            }
            const userData = await axios.post("/auth/login", userObj);
            console.log(userData);
            this.setState({ user: userData.data });
          },
          setSaving: arg => {
            this.setState({ saving: !this.state.saving });
          },
          saveBeer: async dataObj => {
            axios.post("/user/beers", dataObj);
            this.setState({
              user: {
                ...this.state.user,
                beers: [...this.state.user.beers, dataObj]
              },
              selectedBeer: null,
              saving: false
            });
          },
          removeBeer: async data => {
            axios.delete("/user/beers", { data });
            setTimeout(() => {
              window.location.pathname = "/profile";
            }, 500);
          },
          viewSavedBeer: savedBeer => this.setState({ savedBeer }),
          toggleEditBeer: () => this.setState({ editing: !this.state.editing }),
          saveChanges: async reqObj => {
            await axios.patch("/user/beers", reqObj);
            window.location.pathname = "/profile";
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
