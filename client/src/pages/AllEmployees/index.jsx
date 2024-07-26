import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/pageHeader";
import TabPanel from "../../components/tabPanel";
import CustomDataGrid from "../../components/customDataGrid";

const ALL_EMPLOYEES_TAB_POSITION = Object.freeze({
  ALL_EMPLOYEES: 0,
});

const a11yProps = (index) => {
  return {
    id: `employee-tab-${index}`,
    "aria-controls": `employee-tabpanel-${index}`,
  };
};

const AllEmployees = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tabPosition, setTabPosition] = useState(
    ALL_EMPLOYEES_TAB_POSITION.ALL_EMPLOYEES
  );

  const handleTabChange = (_event, newValue) => {
    setTabPosition(newValue);
  };
  const columns = [
    { field: "allEmployees", headerName: "All Employees", flex: 0.8 },
    { field: "interns", headerName: "Interns", flex: 1 },
    { field: "inOffice", headerName: "In Office", flex: 0.5 },
    { field: "wfh", headerName: "WFH", flex: 0.5 },
    {
      field: "actions",
      headerName: "Options",
      sortable: false,
      width: 160,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            //onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon sx={{ fontSize: 22 }} />
          </IconButton>
          {/* <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon color="error" sx={{ fontSize: 24 }} />
          </IconButton> */}
        </Box>
      ),
    },
  ];

  const { data: employeeList, isLoading: employeeListLoading } = useQuery({
    queryKey: ["EMPLOYEE_LIST_VIEW"],
    // queryFn: () => axios.get("http://localhost:8081/allPromotions"),
    // queryFn: () => axios.get("http://localhost:8000/promotions"),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:8000/promotions/${id}`);
      // queryClient.invalidateQueries("EMPLOYEE_LIST_VIEW");
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  return (
    <Box > 
      <PageHeader header="All Employees" />
      <Paper sx={{height:"100dvh"}}>
        <Tabs
          value={tabPosition}
          onChange={handleTabChange}
          aria-label="employees tabs"
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "26px",
            },
          }}
        >
          <Tab label="ALL EMPLOYEES" {...a11yProps(0)} />
        </Tabs>
        <TabPanel
          value={tabPosition}
          index={ALL_EMPLOYEES_TAB_POSITION.ALL_EMPLOYEES}
        >
          <Paper>
            {employeeListLoading ? (
              <CircularProgress />
            ) : (
              <Box>
                <CustomDataGrid
                  rows={employeeList}
                  columns={columns}
                  paginationModel={{ pageSize: 10 }}
                  rowsPerPageOptions={[5, 10, 20]}
                  checkboxSelection={false}
                />
              </Box>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AllEmployees;
