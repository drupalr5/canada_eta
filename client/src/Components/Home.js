import React, { useEffect } from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";

function Home(props) {
  useEffect(() => {
    let recentParam = {
      payment_status: 'Success',
      doc_uploaded: 0,
      process_status: 'New',
      processing_type: 'Standard Processing',
    }
    axios.get('http://localhost:3001/api/order/get',{params: recentParam}).then((response) => {
      console.log(response.data)
      if(response.data!='') {
        
      }
    }).catch((error) => {
      alert(error);
    });
  }, [])
  return (
    <>
      <Table>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default Home;
