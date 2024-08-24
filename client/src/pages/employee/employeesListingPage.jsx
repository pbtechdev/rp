import { Box, CircularProgress, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/pageHeader";
import CustomDataGrid from "../../components/customDataGrid";

const AllEmployees = () => {
  const columns = [
    { field: "allEmployees", headerName: "All Employees", flex: 0.8 },
    { field: "interns", headerName: "Interns", flex: 1 },
    { field: "inOffice", headerName: "In Office", flex: 0.5 },
    { field: "wfh", headerName: "WFH", flex: 0.5 },
  ];

  const employeeList = [
    { id: 1, allEmployees: 10, interns: 20, inOffice: 30, field: 40 },
    { id: 2, allEmployees: 10, interns: 20, inOffice: 30, field: 40 },
    { id: 3, allEmployees: 10, interns: 20, inOffice: 30, field: 40 },
    { id: 4, allEmployees: 10, interns: 20, inOffice: 30, field: 40 },
  ];

  // const { data: employeeList, isLoading: employeeListLoading } = useQuery({
  //   queryKey: ["EMPLOYEE_LIST"],
  //   select: (response) => response.data,
  //   refetchOnMount: true,
  // });

  return (
    <Box>
      <PageHeader header="All Employees" />
      <Paper sx={{ height: "100dvh" }}>
        <CustomDataGrid
          rows={employeeList}
          columns={columns}
          paginationModel={{ pageSize: 10 }}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={false}
        />
      </Paper>
    </Box>
  );
};

export default AllEmployees;
