import React, { useState, useEffect } from "react";
import { alpha, Box, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/fileUploader";
import { FormProvider, useForm } from "react-hook-form";

const UsersList = ({ defaultValues }) => {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = [
    { id: 1, name: "User 1", role: "UI developer", team: "trex" },
    { id: 2, name: "User 2", role: "UI developer", team: "trex" },
    { id: 3, name: "User 3", role: "UI developer", team: "trex" },
    { id: 4, name: "User 4", role: "UI developer", team: "trex" },
    { id: 5, name: "User 5", role: "UI developer", team: "trex" },
    { id: 6, name: "User 6", role: "UI developer", team: "trex" },
    { id: 7, name: "User 7", role: "UI developer", team: "trex" },
    { id: 8, name: "User 8", role: "UI developer", team: "trex" },
    { id: 9, name: "User 9", role: "UI developer", team: "trex" },
  ];

  const formMethods = useForm({
    values: defaultValues,
  });

  const handleTileClick = (user) => {
    setSelectedUserId(user.id);
    navigate("/create-employee-profile", { state: user });
  };

  useEffect(() => {
    return () => setSelectedUserId(null);
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: 2 }}
      >
        {users.map((user) => (
          <Paper
            key={user.id}
            sx={(theme) => ({
              minHeight: 300,
              width: { xs: "100%", sm: "45%", md: "30%" },
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
              backgroundColor: selectedUserId === user.id ? "#919EAB" : "white",
              "&:hover": {
                bgcolor: "#919EAB",
              },
            })}
            elevation={3}
            onClick={() => handleTileClick(user)}
          >
            <Box sx={{ textAlign: "center" }}>
              <FileUploader
                height={150}
                width={150}
                maxSize={10000}
                accept={[".png", ".jpg", ".jpeg"]}
                name={`userPhoto-${user.id}`}
              />
              <Typography variant="inherit" sx={{ marginTop: 2 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {user.role}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Team : {user.team}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </FormProvider>
  );
};

export default UsersList;
