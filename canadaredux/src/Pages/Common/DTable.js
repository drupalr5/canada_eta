import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { useLocation } from "react-router-dom";
import useAuthParameter from "../../Hooks/useAuthParameter";

function Table({
  orders,
  teamMemeber,
  columns,
  handleChange,
  rowsDeleteOrder,
  pending,
  toggleCleared,
  selectableRows = true,
  teamMemeberList,
  rowsAssignedOrder,
  rowsRefunedOrder,
  children,
}) {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [teamMember, setTeamMember] = useState("");
  // function differenceBy(array1, array2) {
  //   return array1.filter(object1 => {
  //     return !array2.some(object2 => {
  //       return object1.id === object2.id;
  //     });
  //   });
  // }
  const { type } = useAuthParameter();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const selectTeamMember = (e) => {
    setTeamMember(e.target.value);
  };
  const subHeaderComponentMemo = useMemo(() => {
    if (filterText) {
      const filterResult = orders.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.order_id &&
            item.order_id.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.email &&
            item.email.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.telephone &&
            item.telephone.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.date &&
            item.date.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.assign_to &&
            item.assign_to.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.status &&
            item.status.toLowerCase().includes(filterText.toLowerCase()))
      );
      orders = filterResult;
    }
    const handleClear = (e) => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const paginationOption = {
    rowsPerPageText: "Show",
    rangeSeparatorText: "of",
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
  };

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">{children}</div>
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
              {((pathname[2] === "" || pathname[2] === "priority-order") && type==='Admin') && (
                <form>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 m-b-20">
                      <b>Team Member</b>
                      <select
                        className="form-control show-tick"
                        name="team"
                        value={teamMember}
                        onChange={selectTeamMember}
                      >
                        <option value="">Select Team Member</option>
                        {teamMemeberList &&
                          teamMemeberList.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </form>
              )}
              {((pathname[2] === "" || pathname[2] === "priority-order") && type==='Admin') && (
                <button
                  type="submit"
                  name="submit"
                  value="Assign"
                  className="btn btn-success"
                  onClick={() => rowsAssignedOrder(teamMember)}
                >
                  Assign To
                </button>
              )}
              {(pathname[2] !== "manage-team" &&
                pathname[2] !== "manage-country" && type==='Admin') && (
                  <button
                    type="submit"
                    name="submit"
                    value="Delete"
                    className="btn btn-success"
                    onClick={rowsDeleteOrder}
                  >
                    Delete Order
                  </button>
                )}
              {(pathname[2] === "refund-order" && type==='Admin') && (
                <button
                  type="submit"
                  name="submit"
                  value="Refund"
                  className="btn btn-success"
                  onClick={rowsRefunedOrder}
                >
                  Refunded it
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
