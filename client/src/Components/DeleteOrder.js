import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";

function DeleteOrder(props) {
  return (
    <>
      <Table>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default DeleteOrder;
