import React, { Component } from "react";
import Context from "../context/Context";
import axios from "axios";

class Modal extends Component {
  state = {
    rating: 5,
    comments: ""
  };
  renderHeader(context) {
    switch (context.modalType) {
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
        break;
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
        break;
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
        break;
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
      default:
        return;
    }
  }
  renderBody(context) {
    switch (context.modalType) {
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
                    type="text"
                    placeholder="Enter your password"
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="modal_body_login_button">
                <button className="btn btn-pink">Sign in</button>
              </div>
            </div>
          </div>
        );
        break;
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
        break;
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
        break;
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
      default:
        return;
    }
  }

  renderFooter(context) {
    switch (context.modalType) {
      case "login":
        return (
          <div className="modal_footer">
            <button className="btn btn-lime">New User?</button>
          </div>
        );
        break;
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
        break;
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
                context.setModal(null, null);
                context.snackbar(
                  "Removed " + context.modalData.props.beer_name
                );
                 window.location.href = "/profile";
              }}
              className="btn btn-pink"
            >
              Remove
            </button>
            <button className="btn btn-lime">Edit</button>
          </div>
        );
      case "saving":
        return (
          <div className="modal_footer_saving">
            <button
              onClick={() => {
                context.setModal("beer", context.modalData);
              }}
              className="btn btn-aqua"
            >
              Back
            </button>
            <button
              onClick={() => {
                let beer = context.modalData.props;
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
              className="btn btn-aqua"
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
