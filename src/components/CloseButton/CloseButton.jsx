import React from "react";
import "./CloseButton.css";
import { IoIosClose } from "react-icons/io";

function CloseButton({ closeModal }) {
  return (
    <button onClick={closeModal} className="close-btn">
      <IoIosClose />
    </button>
  );
}

export default CloseButton;
