import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";

function Home(props) {
  return (
    <>
      <Table>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default Home;
