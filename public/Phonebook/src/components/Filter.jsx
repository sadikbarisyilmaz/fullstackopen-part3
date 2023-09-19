import React from "react";

export const Filter = ({ setFilter }) => {
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <label>Filter by name: </label>
      <input onChange={handleFilter} type="text" />
    </div>
  );
};
