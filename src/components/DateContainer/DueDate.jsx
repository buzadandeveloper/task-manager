import React from "react";
import "./DueDate.css";

function DueDate({ dueDate }) {
  let date;
  try {
    date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }
  } catch (error) {
    console.error("Invalid date:", dueDate);
  }

  return <span>{date.toLocaleDateString()}</span>;
}

export default DueDate;
