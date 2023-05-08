import React from "react";

function PageHeader(props) {
  return (
    <>
      <h2>
        <strong>{props.pagename}</strong>
      </h2>
    </>
  );
}

export default PageHeader;
