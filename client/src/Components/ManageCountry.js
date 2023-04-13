import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";

function ManageCountry(props) {
  return (
    <>
      <Table>
      <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default ManageCountry;
