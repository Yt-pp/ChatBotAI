import React, { useState } from "react";
import Room from "./Room";

const MiniMap = ({highlightedRooms}) => {
  const roomNames = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
 
  return (
    <div className="fixed-bottom-right bg-light rounded shadow">
      {/* Wrapper for the rows */}
      <div className="container p-2">
        {roomNames.reduce((rows, roomName, index) => {
          if (index % 2 === 0) {
            // Start a new row for every two rooms
            rows.push([]);
          }
          rows[rows.length - 1].push(
            <div className="col-6" key={index}>
              <Room name={roomName} highlighted={highlightedRooms[roomName]} />
            </div>
          );
          return rows;
        }, []).map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
