import React from "react";
import "./Pic.css";

const Pic = props => (
  <div className="card" onClick={() => props.guessCard(props.id)}>
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default Pic;