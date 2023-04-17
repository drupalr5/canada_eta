import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config.json"
import { useNavigate, useLocation } from "react-router-dom";
import FilterComponent from "./FilterComponent"

function Table(props) {
  const resultD = props.results;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState(false);
  const [resultd, setResultD] = useState(resultD);

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    if (filterText) {
      const newArray = resultd.length ? resultd : props.results.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
      )
      console.log(newArray)
      setResultD(newArray)
    }

    const handleClear = (e) => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setResultD(resultd.length ? resultd : props.results)
        setFilterText('');
      }
    };
    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    const oid = e.target.attributes.oid.nodeValue;
    const deleteOrder = window.confirm(`Are you sure you want to delete this order? ${oid}`);
    if (deleteOrder) {
      let updateData = {
        process_status: "Deleted"
      }
      axios.put(config.API_URL + '/order/update/' + oid, updateData).then(res => {
        if (res.status == 200) {
          alert("Your order is deleted");
          navigate(location.pathname)
        }
      })
        .catch(error => {
          alert(error);
        })
    }
  }
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  }

  const rowsDeleteOrder = () => {
    if (selectedRows.length > 0) {
      const oids = [];
      if (selectedRows.length > 0) {
        selectedRows.map(r => oids.push(r.order_id));
      }

      if (window.confirm(`Are you sure you want to delete:\r ${oids.length ? oids.map(r => r) : ''} ?`)) {
        // setToggleCleared(!toggleCleared);
        const newArray = differenceBy(props.results, selectedRows, 'id');
        console.log(oids)
        let updateData = {
          process_status: "Deleted"
        }
        axios.put(config.API_URL + '/order/update-multiple', updateData, {
          params: {
            "oids": oids
          }
        }).then(res => {
          if (res.status == 200) {
            alert("Your order(s) is deleted");
            navigate(location.pathname)
          }
        })
          .catch(error => {
            alert(error);
          })
        setResultD(newArray);
      }
    }
  }

  function differenceBy(array1, array2, id) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }

  const columns = [
    {
      name: "Order ID",
      selector: row => row.order_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Telephone",
      selector: row => row.telephone,
      sortable: true
    },
    {
      name: "Assign to",
      selector: row => row.assign_to,
      sortable: true
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) =>
        props.results?.length ? (
          <span>
            <Link
              to={`/order-details?id=${row.order_id}&oid=${row.id}&ot=${row.status}&pre_no=${row.id}`}
              className="blue-border"
            >
              View
            </Link>{" | "}
            <Link
              to="#"
              onClick={deleteOrderHandler}
              oid={row.order_id}
            >
              Delete
            </Link>
          </span>
        ) : (
          " "
        ),
    }
  ];
  const paginationOption = {
    rowsPerPageText: 'Show', rangeSeparatorText: 'of', noRowsPerPage: false, selectAllRowsItem: true, selectAllRowsItemText: 'All'
  }

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              {props.children}
            </div>
            <div className="body">
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  persistTableHead
                  data={resultd.length > 0 ? resultd : props.results}
                  defaultSortField="Order id"
                  pagination
                  selectableRows
                  onSelectedRowsChange={handleChange}
                  striped={true}
                  highlightOnHover={true}
                  sortIcon={true}
                  paginationComponentOptions={paginationOption}
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                  paginationIconNext={"Next"}
                  noBottomColumns={false}
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                />
              </div>
              {props.teamMemeber &&
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 m-b-20">
                    <b>Team Member</b>
                    <select className="form-control show-tick" name="team">
                      <option value="">Select Team Member</option>
                      <option value="<"></option>
                    </select>
                  </div>
                </div>
              }
              <button
                type="submit"
                name="submit"
                value="Delete"
                className="btn btn-success"
                onClick={rowsDeleteOrder}
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
