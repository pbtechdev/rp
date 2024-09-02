import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorOverlay from "../../components/errorOverlay";
// import CustomPagination from "../CustomPagination";
import Scrollbar from "../scrollbar";

const CustomDataGrid = ({
  columns,
  rowCount,
  rows,
  paginationModel,
  setPaginationModel,
  isError,
  extraStyles = {},
  lastEvaluatedKey = "",
  loading = false,
  ...restProps
}) => {
  return (
    <>
      <Scrollbar
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DataGrid rowCount={rowCount} columns={columns} rows={rows} />
      </Scrollbar>
    </>
  );
};

export default CustomDataGrid;
