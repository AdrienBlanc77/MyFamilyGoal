import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

const MainButton = (props) => {
  return (
    <div>
      <Button variant="outlined">{props.text}</Button>
    </div>
  );
};

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MainButton;
