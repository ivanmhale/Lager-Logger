import React, { Component } from "react";
import Context from "../context/Context";

class Modal extends Component {
  renderBody() {
    return (
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
    );
  }

  renderFooter() {
    return <button className="btn btn-lime">New User?</button>;
  }

  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="modal_backface">
              <div className="modal">
                <div className="modal_header">
                  <span className="modal_header_text">Login</span>
                  <span className="modal_header_close">&times;</span>
                </div>
                <hr />
                <div className="modal_body">{this.renderBody()}</div>
                <hr />
                <div className="modal_footer">{this.renderFooter()}</div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Modal;
