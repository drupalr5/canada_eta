import React, { useState, useEffect } from "react";
import Table from "../Common/Table";
import PageHeading from "../Common/PageHeading";
import axios from "axios";
import config from "../../config.json";

function WebsiteIssue(props) {
  return (
    <>
      <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="body">
              <button
                type="button"
                class="btn btn-round btn-simple btn-sm btn-success btn-filter"
                data-target="Completed"
              >
                Completed
              </button>
              <button
                type="button"
                class="btn btn-round btn-simple btn-sm btn-info btn-filter"
                data-target="Pending"
              >
                Pending
              </button>
            </div>
            <Table tableHeading="">
            <PageHeading pagename={props.heading} />
          </Table>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default WebsiteIssue;
