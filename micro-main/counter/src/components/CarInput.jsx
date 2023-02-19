import React from "react";
import './list.css'
const CarInput = ({ carInfo, setText, placeholder }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        value={carInfo}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default CarInput;
