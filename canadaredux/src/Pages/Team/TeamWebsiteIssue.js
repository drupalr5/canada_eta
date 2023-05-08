import React from "react";
import Table from "../Common/CustomTable/Table";
import PageHeader from "../Common/PageHeader/PageHeader";
import { Card, MainContainer, CardBody } from "../Common/style";

function WebsiteIssue(props) {
  return (
    <MainContainer className="row clearfix">
      <MainContainer className="col-lg-12 col-md-12 col-sm-12">
        <Card className="card">
          <CardBody className="body">
            <button
              type="button"
              className="btn btn-round btn-simple btn-sm btn-success btn-filter"
              data-target="Completed"
            >
              Completed
            </button>
            <button
              type="button"
              className="btn btn-round btn-simple btn-sm btn-info btn-filter"
              data-target="Pending"
            >
              Pending
            </button>
          </CardBody>
          <Table tableHeading="">
            <PageHeader pagename={props.heading} />
          </Table>
        </Card>
      </MainContainer>
    </MainContainer>
  );
}

export default WebsiteIssue;
