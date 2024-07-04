import { useState } from "react";
import Iconify from "../../../components/iconify";
import { Badge, IconButton } from "@mui/material";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  return (
    <>
      <IconButton color={open ? "primary" : "default"} onClick={handleOpen}>
        <Badge badgeContent={10} color="error">
          <Iconify width={24} icon="ion:notifications" />
        </Badge>
      </IconButton>
    </>
  );
}
