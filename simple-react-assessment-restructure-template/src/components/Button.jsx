import React from "react";

const Button = props => {
  //console.log(props.style);
  return (
    <button
      style={props.style}
      className={
        props.type == "primary"
          ? "btn btn-primary mt-2"
          : "btn btn-secondary mt-2"
      }
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;
