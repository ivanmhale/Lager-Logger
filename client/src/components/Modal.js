import React, { Component } from "react";
import Context from "../context/Context";
import axios from "axios";
import untapptd from "../assets/untapptd.png";

class Modal extends Component {
  state = {
    rating: 5,
    comments: "",
    username: "",
    password: "",
    confirm: ""
  };
  renderHeader(context) {
    switch (context.modalType) {
      case "nav":
        return (
          <div className="modal_header">
            <span className="modal_header_text">
              {this.props.user.userId
                ? "Welcome " + this.props.user.name
                : "Not signed in."}
            </span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );
      case "login":
        return (
          <div className="modal_header">
            <span className="modal_header_text">Login</span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      case "newUser":
        return (
          <div className="modal_header">
            <span className="modal_header_text">New User</span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      case "beer":
        return (
          <div className="modal_header">
            <span className="modal_header_text">
              {context.modalData.props.beer_name}
            </span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      case "saved":
        return (
          <div className="modal_header">
            <span className="modal_header_text">
              {context.modalData.props.beer_name}
            </span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      case "saving":
        return (
          <div className="modal_header">
            <span className="modal_header_text">
              {context.modalData.props.beer_name}
            </span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      case "edit":
        return (
          <div className="modal_header">
            <span className="modal_header_text">
              {context.modalData.props.beer_name}
            </span>
            <span
              onClick={() => context.setModal(null, null)}
              className="modal_header_close"
            >
              &times;
            </span>
          </div>
        );

      default:
        return;
    }
  }
  renderBody(context) {
    switch (context.modalType) {
      case "nav":
        return (
          <div className="modal_body_nav">



            <a
              href="https://untappd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="modal_body_nav_item"
            >
              Untapptd API
            </a>



            <a
              href={
                window.location.pathname === "/profile"
                  ? "/discover"
                  : "/profile"
              }
              className="modal_body_nav_item"
            >
              {window.location.pathname === "/profile" ? "Discover" : "Profile"}
            </a>



            {this.props.user.userId ? (
              <a href="/auth/logout" className="modal_body_nav_item">
                Logout
              </a>
            ) : (
              <div
                onClick={() => context.setModal("login", {})}
                className="modal_body_nav_item"
              >
                Login
              </div>
            )}




          </div>
        );
      case "login":
        return (
          <div className="modal_body">
            <div className="modal_body_login">
              <div className="modal_body_login_social">
                <a
                  className="modal_body_login_social_link facebook"
                  href="/auth/facebook"
                >
                  <span>
                    <i className="fab fa-google" />
                  </span>
                  <span>|</span>
                  <span>Sign in with Facebook</span>
                </a>
                <a
                  className="modal_body_login_social_link google"
                  href="/auth/google"
                >
                  <span>
                    <i className="fab fa-facebook-f" />
                  </span>
                  <span>|</span>
                  <span>Sign in with Google</span>
                </a>
              </div>
              <div className="modal_body_login_form">
                <div className="modal_body_login_form_group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={e => {
                      this.setState({ username: e.target.value });
                    }}
                  />
                </div>
                <div className="modal_body_login_form_group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="modal_body_login_button">
                <button
                  onClick={() => {
                    axios
                      .post("/auth/init", {
                        username: this.state.username,
                        password: this.state.password
                      })
                      .then(res => {
                        if (res.data.message) {
                          return context.snackbar(res.data.message);
                        }
                        window.location.pathname = "/profile";
                      });
                  }}
                  className="btn btn-pink"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        );

      case "newUser":
        return (
          <div className="modal_body">
            <div className="modal_body_login">
              <div className="modal_body_login_social">
                <a
                  className="modal_body_login_social_link facebook"
                  href="/auth/facebook"
                >
                  <span>
                    <i className="fab fa-google" />
                  </span>
                  <span>|</span>
                  <span>Sign in with Facebook</span>
                </a>
                <a
                  className="modal_body_login_social_link google"
                  href="/auth/google"
                >
                  <span>
                    <i className="fab fa-facebook-f" />
                  </span>
                  <span>|</span>
                  <span>Sign in with Google</span>
                </a>
              </div>
              <div className="modal_body_login_form">
                <div className="modal_body_login_form_group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={e => {
                      this.setState({ username: e.target.value });
                    }}
                  />
                </div>
                <div className="modal_body_login_form_group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>
                <div className="modal_body_login_form_group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    onChange={e => {
                      this.setState({ confirm: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "beer":
        return (
          <div className="modal_body_beer">
            <div className="modal_body_beer_image">
              <img
                src={context.modalData.props.beer_label}
                alt={context.modalData.props.beer_name}
              />
            </div>
            <div className="modal_body_beer_desc">
              <span className="modal_body_beer_desc_brewery_name">
                <span className="modal_body_beer_desc_head">Brewed By: </span>
                {context.modalData.props.brewery_name}
              </span>
              <span className="modal_body_beer_desc_style">
                <span className="modal_body_beer_desc_head">Style: </span>
                {context.modalData.props.beer_style}
              </span>
              <span className="modal_body_beer_desc_abv">
                <span className="modal_body_beer_desc_head">ABV: </span>
                {context.modalData.props.beer_abv}
              </span>
              <span className="modal_body_beer_desc_description">
                {context.modalData.props.beer_description}
              </span>
            </div>
          </div>
        );

      case "saved":
        return (
          <div className="modal_body_beer">
            <div className="modal_body_beer_image">
              <img
                src={context.modalData.props.beer_label}
                alt={context.modalData.props.beer_name}
              />
            </div>
            <div className="modal_body_beer_desc">
              <span className="modal_body_beer_desc_brewery_name">
                <span className="modal_body_beer_desc_head">Brewed By: </span>
                {context.modalData.props.brewery_name}
              </span>
              <span className="modal_body_beer_desc_style">
                <span className="modal_body_beer_desc_head">Style: </span>
                {context.modalData.props.beer_style}
              </span>
              <span className="modal_body_beer_desc_abv">
                <span className="modal_body_beer_desc_head">ABV: </span>
                {context.modalData.props.beer_abv}
              </span>

              <span className="modal_body_beer_desc_rating_container">
                <span className="modal_body_beer_desc_head">Your Rating: </span>
                {context.modalData.props.rating}
              </span>

              <span className="modal_body_beer_desc_rating_container">
                <span className="modal_body_beer_desc_head">
                  Your Comments:{" "}
                </span>
                {context.modalData.props.comments}
              </span>

              <span className="modal_body_beer_desc_description">
                {context.modalData.props.beer_description}
              </span>
            </div>
          </div>
        );

      case "saving":
        return (
          <div className="modal_body_saving">
            <div className="modal_body_saving_group range">
              <label>Leave a rating: </label>
              <div className="input_and_rating">
                <input
                  onChange={e => this.setState({ rating: e.target.value })}
                  type="range"
                  min="0"
                  max="5"
                />
                <div className="rating">
                  <div className="rating_number">{this.state.rating}</div>
                </div>
              </div>
            </div>

            <div className="modal_body_saving_group comments">
              <label>Leave a comment/note:</label>
              <input
                onChange={e => this.setState({ comments: e.target.value })}
                type="text"
                placeholder={
                  "What are your toughts on " +
                  context.modalData.props.beer_name +
                  "?"
                }
              />
            </div>
          </div>
        );

      case "edit":
        return (
          <div className="modal_body_saving">
            <div className="modal_body_saving_group range">
              <div className="change_rating">
                <label>Change your rating: </label>
                <i>{context.modalData.props.rating}</i>
              </div>
              <div className="input_and_rating">
                <input
                  onChange={e => this.setState({ rating: e.target.value })}
                  type="range"
                  min="0"
                  max="5"
                />
                <div className="rating">
                  <div className="rating_number">{this.state.rating}</div>
                </div>
              </div>
            </div>

            <div className="modal_body_saving_group comments">
              <label>Change your comment/note:</label>
              <input
                onChange={e => this.setState({ comments: e.target.value })}
                type="text"
                placeholder={context.modalData.props.comments}
              />
            </div>
          </div>
        );
      default:
        return;
    }
  }

  renderFooter(context) {
    switch (context.modalType) {
      case "login":
        return (
          <div className="modal_footer">
            <button
              onClick={() => context.setModal("newUser", null)}
              className="btn btn-lime"
            >
              New User?
            </button>
          </div>
        );

      case "newUser":
        return (
          <div className="modal_footer_saving">
            <button
              onClick={() => {
                context.setModal("login", null);
              }}
              className="btn btn-pink"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (this.state.username.length < 6) {
                  return context.snackbar("Username too short");
                } else if (this.state.password.length < 6) {
                  return context.snackbar("Password too short");
                } else if (this.state.password !== this.state.confirm) {
                  return context.snackbar("Passwords don't match");
                }
                axios
                  .post("/auth/signup", {
                    username: this.state.username,
                    password: this.state.password
                  })
                  .then(res => {
                    if (res.data.message) {
                      return context.snackbar(res.data.message);
                    }
                    axios
                      .post("/auth/login", {
                        username: this.state.username,
                        password: this.state.password
                      })
                      .then(() => (window.location.pathname = "/profile"));
                  });
              }}
              className="btn btn-lime"
            >
              Submit
            </button>
          </div>
        );

      case "beer":
        return (
          <div className="modal_footer_beer">
            <button
              onClick={() => context.setModal("saving", context.modalData)}
              className="btn btn-aqua"
            >
              Save beer
            </button>
          </div>
        );

      case "saved":
        return (
          <div className="modal_footer_saving">
            <button
              onClick={() => {
                axios.delete("/user/beers", {
                  data: {
                    userId: this.props.user.userId,
                    bid: context.modalData.props.bid
                  }
                });
                window.location.href = "/profile";
              }}
              className="btn btn-pink"
            >
              Remove
            </button>
            <button
              onClick={() => context.setModal("edit", context.modalData)}
              className="btn btn-lime"
            >
              Edit
            </button>
          </div>
        );

      case "saving":
        return (
          <div className="modal_footer_saving">
            <button
              onClick={() => {
                context.setModal("beer", context.modalData);
              }}
              className="btn btn-pink"
            >
              Back
            </button>
            <button
              onClick={() => {
                let beer = context.modalData.props;
                if (!this.props.user.userId) {
                  return context.snackbar("You must be signed in.");
                }
                axios.post("/user/beers", {
                  userId: this.props.user.userId,
                  bid: beer.bid,
                  beer,
                  rating: this.state.rating,
                  comments: this.state.comments
                });
                context.setModal(null, null);
                context.snackbar(context.modalData.props.beer_name + " added.");
              }}
              className="btn btn-lime"
            >
              Finish
            </button>
          </div>
        );
      case "edit":
        return (
          <div className="modal_footer_saving">
            <button
              onClick={() => {
                context.setModal("saved", context.modalData);
              }}
              className="btn btn-pink"
            >
              Back
            </button>
            <button
              onClick={() => {
                let beer = context.modalData.props;

                axios.patch("/user/beers", {
                  userId: this.props.user.userId,
                  bid: beer.bid,
                  rating: this.state.rating,
                  comments: this.state.comments
                });
                window.location.href = "/profile";
              }}
              className="btn btn-lime"
            >
              Finish
            </button>
          </div>
        );
      default:
        return;
    }
  }

  render() {
    return (
      <Context.Consumer>
        {context => {
          if (context.modalType) {
            return (
              <div className="modal_backface">
                <div className="modal">
                  {this.renderHeader(context)}
                  <hr />
                  {this.renderBody(context)}
                  <hr />

                  {this.renderFooter(context)}
                </div>
              </div>
            );
          }
        }}
      </Context.Consumer>
    );
  }
}

export default Modal;
