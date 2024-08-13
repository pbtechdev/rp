import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useResponsive } from "../hooks/use-responsive";
import { bgBlur } from "../theme/css";
import Iconify from "../components/iconify";
import { NAV, HEADER } from "./config-layout";
import NotificationsPopover from "./common/notification-popover";
import AccountPopover from "./common/account-popover";

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="ic:round-menu" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.common.white,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
        borderBottom: (muiTheme) => `solid 1px ${muiTheme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 2 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
