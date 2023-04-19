import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent"
import { updateMultipleOrderData, getOrderSideBarCount, getOrderTiles } from "../../Redux/orderSlice"
import useAuthParameter from "../../Hooks/useAuthParameter";
import { useDispatch } from "react-redux";
function Table(props) {
  const dispatch = useDispatch();
  const resultD = props.orders;
  const [pending, setPending] = React.useState(true);
  const [selectedRows, setSelectedRows] = useState(false);
  const [resultd, setResultD] = useState(resultD);

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const { user, type, name, path, param } = useAuthParameter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const subHeaderComponentMemo = React.useMemo(() => {
    if (filterText) {
      const newArray = resultD.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
      )
      setResultD(newArray)
    }

    const handleClear = (e) => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setResultD(props.orders)
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
      setPending(true)
      if (window.confirm(`Are you sure you want to delete:\r ${oids.length ? oids.map(r => r) : ''} ?`)) {
        setToggleCleared(!toggleCleared);
        const newArray = differenceBy(props.orders, selectedRows);
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
            setSelectedRows(false);
            setPending(false)
          })
          .catch()

        setResultD(newArray);
      }
    }
  }

  function differenceBy(array1, array2) {
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
                  data={resultd.length > 0 ? resultd : props?.orders}
                  // data={props?.orders}
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
                  clearSelectedRows={toggleCleared}
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
