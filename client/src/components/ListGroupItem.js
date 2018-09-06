import React from "react";
import Context from "../context/Context";

const ListGroupItem = props => {
  return (
    <Context.Consumer>
      {context => {
        return (
          <div
            className="list_group_item"
            onClick={() => context.setModal(props.mode, { props })}
          >
            <div className="list_group_item_img">
              <img src={props.beer_label} alt={props.beer_name} />
            </div>
            <div className="list_group_item_desc">
              <div className="list_group_item_desc_name">{props.beer_name}</div>
              <div className="list_group_item_desc_brewery">
                {props.brewery_name}
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export default ListGroupItem;
