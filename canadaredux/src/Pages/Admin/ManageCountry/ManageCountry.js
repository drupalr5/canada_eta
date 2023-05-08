import React, { useEffect, useState } from "react";
import DTable from "../../../Components/ReactDataTable/DTable";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, updateCountry } from "../../../Redux/countrySlice";
import { toast } from "react-toastify";

function ManageCountry(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.country?.loading);
  const [pending, setPending] = useState(!loading);
  const countryList = useSelector((state) => state?.country?.countryList);
  useEffect(() => {
    dispatch(getCountryList())
      .unwrap()
      .then((res) => {        
        setPending(false);
      });
  }, [dispatch]);
  const changeStatusHandler = (e) => {
    e.preventDefault();
    const id = e.target.attributes.id.nodeValue;
    const status = parseInt(e.target.attributes.status.nodeValue);
    let text = status === 1 ? 'Suspended' : 'Un-Suspended'
    const deleteOrder = window.confirm(
      `Are you sure you want to ${text} this country? ${id}`
    );
    if (deleteOrder) {
      let updateData = {
        status: status,
      };
      dispatch(updateCountry({ id: id, values: updateData }))
        .unwrap()
        .then((res) => {
          if (res.status === 1) {
            toast.success(`Country has been ${text} successfully`, {
              className: "toast-message",
            });
            dispatch(getCountryList());
          } else {
            toast.error(`${res.message}`, {
              className: "toast-message",
            });
          }
        })
        .catch();
    }
  };
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
          <Link to="#" onClick={changeStatusHandler} id={row.id} status={row.change_status === 0 ? 1 : 0} className="blue-border">
            {row.change_status === 0 ? 'Suspended' : 'Un-Suspended'}
          </Link>
        </span>
      ),
    },
  ];
  let rows = [];
  Array.isArray(countryList) &&
    countryList.map((row, index) => {
      let status = row.status === 1 ? 'Suspended' : 'Un-Suspended'
      return rows.push({
        id: row.id,
        name: row.name,
        type: row.type,
        status: status,
        change_status: row.status,
      });
    });
  return (
    <DTable selectableRows={false} orders={rows} columns={columns} pending={pending}>
      <PageHeader pagename={props.heading} />
    </DTable>
  );
}

export default ManageCountry;
