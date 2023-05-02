import React, { useEffect, useState } from "react";
import DTable from "../Common/DTable";
import PageHeading from "../Common/PageHeading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList } from "../../Redux/countrySlice";

function ManageCountry(props) {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);
  const countryList = useSelector((state) => state.country.countryList);
  useEffect(() => {
    dispatch(getCountryList())
      .unwrap()
      .then((res) => {
        const timeout = setTimeout(() => {
          setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      });
  }, [dispatch]);
  let columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <span>
          <Link to="#" className="blue-border">
            Suspended
          </Link>
        </span>
      ),
    },
  ];
  let rows = [];
  Array.isArray(countryList) &&
    countryList.map((row, index) => {
      return rows.push({
        id: row.id,
        name: row.name,
        type: row.type,
        status: row.status,
      });
    });
  return (
    <>
      <DTable
        selectableRows={false}
        orders={rows}
        columns={columns}
        // teamMemeber={false}
        // // handleChange={handleChange}
        // // rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}

        // toggleCleared={toggleCleared}
      >
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default ManageCountry;
