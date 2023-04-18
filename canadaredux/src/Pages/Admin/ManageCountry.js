import React from "react";
import Table from "../Common/Table";
import PageHeading from "../Common/PageHeading";

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
