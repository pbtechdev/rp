import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import RouterLink from "../router-link";
import { useAuth } from "../auth";

// ----------------------------------------------------------------------

const Logo = ({ disabledLink = false, sx }) => {
  const { user } = useAuth();
  const logo = (
    <Box
      component="img"
      loading="lazy"
      src={user?.companyLogo}
      sx={{ maxHeight: 60, cursor: "pointer", ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
};

export default Logo;
