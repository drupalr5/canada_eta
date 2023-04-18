import React from "react";

function PageHeading(props) {
  return (
    <>
      <h2>
        <strong>{props.pagename}</strong>
      </h2>
    </>
  );
}

export default PageHeading;
