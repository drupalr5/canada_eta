import * as React from "react";
// import {
// 	PaginationComponentProps as DataTablePaginationComponentProps
// } from "react-data-table-component/dist/src/DataTable/types";

// interface TablePaginationProps extends DataTablePaginationComponentProps {
// 	paginationRowsPerPageOptions?: number[];
// }

export default function PaginationComponents({
	currentPage,
	rowCount,
	onChangePage,
	paginationRowsPerPageOptions,
	rowsPerPage,
	onChangeRowsPerPage
}: TablePaginationProps) {

	return <div className={"d-flex mt-2 justify-content-end align-items-baseline"}>
		<div className={"me-3"}>
      // ... component
		</div>
      // ... component
		<div className={'ms-3 border'}>
      // ... component that uses paginationRowsPerPageOptions
		</div>
	</div>
}