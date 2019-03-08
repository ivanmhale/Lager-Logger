import React, { useContext } from "react";
import Context from "../config/Context";
import Popover from "@material-ui/core/Popover";

const PopoverComponent = () => {
  const context = useContext(Context);
  return (
    <Popover
      className="popover"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      anchorEl={document.getElementById(context.state.popover.anchorEl)}
      open={Boolean(context.state.popover.anchorEl)}
      onEnter={() =>
        setTimeout(() => {
          context.setPopover(null);
        }, 5000)
      }
      onClose={() => context.setPopover(null)}
      elevation={12}
    >
      {context.state.popover.text}
    </Popover>
  );
};

export default PopoverComponent;
