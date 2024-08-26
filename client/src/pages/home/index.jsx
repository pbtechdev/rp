import React from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card>
        <CardContent>
          <Button onClick={() => navigate("/create-employee-profile")}>
            Add Employee
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
