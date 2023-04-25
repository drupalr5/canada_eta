import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent"

function Table({ orders, teamMemeber, columns, handleChange, rowsDeleteOrder, pending, toggleCleared, selectableRows= true, children }) {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // function differenceBy(array1, array2) {
  //   return array1.filter(object1 => {
  //     return !array2.some(object2 => {
  //       return object1.id === object2.id;
  //     });
  //   });
  // }
  const subHeaderComponentMemo = useMemo(() => {
    if (filterText) {
      const filterResult = orders.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
      )
      orders = filterResult;
    }
    const handleClear = (e) => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  const paginationOption = {
    rowsPerPageText: 'Show', rangeSeparatorText: 'of', noRowsPerPage: false, selectAllRowsItem: true, selectAllRowsItemText: 'All'
  }
  const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '15px'
        },
    },
};

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              {children}
            </div>
            <div className="body">
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  persistTableHead
                  data={orders}
                  // data={props?.orders}
                  defaultSortField="Order id"
                  pagination
                  selectableRows={selectableRows}
                  onSelectedRowsChange={handleChange}
                  striped={true}
                  highlightOnHover={true}
                  sortIcon={true}
                  paginationComponentOptions={paginationOption}
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                  // paginationIconNext={"Next"}
                  noBottomColumns={false}
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  progressPending={pending}
                  clearSelectedRows={toggleCleared}
                  customStyles={customStyles}
                />
              </div>
              {teamMemeber &&
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
