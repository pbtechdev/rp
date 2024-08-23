import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const TeamDialog = ({ open, onClose, onSave }) => {
  const [teamName, setTeamName] = useState("");

  const handleSave = () => {
    onSave(teamName);
    setTeamName("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
        },
      }}
    >
      <DialogTitle>Add new team!</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="team-name"
          label="Team Name"
          type="text"
          fullWidth
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamDialog;
