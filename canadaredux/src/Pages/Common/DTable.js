import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import config from "../../config.json"
import { useNavigate, useLocation } from "react-router-dom";
import FilterComponent from "./FilterComponent"
import { updateMultipleOrderData, getOrderSideBarCount, getOrderTiles } from "../../Redux/orderSlice"
import { useDispatch } from "react-redux";
function Table(props) {
  const dispatch = useDispatch();
  const resultD = props.results;
  const [pending, setPending] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState(false);
  const [resultd, setResultD] = useState(resultD);

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  let loginUser = JSON.parse(JSON.parse(localStorage.getItem("user")).data);
  let utype = loginUser.type ? loginUser.type : null
  let u_type = utype ? `/${utype.toLowerCase()}` : '';
  if (utype && utype !== "Team") {
    utype = null
  }
  let param = {}
  if (utype) {
    param = {
      assign_to: utype
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const subHeaderComponentMemo = React.useMemo(() => {
    if (filterText) {
      const newArray = resultd.length ? resultd : props.results.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
      )
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
        dispatch(updateMultipleOrderData({
          data: updateData,
          params: {
            "oids": oids
          }
        }
        ))
          .unwrap()
          .then((res) => {
            dispatch(getOrderTiles(param))
            dispatch(getOrderSideBarCount(param))
          })
          .catch()

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
                  columns={props.columns}
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
                  progressPending={pending}
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
