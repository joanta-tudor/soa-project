import React from "react";
import './list.css'

const CarTextArea = ({ carInfo, setText, placeholder }) => {
    return (
        <div className="input-wrapper">
            <textarea name="Text1"
                      cols="40"
                      rows="5"
                      value={carInfo}
                      placeholder={placeholder}
                      onChange={(e) => {
                setText(e.target.value);
            }}>
            </textarea>
        </div>
    );
};

export default CarTextArea;
