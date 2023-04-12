import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";

function AwaitingOrder(props) {
  return (
    <>
      <Table>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default AwaitingOrder;
