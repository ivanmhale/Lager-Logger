import React, { Component } from "react";

class Modal extends Component {
  renderHeader() {
    return <div />;
  }

  renderBody() {
    return <div />;
  }

  renderFooter() {
    return <div />;
  }

  render() {
    return (
      <div className="modal">
        <div className="modal_header">{this.renderHeader()}</div>
        <hr />
        <div className="modal_body">{this.renderBody()}</div>
        <hr />
        <div className="modal_footer">{this.renderFooter()}</div>
      </div>
    );
  }
}

export default Modal;
