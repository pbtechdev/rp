import Box from "@mui/material/Box";
import { useResponsive } from "../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";
import { NAV, HEADER } from "./config-layout";
import { bgBlur } from "../theme/css";

// ----------------------------------------------------------------------

const SPACING = 16;

export default function Main({ children, sx, ...other }) {
  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...bgBlur({
          color: theme.palette.grey[200],
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
