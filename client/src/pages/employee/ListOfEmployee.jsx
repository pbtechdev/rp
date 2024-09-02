import { Box, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/pageHeader";
import CustomDataGrid from "../../components/customDataGrid";

const ListOfEmployee = () => {
  const columns = [
    {
      field: "allEmployees",
      headerName: "All Employees",
      flex: 0.8,
      resizable: false,
    },
    { field: "interns", headerName: "Interns", flex: 1, resizable: false },
    { field: "inOffice", headerName: "In Office", flex: 0.5, resizable: false },
    { field: "wfh", headerName: "WFH", flex: 0.5, resizable: false },
  ];

  const employeeList = [
    { id: 1, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 2, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 3, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 4, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 5, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 6, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 7, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 8, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 9, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 10, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 11, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id:12, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 13, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 14, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 15, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 16, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 17, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
    { id: 18, allEmployees: 10, interns: 20, inOffice: 30, wfh: 40 },
  ];

  // const { data: employeeList, isLoading: employeeListLoading } = useQuery({
  //   queryKey: ["EMPLOYEE_LIST"],
  //   select: (response) => response.data,
  //   refetchOnMount: true,
  // });

  return (
    <Box>
      <PageHeader header="All Employees" />
      <Paper>
        <CustomDataGrid
          rows={employeeList}
          columns={columns}
          paginationModel={{ pageSize: 10 }}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={false}
          rowCount={10}
        />
      </Paper>
    </Box>
  );
};

export default ListOfEmployee;
