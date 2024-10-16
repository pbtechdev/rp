import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { alpha, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { usePathname } from "../hooks/use-pathname";
import { useResponsive } from "../hooks/use-responsive";
import Logo from "../components/logo";
import Scrollbar from "../components/scrollbar";
import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import RouterLink from "../components/router-link";
import { Divider } from "@mui/material";
import Iconify from "../components/iconify"; 

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const { palette } = useTheme();
  const upLg = useResponsive("up", "lg");
  const [open, setOpen] = useState({}); 

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const handleToggle = (item) => {
    setOpen((prev) => ({ ...prev, [item.title]: !prev[item.title] })); 
  };

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ p: 2 }}>
      {navConfig.map((item) => (
        <NavItem
          key={item.title}
          item={item}
          open={open[item.title]} 
          onToggle={handleToggle} 
          pathname={pathname} 
          onCloseNav={onCloseNav} 
        />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ m: 2 }} />
      <Divider />
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        backgroundColor: alpha(palette.common.white, 0.8),
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item, open, onToggle, pathname, onCloseNav }) {
  const active = item.path === pathname;

  return (
    <>
      <ListItemButton
        component={RouterLink}
        href={item.path}
        onClick={() => {
          onToggle(item); 
          if (!item.children) {
            onCloseNav(); 
          }
        }}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: "body2",
          color: "text.secondary",
          textTransform: "capitalize",
          fontWeight: "fontWeightMedium",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <Box component="span">{item.icon}</Box>
          <Box component="span">{item.title}</Box>
        </Box>
        {item.children && (
          <Iconify
            icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
            sx={{ ml: "auto" }}
          />
        )}
      </ListItemButton>

      {item.children && open && (
        <Box sx={{ pl: 4 }}>
          {item.children.map((child) => (
            <ListItemButton
              key={child.title}
              component={RouterLink}
              href={child.path}
              onClick={() => {
                onCloseNav(); 
              }}
              sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                display: "flex",
                alignItems: "center",
                ...(child.path === pathname && {
                  color: "primary.main",
                  fontWeight: "fontWeightSemiBold",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                }),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box component="span">{child.title}</Box>
            </ListItemButton>
          ))}
        </Box>
      )}
    </>
  );
}
