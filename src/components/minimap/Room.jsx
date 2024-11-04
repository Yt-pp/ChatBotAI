// Room.js
import React from "react";

const Room = ({ name, highlighted }) => {
  return (
    <div
      className="room d-flex align-items-center justify-content-center border rounded shadow-sm"
      style={{
        backgroundColor: highlighted ? "#FFFF99" : "#f8f9fa",
        width: "100px",
        height: "100px",
        color: "black",
      }}
    >
      {name}
    </div>
  );
};

export default Room;
