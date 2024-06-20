import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ children, isModalOpen }) {
  return (
    <div className={`modal-wrapper ${isModalOpen ? "show" : "hide"}`}>
      <div className="modal-content">
        <div className="modal-card">{children}</div>
      </div>
    </div>
  );
}
