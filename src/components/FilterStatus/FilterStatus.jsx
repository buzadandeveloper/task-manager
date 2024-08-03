import React, { useState } from "react";
import "./FilterStatus.css";

function FilterStatus({ setFilter, filteredLength }) {
  const filterItems = ["All Tasks", "To Do", "In Progress", "Completed"];
  const [activeFilter, setActiveFilter] = useState("All Tasks");
  const handleFilter = filter => {
    setFilter(filter);
    setActiveFilter(filter);
  };
  return (
    <div className="filter-status-wrapper">
      <div className="filter-status-content">
        <ul className="filter-items">
          {filterItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleFilter(item)}
              className={`${activeFilter === item ? "active" : ""}`}
            >
              {item} {filteredLength(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FilterStatus;
