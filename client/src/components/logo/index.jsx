import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import RouterLink from "../router-link";
import companyLogo from "../../assets/logo.png";

// ----------------------------------------------------------------------

const Logo = ({ disabledLink = false, sx }) => {
  const logo = (
    <Box
      component="img"
      src={companyLogo}
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
