import React from "react";

function FilterComponent(props) {
  return (
    <>
      <label style={{
        display: 'flex',
        flex: 'initial',
        margin: 0,
        fontSize: '16px',
        paddingRight: '10px',
      }}>Search:</label>
      <input
        id="search"
        type="text"
        placeholder="Search results"
        value={props.filterText}
        onChange={props.onFilter}
        style={{
          borderLeft: 0,
          borderTop: 0,
          borderRight: 0,
          borderBottom: "1px solid gray",
        }}
      />
      <button
        onClick={props.onClear}
        style={{
          border: 0,
          background: "none"
        }}
      >X</button>
    </>
  )
}
export default FilterComponent